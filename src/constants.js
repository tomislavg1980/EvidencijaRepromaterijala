export const IME_APLIKACIJE = 'Evidencija repromaterijala'
export const AUTOR = 'Tomislav Ferić'

export const STRANICE = [
    { id: 'pocetna', naziv: 'Početna', izbornik: true },
    { id: 'artikli', naziv: 'Artikli', izbornik: true },
    { id: 'promet', naziv: 'Promet zaliha', izbornik: true },
]

export const JEDINICE = ['kom', 'kg', 'l', 'm', 'pak']
export const VRSTE_PROMETA = ['Ulaz', 'Izlaz']

export const formatDatum = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '')
export const formatEuro = (n) => `${Number(n || 0).toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const danas = () => iso(new Date())
export const pomak = (dana) => { const d = new Date(); d.setDate(d.getDate() + dana); return iso(d) }

// zaliha artikla = zbroj ulaza - zbroj izlaza (opcionalno bez jednog zapisa prometa)
export const zaliha = (promet, artikl, izuzmi = 0) =>
    promet.filter((p) => p.artikl === artikl && p.sifra !== izuzmi)
        .reduce((s, p) => s + (p.vrsta === 'Ulaz' ? 1 : -1) * Number(p.kolicina || 0), 0)
