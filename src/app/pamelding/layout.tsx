import { PåmeldingProvider } from "@/src/app/components/Påmelding/påmeldingStruktur";


export default function testlayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <PåmeldingProvider>
                {children}
            </PåmeldingProvider>
        </>
    )
}