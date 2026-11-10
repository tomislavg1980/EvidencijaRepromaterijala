import { danas, formatDatum, formatEuro, pomak, zaliha } from '../constants'
import { useLista } from '../hooks'
import ArtiklService from '../services/ArtiklService'
import PrometService from '../services/PrometService'

export default function Pocetna({ idi }) {

    const artikli = useLista(ArtiklService)
    const promet = useLista(PrometService)

    const sada = danas()
    const mjesec = sada.slice(0, 7)
    const stanje = (a) => zaliha(promet.stavke, a.sifra)
    const aktivni = artikli.stavke.filter((a) => a.aktivan)
    const nisko = aktivni.filter((a) => stanje(a) < Number(a.minimalna))
    const istice = aktivni.filter((a) => a.rok && a.rok >= sada && a.rok <= pomak(14))
    const vrijednost = artikli.stavke.reduce((s, a) => s + Math.max(0, stanje(a)) * Number(a.cijena || 0), 0)
    const ovajMjesec = promet.stavke.filter((p) => p.datum.startsWith(mjesec))

    return (
        <>
            <div className="naslovnica">
                <h1>Evidencija repromaterijala</h1>
                <p className="prigusen">Stanje zaliha, ulazi i izlazi repromaterijala na dan {formatDatum(sada)}</p>
            </div>

            <div className="kutije">
                <button className="kutija statistika" onClick={() => idi('artikli')}><b>{aktivni.length}</b><span>Aktivnih artikala</span></button>
                <button className="kutija statistika" onClick={() => idi('artikli')}><b className={nisko.length ? 'kasni' : ''}>{nisko.length}</b><span>Ispod minimalne zalihe</span></button>
                <button className="kutija statistika" onClick={() => idi('artikli')}><b>{istice.length}</b><span>Rok valjanosti do 14 dana</span></button>
                <div className="kutija statistika"><b>{formatEuro(vrijednost)}</b><span>Vrijednost zalihe</span></div>
                <button className="kutija statistika" onClick={() => idi('promet')}><b>{ovajMjesec.length}</b><span>Zapisa prometa ovaj mjesec</span></button>
            </div>

            <div className="glava">
                <h2>Artikli ispod minimalne zalihe</h2>
                <div className="alat bez-razmaka">
                    <button className="gumb" onClick={() => idi('promet', 'novi')}>+ Novi zapis prometa</button>
                    <button className="gumb sporedni" onClick={() => idi('artikli', 'novi')}>+ Novi artikl</button>
                </div>
            </div>
            <div className="kutija tablica-omot">
                {nisko.length === 0 ? <p className="prigusen popuna">Sve zalihe su iznad minimuma.</p> : (
                    <table>
                        <thead><tr><th>Artikl</th><th>Zaliha</th><th>Minimum</th><th>Nedostaje</th></tr></thead>
                        <tbody>
                            {nisko.map((a) => (
                                <tr key={a.sifra}>
                                    <td>{a.oznaka} {a.naziv}</td>
                                    <td className="kasni">{stanje(a)} {a.jedinica}</td>
                                    <td>{a.minimalna} {a.jedinica}</td>
                                    <td>{Number(a.minimalna) - stanje(a)} {a.jedinica}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
