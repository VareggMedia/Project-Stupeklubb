'use client'

import {useState, useContext, createContext, ReactNode} from 'react'

type PåmeldingData = {
    navn: string;
    etternavn: string;
    alder: string;
    mobil: string;
    email: string;
    valg: boolean;
    samtykke: boolean;
    melding?: string;
}

type PåmeldingContextType = {
    påmelding: PåmeldingData;
    setPåmelding: React.Dispatch<React.SetStateAction<PåmeldingData>>
}

const PåmeldingContext = createContext<PåmeldingContextType | undefined>(undefined)

export function PåmeldingProvider({children}: {children: ReactNode}) {
    const [påmelding, setPåmelding] = useState<PåmeldingData>({
        navn: '',
        etternavn: '',
        alder: '',
        mobil: '',
        email: '',
        valg: false,
        samtykke: false,
        melding: ''
    })

    return (
        <PåmeldingContext.Provider value={{påmelding, setPåmelding}}>
            {children}
        </PåmeldingContext.Provider>
    )
}
export function usePåmelding() {
    const context = useContext(PåmeldingContext)

    if (!context)
        throw new Error('Må bruke usePåmelding inni PåmeldingProvider'
    )
    
    return context
}