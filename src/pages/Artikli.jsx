import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { JEDINICE, formatDatum, formatEuro, zaliha } from '../constants'
import { useLista } from '../hooks'
import ArtiklService from '../services/ArtiklService'
import PrometService from '../services/PrometService'

export default function Artikli({ idi, param }) {

    const artikli = useLista(ArtiklService)
    const promet = useLista(PrometService)
    const [trazi, setTrazi] = useState('')
    const [samoNisko, setSamoNisko] = useState(false)

    const stanje = (a) => zaliha(promet.stavke, a.sifra)
    const broj = (a) => promet.stavke.filter((p) => p.artikl === a.sifra).length
    const prikaz = artikli.stavke
        .filter((a) => !trazi || `${a.naziv} ${a.oznaka}`.toLowerCase().includes(trazi.toLowerCase()))
        .filter((a) => !samoNisko || stanje(a) < Number(a.minimalna))
        .sort((a, b) => a.naziv.localeCompare(b.naziv, 'hr'))

    function validate(v, uredjuje) {
        const g = {}
        if (artikli.stavke.some((a) => a.oznaka.trim().toLowerCase() === v.oznaka.trim().toLowerCase() && a.sifra !== uredjuje?.sifra)) g.oznaka = 'Ta oznaka već postoji.'
        if (Number(v.minimalna) < 0) g.minimalna = 'Minimalna zaliha ne može biti negativna.'
        if (Number(v.cijena) < 0) g.cijena = 'Cijena ne može biti negativna.'
        return g
    }

    return (
        <CrudTablica
            naslov="Artikli"
            novi="Novi artikl"
            servis={ArtiklService}
            stavke={prikaz}
            osvjezi={artikli.osvjezi}
            otvoreno0={param === 'novi'}
            prazno="Nema artikala za zadane uvjete."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <input type="search" name="trazi" placeholder="Traži po nazivu ili oznaci" value={trazi} onChange={(e) => setTrazi(e.target.value)} />
                    <label className="kvacica-filtar">
                        <input type="checkbox" checked={samoNisko} onChange={(e) => setSamoNisko(e.target.checked)} />
                        Samo ispod minimuma
                    </label>
                </div>
            )}
            fields={[
                { name: 'naziv', label: 'Naziv artikla', required: true },
                { name: 'oznaka', label: 'Oznaka (šifra)', required: true },
                { name: 'jedinica', label: 'Jedinica mjere', type: 'select', required: true, default: 'kom', options: JEDINICE.map((j) => ({ value: j, label: j })) },
                { name: 'minimalna', label: 'Minimalna zaliha', type: 'number', required: true, default: 0 },
                { name: 'cijena', label: 'Cijena po jedinici (€)', type: 'number', required: true, default: 0 },
                { name: 'rok', label: 'Rok valjanosti', type: 'date' },
                { name: 'aktivan', label: 'Aktivan', type: 'checkbox', default: true },
                { name: 'napomena', label: 'Napomena', type: 'textarea' },
            ]}
            columns={[
                { key: 'oznaka', label: 'Oznaka' },
                { key: 'naziv', label: 'Artikl' },
                { render: (a) => <span className={stanje(a) < Number(a.minimalna) ? 'kasni' : ''}>{stanje(a)} {a.jedinica}</span>, label: 'Zaliha' },
                { render: (a) => `${a.minimalna} ${a.jedinica}`, label: 'Minimum' },
                { render: (a) => formatEuro(a.cijena), label: 'Cijena' },
                { render: (a) => (a.rok ? formatDatum(a.rok) : '—'), label: 'Rok valjanosti' },
                { render: (a) => <button className="veza" onClick={() => idi('promet', `artikl-${a.sifra}`)}>{broj(a)} zapisa</button>, label: 'Promet' },
            ]}
            blokirajBrisanje={(a) => (broj(a) > 0 ? 'Artikl ima evidentiran promet. Prvo obrišite njegov promet.' : null)}
        />
    )
}
