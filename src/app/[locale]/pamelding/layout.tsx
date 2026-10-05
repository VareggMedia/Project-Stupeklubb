import { PåmeldingProvider } from "@/src/app/[locale]/components/Påmelding/påmeldingStruktur";


export default function påmeldinglayout({children}: {children: React.ReactNode}) {
    return (
        <PåmeldingProvider>
            {children}
        </PåmeldingProvider>
        
    )
}