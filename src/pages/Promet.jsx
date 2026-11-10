import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { VRSTE_PROMETA, danas, formatDatum, zaliha } from '../constants'
import { useLista } from '../hooks'
import ArtiklService from '../services/ArtiklService'
import PrometService from '../services/PrometService'

export default function Promet({ param }) {

    const promet = useLista(PrometService)
    const artikli = useLista(ArtiklService)
    const artiklF = param?.startsWith('artikl-') ? Number(param.slice(7)) : 0
    const [vrsta, setVrsta] = useState('')

    const artikl = (s) => artikli.stavke.find((x) => x.sifra === s)
    const prikaz = promet.stavke
        .filter((p) => !artiklF || p.artikl === artiklF)
        .filter((p) => !vrsta || p.vrsta === vrsta)
        .sort((a, b) => b.datum.localeCompare(a.datum) || b.sifra - a.sifra)

    function validate(v, uredjuje) {
        const g = {}
        const k = Number(v.kolicina)
        if (!(k > 0)) g.kolicina = 'Količina mora biti veća od 0.'
        else if (v.vrsta === 'Izlaz') {
            const ima = zaliha(promet.stavke, Number(v.artikl), uredjuje?.sifra)
            if (k > ima) g.kolicina = `Na zalihi je samo ${ima}. Izlaz ne može biti veći od zalihe.`
        }
        return g
    }

    // brisanje ulaza ne smije dovesti zalihu ispod nule
    function blokiraj(p) {
        if (p.vrsta === 'Ulaz' && zaliha(promet.stavke, p.artikl, p.sifra) < 0) return 'Brisanjem ovog ulaza zaliha bi postala negativna.'
        return null
    }

    return (
        <CrudTablica
            naslov={artiklF ? `Promet artikla: ${artikl(artiklF)?.naziv ?? '—'}` : 'Promet zaliha'}
            novi="Novi zapis prometa"
            servis={PrometService}
            stavke={prikaz}
            osvjezi={promet.osvjezi}
            otvoreno0={param === 'novi'}
            prazno="Nema prometa za zadane uvjete."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <select name="vrsta" value={vrsta} onChange={(e) => setVrsta(e.target.value)}>
                        <option value="">Ulazi i izlazi</option>
                        {VRSTE_PROMETA.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            )}
            fields={[
                { name: 'artikl', label: 'Artikl', type: 'select', asNumber: true, required: true, default: artiklF || '', options: artikli.stavke.map((a) => ({ value: a.sifra, label: `${a.oznaka} ${a.naziv}` })) },
                { name: 'datum', label: 'Datum', type: 'date', required: true, default: danas() },
                { name: 'vrsta', label: 'Vrsta prometa', type: 'select', required: true, default: 'Ulaz', options: VRSTE_PROMETA.map((v) => ({ value: v, label: v })) },
                { name: 'kolicina', label: 'Količina', type: 'number', required: true, default: 1 },
                { name: 'napomena', label: 'Napomena', type: 'textarea' },
            ]}
            columns={[
                { render: (p) => formatDatum(p.datum), label: 'Datum' },
                { render: (p) => artikl(p.artikl)?.naziv ?? '—', label: 'Artikl' },
                { render: (p) => <span className={p.vrsta === 'Izlaz' ? 'kasni' : 'oznaka ok'}>{p.vrsta}</span>, label: 'Vrsta' },
                { render: (p) => `${p.kolicina} ${artikl(p.artikl)?.jedinica ?? ''}`, label: 'Količina' },
                { render: (p) => p.napomena || '—', label: 'Napomena' },
            ]}
            blokirajBrisanje={blokiraj}
        />
    )
}
