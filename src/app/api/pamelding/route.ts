import { cookies } from "next/headers";
import { randomUUID, createHmac } from "crypto";
import { createAdminClient } from "@/lib/Supabase/admin";
import { pameldingSchema } from "@/lib/validering/pamelding";
import { createClient } from "@/lib/Supabase/server";
import sendSkjema from "@/lib/Resend/Resend";

export async function POST(request:Request) {
    try {
        const cookieStore = await cookies()

        let visitorId = cookieStore.get("visitor_id")?.value

        if (!visitorId) {
            visitorId = randomUUID()

            cookieStore.set("visitor_id", visitorId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24
            })
        }

        const visitorHash = createHmac(
            "sha256",
            process.env.RATE_LIMIT_HASH_SECRET!
        )
            .update(visitorId)
            .digest("hex")
        
        const rawIp = 
            request.headers.get("x-vercel-forwarded-for") ??
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip")
        
        const ip = rawIp?.split(",")[0]?.trim() ?? null

        const ipHash = ip ? createHmac("sha256", process.env.RATE_LIMIT_HASH_SECRET!).update(ip).digest("hex") : null

        const admin = createAdminClient()

        const { data: rateLimitData, error: rateLimitError } = await admin.rpc(
            "check_rate_limit",
            {
                p_visitor_hash: visitorHash,
                p_ip_hash: ipHash
            }
        )

        if (rateLimitError) {
            console.error("Rate limit-feil", rateLimitError)

            return Response.json(
                { error: "Kunne ikke kontrollere rate limit" },
                {status: 500}
            )
        }

        const rateLimit = rateLimitData?.[0]

        if (!rateLimit.allowed) {
            return Response.json(
                {
                    error: "For mange påmeldingsforsøk",
                    reason: rateLimit.reason
                },
                {status: 429}
            )
        }

        const body = await request.json()
        
        const validering = pameldingSchema.safeParse(body)

        if (!validering.success) {
            return Response.json(
                { error: "Ugyldig påmelding" },
                { status: 400 }
            )
        }

        const data = validering.data

        const supabase = await createClient()

        const {error} = await supabase
            .from("påmelding")
            .insert({
                navn: data.navn,
                fødselsdato: data.fødseldato,
                mobil: data.mobil,
                email: data.email,
                adresse: data.adresse,
                nasjon: data.nasjon,
                kjønn: data.kjønn,
                status: data.medlemstype
            })
        if (error) {
            console.error("Supabase-feil", error)

            return Response.json(
                {error: "Kunne ikke lagre påmelding"},
                {status: 500}
            )
        }

        const resultat = await sendSkjema(data)

        if (!resultat.success) {
            return Response.json({
                success: true,
                epost: false
            })
        }

        return Response.json({
            success: true,
            epost: true
        })
    } catch (error) {
        console.error("Uventet feil ved påmelding:", error)

        return Response.json(
            { error: "En uventet feil oppstod" },
            { status: 500 }
        )
    }
}