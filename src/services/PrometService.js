import { napraviServis } from './Kolekcija'
import { pomak } from '../constants'

// Entitet 2: Promet zaliha (ulaz ili izlaz artikla na određeni datum). Demo podaci.
export const promet = [
    { sifra: 1, artikl: 1, datum: pomak(-20), vrsta: 'Ulaz', kolicina: 200, napomena: 'Početno stanje' },
    { sifra: 2, artikl: 1, datum: pomak(-5), vrsta: 'Izlaz', kolicina: 160, napomena: 'Proizvodnja' },
    { sifra: 3, artikl: 2, datum: pomak(-20), vrsta: 'Ulaz', kolicina: 12, napomena: '' },
    { sifra: 4, artikl: 2, datum: pomak(-3), vrsta: 'Izlaz', kolicina: 6, napomena: '' },
    { sifra: 5, artikl: 3, datum: pomak(-10), vrsta: 'Ulaz', kolicina: 40, napomena: '' },
]

export default napraviServis('rr_promet', promet)
