export default function Maintenance() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Maintenance</h1>
        <p className="section-lead">Protect your investment with our Annual Maintenance Contracts.</p>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
          {[
            {t:'Quarterly grooming', d:'Deep brushing, infill distribution, seam checks.'},
            {t:'Top‑ups & repairs', d:'Infill additions, localized fiber repairs, line markings.'},
            {t:'Play testing', d:'Ball roll, shock absorption, and traction checks.'}
          ].map((s, i) => (
            <div key={i} className="card shadow-sm" style={{padding:18}}>
              <h3 style={{margin:'0 0 6px'}}>{s.t}</h3>
              <p className="muted" style={{margin:0}}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


