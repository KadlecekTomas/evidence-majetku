# Evidence majetku

Moderní provozní evidence školního majetku: QR štítky, místnosti, rychlá inventura, přesuny, závady, servis a řízená integrace s GORDICem.

## Produktový cíl

GORDIC zůstává účetním/ekonomickým systémem. Evidence majetku má být výrazně jednodušší provozní vrstva, kterou může zaměstnanec školy používat z telefonu bez znalosti účetních struktur.

Pilot počítá s přibližně 100–200 položkami a ověřuje hlavně QR workflow, místnosti, přesuny, historii a mobilní inventuru. Architektura ale od prvního dne počítá s rozšířením na celou školu.

## Zásady

- jedna fyzická položka = jeden permanentní QR token
- místnosti mají vlastní QR a jsou prvotřídní objekty
- skenování je kontinuální a nesmí čekat na server mezi položkami
- inventura bude offline-first
- dashboard ukazuje úkoly a neshody, ne sbírku vanity statistik
- účetní data se neduplikují jako druhý GORDIC
- žádný přímý zápis do databáze GORDICu
- synchronizace je idempotentní, auditovatelná a konflikty jsou explicitní

## GORDIC-ready architektura

Aplikační doména zná pouze integrační kontrakt `AssetSystemConnector`. Konkrétní instalace může později použít XRG, INT nebo řízený souborový fallback bez přepisu jádra.

```text
Evidence majetku
      |
Sync / reconciliation
      |
AssetSystemConnector
  |-- XRG
  |-- INT
  |-- FILE
  `-- MOCK
      |
    GORDIC
```

Skutečný XRG adaptér nebude vznikat z odhadů. Přidá se až podle konkrétní licence, WSDL/metod a dokumentace školní instalace.

## Stack

- Next.js 16.3 / React 19
- TypeScript 5.9
- Tailwind CSS 4
- PostgreSQL 18
- Prisma ORM 7
- Vitest

Prisma 8 zatím není GA, proto je produkční základ záměrně na stabilní řadě Prisma 7.

> Bezpečnostní poznámka: k 24. 8. 2026 je oznámen bezpečnostní release Next.js na 26. 8. 2026. Před jakýmkoli produkčním nasazením je nutné aktualizovat Next.js na opravenou verzi.

## Lokální spuštění

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Kontroly:

```bash
npm run check
npm run build
```

## Dokumentace

- [`docs/architecture.md`](docs/architecture.md) — systémové hranice, synchronizace, source of truth
- [`docs/product-principles.md`](docs/product-principles.md) — UX a designová pravidla
- [`src/integrations/gordic/README.md`](src/integrations/gordic/README.md) — pravidla GORDIC adaptéru

## Stav

První foundation větev obsahuje datový model, GORDIC integrační kontrakt, mock provider, první attention-first dashboard, health endpoint a CI. Následující vertikální slice bude `místnost → QR → inventura → neshoda → sync queue`.
