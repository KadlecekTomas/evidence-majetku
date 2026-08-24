const navItems = ["Přehled", "Majetek", "Místnosti", "Inventury", "Závady", "Servis", "Reporty"];

const attentionItems = [
  {
    title: "Nedokončená inventura",
    detail: "Učebna 204 · 31 z 34 položek",
    tone: "warning",
    action: "Pokračovat",
  },
  {
    title: "Majetek na špatném místě",
    detail: "2 položky vyžadují kontrolu",
    tone: "danger",
    action: "Zkontrolovat",
  },
  {
    title: "Nevyřešené závady",
    detail: "5 otevřených · 1 čeká déle než 7 dní",
    tone: "neutral",
    action: "Otevřít",
  },
] as const;

function Mark({ tone }: { tone: (typeof attentionItems)[number]["tone"] }) {
  const classes = {
    warning: "bg-[var(--warning)]",
    danger: "bg-[var(--danger)]",
    neutral: "bg-[#697386]",
  };

  return <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${classes[tone]}`} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 md:pb-0">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] px-4 py-5 md:flex md:flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white">EV</div>
            <div>
              <p className="m-0 text-sm font-semibold tracking-[-0.01em]">Evidence majetku</p>
              <p className="m-0 mt-0.5 text-xs text-[var(--text-muted)]">Školní provoz</p>
            </div>
          </div>

          <nav className="space-y-1" aria-label="Hlavní navigace">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[#4b5563] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-[var(--border)] pt-4">
            <a href="#" className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-[#4b5563] hover:bg-[var(--surface-subtle)]">Integrace</a>
            <a href="#" className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-[#4b5563] hover:bg-[var(--surface-subtle)]">Nastavení</a>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[rgba(247,248,250,0.92)] px-4 backdrop-blur md:px-8">
            <div>
              <p className="m-0 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)] md:hidden">Evidence majetku</p>
              <p className="m-0 hidden text-sm font-medium text-[var(--text-muted)] md:block">Přehled</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden min-w-72 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-muted)] lg:block">Hledat majetek, EV, sériové číslo…</div>
              <div className="flex items-center gap-2 rounded-full border border-[#cfeadb] bg-[var(--success-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--success)]">
                <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                GORDIC připraven
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="m-0 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">Co potřebuje pozornost</h1>
                <p className="m-0 mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">Přehled ukazuje jen věci, které vyžadují akci. Statistiky a účetní reporty zůstávají mimo hlavní pracovní plochu.</p>
              </div>
              <button className="h-11 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">Skenovat QR</button>
            </div>

            <div className="grid gap-3">
              {attentionItems.map((item) => (
                <article key={item.title} className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.03)] md:p-5">
                  <Mark tone={item.tone} />
                  <div className="min-w-0 flex-1">
                    <h2 className="m-0 text-sm font-semibold tracking-[-0.01em]">{item.title}</h2>
                    <p className="m-0 mt-1 text-sm text-[var(--text-muted)]">{item.detail}</p>
                  </div>
                  <button className="shrink-0 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold text-[#344054] hover:bg-[var(--surface-subtle)]">{item.action}</button>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <section className="rounded-2xl border border-[var(--border)] bg-white p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="m-0 text-base font-semibold tracking-[-0.015em]">Probíhající inventura</h2>
                    <p className="m-0 mt-1 text-sm text-[var(--text-muted)]">Učebna 204</p>
                  </div>
                  <span className="rounded-full bg-[var(--warning-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--warning)]">91 %</span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#edf0f2]">
                  <div className="h-full w-[91%] rounded-full bg-[var(--accent)]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-[var(--surface-subtle)] p-3"><strong className="block text-lg">31</strong><span className="text-xs text-[var(--text-muted)]">nalezeno</span></div>
                  <div className="rounded-xl bg-[var(--danger-soft)] p-3"><strong className="block text-lg">2</strong><span className="text-xs text-[var(--text-muted)]">chybí</span></div>
                  <div className="rounded-xl bg-[var(--warning-soft)] p-3"><strong className="block text-lg">1</strong><span className="text-xs text-[var(--text-muted)]">jinde</span></div>
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--border)] bg-white p-5 md:p-6">
                <h2 className="m-0 text-base font-semibold tracking-[-0.015em]">Integrace</h2>
                <div className="mt-5 flex items-center justify-between rounded-xl border border-[#d9eadf] bg-[var(--success-soft)] p-4">
                  <div>
                    <p className="m-0 text-sm font-semibold">GORDIC</p>
                    <p className="m-0 mt-1 text-xs text-[var(--success)]">Integrační hranice připravena</p>
                  </div>
                  <span className="text-xs font-bold text-[var(--success)]">READY</span>
                </div>
                <p className="m-0 mt-4 text-xs leading-5 text-[var(--text-muted)]">Konkrétní XRG/INT adaptér se zapne až podle licence a rozhraní instalace školy. Do databáze GORDICu se nikdy nezapisuje napřímo.</p>
              </section>
            </div>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-20 grid-cols-5 border-t border-[var(--border)] bg-white px-2 pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Mobilní navigace">
        {['Domů', 'Majetek', 'SCAN', 'Inventury', 'Více'].map((item) => (
          <button key={item} className={`text-[11px] font-semibold ${item === 'SCAN' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
            {item === 'SCAN' ? <span className="mx-auto mb-1 grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent)] text-[10px] font-bold text-white shadow-sm">QR</span> : <span className="mx-auto mb-2 block h-2 w-2 rounded-full bg-current opacity-60" />}
            {item}
          </button>
        ))}
      </nav>
    </main>
  );
}
