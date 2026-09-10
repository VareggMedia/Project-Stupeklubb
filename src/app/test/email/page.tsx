import EmailInnhold from "@/components/Påmelding/EmailInnhold/EmailInnhold";
import type { PåmeldingData } from "@/components/Påmelding/PåmeldingStruktur/påmeldingStruktur";

export default function EpostTestSide() {
    const testPåmelding: PåmeldingData = {
        medlemstype: "Medlem",
        navn: "Nora Nordmann",
        nasjon: "Norge",
        kjønn: "Jente",
        fødseldato: "1995-05-15",
        mobil: "12345678",
        email: "nora@example.com",
        adresse: "Eksempelveien 12, 5000 Bergen",
        valg: "megSelv",
        samtykke: true,
        melding: "",
    };

    return <EmailInnhold data={testPåmelding} />;
}