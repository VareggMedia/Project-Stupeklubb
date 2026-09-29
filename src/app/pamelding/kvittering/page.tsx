import Link from "next/link"

export default function Kvittering(){
    return (
        <div className="text-cyan-950 text-center mt-35">
            <h1>Påmelding er sendt til oss</h1>
            <br/>
            <p>Takk for at du har meldt deg inn på Stupeklubben. Du finner en kvittering av bestillingen på mail.</p>
            <br/><br/>
            <p>
                Klikk <Link className="text-blue-500 font-extrabold" href="/klubbutstyr">her</Link> for å se på Klubb Utstyr.
            </p>
            <br/>
            <Link className="text-blue-600" href="/">Gå til Forsiden</Link>
        </div>
    )
}