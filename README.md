# Bergen StupeKlubb

Velkommen til Stupekubben sin nettside.
Under finner du info om de forskjellige mappene om hva de gjør og/eller hva de inneholder.

**Start alltid med: [`npm install`] i termianlen**

## SRC/APP

Her ligger alle sidene til nettsiden i forskjellige under mapper.
til venstre er mappen og til høyre er en liten beskrivelse på hva den gjør. (vis det står ikke rør så IKKE RØR)

- **api** - inneholder api til forskjellige tjenester
- **bliMedlem og bliMedlem/påmeldingSkjema** - her ligger info for å bli medlem i stupe klubben (under components/Påmelding ligger alle de forskjellige formene som brukes til å lage/sende skjemet for siden)

## PUBLIC

Her ligger alle bildene som vi bruker til prosjekte.

## COMPONENTS

Her ligger egene komponenter som skjema, articler, stucturer eller fulle sider som blir plasser i [`src/app/<next.js-mappe>/page.tsx`].

## LIB

Her ligger all TypeScript/JavaScript som vi bruker for enkle klasser (class) eller funkjoner (function) som vi ser går igjen. Alt blir importert til de forskjellige page.tsx eller components-mappen

- **Resend** - er oppsette til å sende meldinger
- **Supabase/client** - er det som kan vises på client siden for frontend-delen uten at den viser sensetiv info/logik
- **Supabase/server** - er det som ikke skal vise på client siden for det inneholder backend-delen

## .ENV.LOCAL

Her skal all dine API nøkkler ligge og skal **ALDRI** deles. Lag alltid dine egene nøkkler fra Resend og Supabase.
Dette er nøkkle som må fylles ut for at Resend og Supabase skal funke:

- RESEND_API
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY