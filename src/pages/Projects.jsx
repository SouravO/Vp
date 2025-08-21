export default function Projects() {
  const items = [
    {img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1200&auto=format&fit=crop', name:'Arena Five', city:'Bengaluru', scope:'Base + Turf + Lighting'},
    {img:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', name:'Goal Hub 7s', city:'Mumbai', scope:'Turf + Fencing'},
    {img:'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1200&auto=format&fit=crop', name:'City Sports Park', city:'Kochi', scope:'Turnkey'}
  ]
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Projects</h1>
        <p className="section-lead">A few of the many facilities we have delivered.</p>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
          {items.map((p, i) => (
            <article className="card project shadow-sm" key={i}>
              <img src={p.img} alt={p.name} />
              <div className="meta">
                <h3 style={{margin:'8px 0 4px'}}>{p.name}</h3>
                <span className="muted">{p.city} • {p.scope}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


