# GORDIC integration boundary

This directory is intentionally protocol-agnostic until the concrete school installation is known.

Supported target modes:

- **XRG** — preferred online integration when the organisation has the required licensed service/methods.
- **INT** — batch import/export for installations where batch exchange is the supported route.
- **FILE** — controlled import/export fallback. Never bypass GORDIC by writing directly to its database.
- **MOCK** — local development and contract tests only.

## Rules

1. GORDIC accounting identifiers and accounting values are treated as externally governed fields.
2. QR tokens, photos, issues, service workflow and physical inventory UX remain local product concerns.
3. Every outbound operation must have an idempotency key.
4. External payloads are preserved as snapshots for auditability.
5. Conflicts are explicit records; they are never silently overwritten.
6. Secrets are referenced by `secretRef`; credentials must not be persisted in application configuration rows or source control.

Do not implement an XRG method name or XML schema from assumptions. Add the real adapter only from the licensed documentation/WSDL of the actual GORDIC installation.
