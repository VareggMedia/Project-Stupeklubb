'use client'

import {useState, useContext, createContext, ReactNode} from 'react'



export type PåmeldingData = {
    medlemstype: string;
    navn: string;
    kjønn: 'Gutt' | 'Jente' | 'Ikke-binær' | null;
    fødseldato: string;
    mobil: string;
    email: string;
    adresse: string;
    valg: 'megSelv' | 'andre';
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
        medlemstype: 'Ny medlem',
        navn: '',
        kjønn: null ,
        fødseldato: '',
        mobil: '',
        email: '',
        adresse: '',
        valg: 'megSelv',
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