import { usePåmelding } from "./påmeldingStruktur";
import { useRouter } from "next/router";




export default function PåmeldingSkjema() {
    
    const {påmelding, setPåmelding} = usePåmelding();
    const router = useRouter()
    /*
    const [navn, setNavn] = useState<string>();
    const [etternavn, setEtternavn] = useState<string>()
    const [alder, setAlder] = useState<number>()
    const [mobil, setMobil] = useState<null>();
    const [email, setEmail] = useState<string>();
    const [valg, setValg] = useState<boolean>(true)
    const [samtykke,setSamtykke] = useState<boolean>(false)
    const [melding, setMelding] = useState<string>(''); */
    
    function submit (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        router.push('/')
    }

    const isFormValid = (
        påmelding.navn !== '' &&
        påmelding.etternavn !== '' &&
        påmelding.alder !== '' &&
        påmelding.email !== '' &&
        påmelding.mobil !== ''
    );

    return (
        <div>
            <div>
                <form onSubmit={submit}>
                    <section>
                        <div>
                            <label htmlFor="navn">Fulle Navn:</label>
                            <input
                                id="navn"
                                type="text"
                                value={påmelding.navn}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                value={påmelding.email}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobil">Mobil:</label>
                            <input
                                id='mobil'
                                type="text"
                                value={påmelding.mobil}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        mobil: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </section>
                    <div>
                        <button disabled={!isFormValid} >Send in Påmelding</button>
                    </div>
                </form>
            </div>
        </div>
    )
}