import { useState } from 'react';

export default function KaixuPanel({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={expanded ? 'kaixu-card kaixu-panel kaixu-panel-expanded' : 'kaixu-card kaixu-panel'}>
      <header className="kaixu-panel-header">
        <h2>{title}</h2>
        <div className="kaixu-panel-actions">
          <button type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? 'Restore' : 'Expand'}</button>
          <button type="button" onClick={() => setOpen((value) => !value)}>{open ? '−' : '+'}</button>
        </div>
      </header>
      {open ? <div className="kaixu-panel-body">{children}</div> : null}
    </section>
  );
}
