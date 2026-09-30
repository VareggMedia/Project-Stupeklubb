import Link from "next/link"

export default function Kvittering(){
    return (
        <div className="text-cyan-950 text-center mb-20 mt-30 space-y-7">
            <h1>Påmelding er sendt til oss</h1>
            <p>Takk for at du har meldt deg inn på Stupeklubben. Du finner en kvittering av bestillingen på mail.</p>
            <p>
                Klikk <Link className="text-blue-500 font-extrabold" href="/klubbutstyr">her</Link> for å se på klubbutstyr.
            </p>
            <Link className="text-blue-600" href="/">Gå til Forsiden</Link>
        </div>
    )
}