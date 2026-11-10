# Evidencija repromaterijala

Evidencija artikala repromaterijala i prometa zaliha (ulazi i izlazi).

Autor: Tomislav Ferić

## Entiteti (CRUD nad oba)

- **Artikl**: naziv, oznaka (šifra, jedinstvena), jedinica mjere (kom, kg, l, m, pak), minimalna zaliha, cijena po jedinici (€), rok valjanosti, aktivan (kvačica), napomena
- **Promet zaliha**: artikl, datum, vrsta prometa (ulaz ili izlaz), količina, napomena; svaki promet pripada jednom artiklu (1 : N)

## Funkcije
- Početna: broj aktivnih artikala, artikli ispod minimalne zalihe, artikli kojima rok valjanosti ističe u 14 dana, vrijednost zalihe, broj zapisa prometa ovaj mjesec i popis artikala ispod minimalne zalihe.
- Artikli: popis, unos, izmjena i brisanje.
- Promet zaliha: popis prometa svih artikala ili jednog artikla, unos, izmjena i brisanje.
- Zaliha artikla je zbroj ulaza umanjen za zbroj izlaza.
- Provjere unosa: obavezna polja, jedinstvena oznaka artikla, minimalna zaliha i cijena nisu negativne, količina prometa veća od 0, izlaz ne može biti veći od zalihe.
- Brisanje uz potvrdu; artikl s prometom ne može se obrisati, a ulaz se ne može obrisati ako bi zaliha postala negativna.

Početni podaci su izmišljeni (demo). Podaci se spremaju u `localStorage`.

## Tehnologije
React 19, Vite
