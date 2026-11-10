import { napraviServis } from './Kolekcija'
import { pomak } from '../constants'

// Entitet 1: Artikl (repromaterijal). Početni podaci su izmišljeni (demo).
export const artikli = [
    { sifra: 1, naziv: 'Brašno tip 550 (demo)', oznaka: 'RM-001', jedinica: 'kg', minimalna: 50, cijena: 0.85, rok: pomak(90), aktivan: true, napomena: '' },
    { sifra: 2, naziv: 'Kvasac svježi (demo)', oznaka: 'RM-002', jedinica: 'kg', minimalna: 5, cijena: 3.2, rok: pomak(10), aktivan: true, napomena: 'Čuvati u hladnjaku.' },
    { sifra: 3, naziv: 'Papirnate vrećice (demo)', oznaka: 'RM-003', jedinica: 'pak', minimalna: 20, cijena: 4.5, rok: '', aktivan: true, napomena: '' },
]

export default napraviServis('rr_artikli', artikli)
