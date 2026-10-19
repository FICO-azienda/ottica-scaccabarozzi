# Ottica Scaccabarozzi · sito demo (FICO)

Sito vetrina statico (HTML + CSS + JS vanilla, nessuna dipendenza né build).

## Avvio in locale

```bash
cd ottica-scaccabarozzi
python3 -m http.server 4321
```

Poi apri http://localhost:4321.

## Struttura

- `index.html`: pagina unica con Hero, La storia (timeline 1923–oggi e ricordo della signora Paola), Laboratorio, Servizi (con il check-up di ottobre), Quartiere e rassegna stampa, Recensioni, Orari e contatti, Footer con firma FICO
- `css/style.css`: stili e responsive
- `js/main.js`: header compatto, menu mobile, stato "aperto ora" (ora di Milano), mappa caricata su clic, animazioni di comparsa (disattivate con prefers-reduced-motion)
- `images/`: foto in JPG/WebP a due misure, più il logo FICO

## Fonti (verificate il 19/10/2026)

Solo le due fonti indicate dal cliente:

1. **Scheda Google Maps** "Ottica Scaccabarozzi": Via Paolo Sarpi 63, 20154 Milano · tel. 02 3310 1917 · orari Mar–Sab 9–12:30 e 15–19, Dom e Lun chiuso · 4,9 su 33 recensioni (dato che cambia nel tempo) · recensioni di Antinea, Emanuele, Mauro
2. **Pagina Facebook** Ottica Scaccabarozzi (ID 100057200630484): categoria, email info@otticascaccabarozzi.it, fascia di prezzo €€, foto e didascalie dei post, commenti dei clienti (Maurizio P., Mariella P.) sotto il post del 23/02/2018, post del 16/04/2020 sulla signora Paola, locandina CERT.O "Ottobre mese della vista" del 3/10/2026

La storia della bottega (1923, Carlo Scaccabarozzi e Angela Fradegrada, 1944, Arturo, la signora Paola, Paolo ed Enrico Samarati dal 1981, il laboratorio) è presa dall'articolo de **Il Giorno** del 21/02/2018 ("La bottega storica – La storia si vede bene ed è hi-tech", di Alberto Oliva), pubblicato come foto sulla pagina Facebook.

Nota: la targa di Bottega Storica fotografata nell'articolo e la didascalia di una foto del 2011 riportano "1927", mentre il testo dell'articolo indica il 1923 come anno di apertura. Il sito usa il 1923: da confermare con il titolare.

## Foto

Tutte provengono dalla pagina Facebook della bottega. Le 2 foto della scheda Google Maps (una Street View e la saracinesca chiusa con graffiti) non sono state usate.
Prima della pubblicazione definitiva serve l'autorizzazione del titolare; per le due immagini tratte da Il Giorno (pagina intera e ritaglio della foto del laboratorio) va verificato anche il diritto d'uso con la testata.

| File | Soggetto | Post Facebook |
|---|---|---|
| interno-bottega-sarpi | Interno della bottega (hero) | foto di copertina, 27/09/2022 |
| vetrina-storica-seppia | Le vetrine in foto seppia (album "Foto negozio", didascalia "Bottega Storica dal 1927") | 23/12/2011 |
| via-sarpi-foto-epoca | Via Paolo Sarpi d'epoca, ritagliata senza la scritta "Sarpi DOC" (album "Foto via Sarpi (storica)") | 23/12/2011 |
| ingresso-insegna-ottica | Ingresso con insegna (sfondo del riquadro mappa) | 27/09/2022 |
| signora-paola | La signora Paola | 16/04/2020 |
| il-giorno-bottega-storica-2018 | Pagina de Il Giorno | 23/02/2018 |
| il-giorno-foto-laboratorio | Ritaglio della foto principale dell'articolo | 23/02/2018 |
| capodanno-cinese-via-sarpi | Il drago del Capodanno cinese davanti alla bottega | 09/02/2019 |
| ottobre-mese-della-vista | Locandina CERT.O | 03/10/2026 |
