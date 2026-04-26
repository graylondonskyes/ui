import { useMemo, useState } from 'react';

export function KaixuPanel({ title, eyebrow, children, actions, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={expanded ? 'kaixu-card kaixu-panel kaixu-panel-expanded' : 'kaixu-card kaixu-panel'}>
      <header className="kaixu-panel-header">
        <div>
          {eyebrow ? <p className="kaixu-eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        <div className="kaixu-panel-actions">
          {actions}
          <button type="button" className="kaixu-ghost-button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? 'Restore' : 'Expand'}
          </button>
          <button type="button" className="kaixu-ghost-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? '−' : '+'}
          </button>
        </div>
      </header>
      {open ? <div className="kaixu-panel-body">{children}</div> : null}
    </section>
  );
}

export default function KaixuProMaxShell({ brand = 'kAIxU', title, subtitle, nav = [], children }) {
  const safeNav = useMemo(() => nav.filter((item) => item?.label && item?.href), [nav]);

  return (
    <main className="kaixu-premium-shell">
      <div className="kaixu-orb kaixu-orb-one" />
      <div className="kaixu-orb kaixu-orb-two" />
      <nav className="kaixu-nav" aria-label="Primary navigation">
        <a className="kaixu-brand" href="/">{brand}</a>
        <div className="kaixu-nav-links">
          {safeNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
      </nav>
      <section className="kaixu-hero">
        <p className="kaixu-eyebrow">Premium operating surface</p>
        <h1>{title}</h1>
        {subtitle ? <p className="kaixu-hero-copy">{subtitle}</p> : null}
      </section>
      <section className="kaixu-content-grid">{children}</section>
    </main>
  );
}
