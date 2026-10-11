import { pameldingSchema } from "@/lib/validering/pamelding";

export async function Post(request:Request) {
    const body = await request.json
    
    const validering = pameldingSchema.safeParse(body)

    if (!validering.success) {
        return Response.json(
            { error: "Ugyldig påmedling" },
            { status: 400 }
        )
    }

    return Response.json({
        success: true
    })
}