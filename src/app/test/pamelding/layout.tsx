import { PåmeldingProvider } from "@/components/Påmelding/PåmeldingStruktur/påmeldingStruktur";


export default function testlayout({children}: {children: React.ReactNode}) {
    return (
        <PåmeldingProvider>
            {children}
        </PåmeldingProvider>
    )
}