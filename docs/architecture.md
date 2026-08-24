# Architecture

## Product boundary

The application is the operational layer for physical school assets. GORDIC remains the accounting/economic system of record wherever the concrete installation governs a field.

### Source-of-truth policy

| Data | Governing system |
| --- | --- |
| Accounting/inventory number | GORDIC when available |
| Acquisition price/date | GORDIC |
| Accounting classification / depreciation | GORDIC only |
| QR token | Evidence majetku |
| Photos | Evidence majetku |
| Issues and service workflow | Evidence majetku |
| Mobile/offline inventory observations | Evidence majetku |
| Physical location | Controlled bidirectional sync where supported |
| Responsible person | Controlled bidirectional sync where supported |

A field with two potential writers must have an explicit conflict policy before bidirectional writes are enabled.

## GORDIC adapter strategy

The domain depends only on `AssetSystemConnector`. Concrete adapters will be added behind it:

```text
Asset domain
    |
Sync service / reconciliation
    |
AssetSystemConnector
    |-- GordicXrgConnector   (online, only from licensed WSDL/docs)
    |-- GordicIntConnector   (batch)
    |-- GordicFileConnector  (controlled fallback)
    `-- MockGordicConnector  (tests/dev)
```

No direct writes to a GORDIC database are permitted.

## Reliability rules

- Local operational work must continue during a GORDIC outage.
- Every outbound mutation is queued and idempotent.
- Failed work is retryable with bounded backoff; deterministic failures are surfaced instead of looped forever.
- External responses are captured as immutable snapshots where needed for audit/reconciliation.
- Conflicts are first-class records. There is no silent last-write-wins policy for governed fields.
- Credentials are provided by secret management/environment and referenced by configuration; they are not stored as plain application data.

## QR design

QR codes contain a permanent opaque token/deep link, not mutable business data. A room QR is contextual: the same token can open the room, start an inventory, or become a move destination depending on the active workflow.

## Offline inventory direction

The scanning client will become offline-first. A room inventory is downloaded to the client, scans are persisted locally with unique idempotency keys, and the event stream is synchronized when connectivity returns. Continuous scanning must not wait for a server round trip between items.

## Current technology baseline

- Next.js App Router + React + TypeScript
- Tailwind CSS design tokens
- PostgreSQL
- Prisma ORM 7 (stable; Prisma 8 is not yet GA)
- Vitest contract/unit tests

The architecture deliberately avoids introducing queues, caches or microservices before observed load requires them. The sync queue starts as durable PostgreSQL state so operational complexity stays low.
