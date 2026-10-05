import { getTranslations } from "next-intl/server"
import { Link } from "@/src/i18n/navigation"

export default async function Kvittering({searchParams}: {searchParams: Promise<{ epost?: string}>}){
    const {epost} = await searchParams
    const t = await getTranslations("Receipt")
    return (
        <div className="text-cyan-950 text-center mb-20 mt-30 space-y-7">
            <h1>{t("title")}</h1>
            <p>{t("thanks")}</p>
                {epost === "feilet" ? (
                    <p>{t("emailFailed")}</p>
                ) : (
                    <p>{t("emailSent")}</p>
                )}
            <p>
                {t.rich("gear", {
                    link: (chunks) => <Link className="text-blue-500 font-extrabold" href="/klubbutstyr">{chunks}</Link>,
                })}
            </p>
            <Link className="text-blue-600" href="/">{t("home")}</Link>
        </div>
    )
}