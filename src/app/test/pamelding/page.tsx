import PåmeldingSkjema from "@/components/Påmelding/PåmeldingKontaktSkjema/påmeldingKontaktSkjema";
import PåmeldingOversikt from "@/components/Påmelding/PåmeldingOppsummering/PåmeldingOppsummering";
export default function testPåmelding() {
    return(
        <>
            <div>
                <PåmeldingSkjema />
                <p>------------------------</p>
                <PåmeldingOversikt/>
            </div>
        </> 
    )
}