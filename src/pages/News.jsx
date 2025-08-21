export default function News() {
  const posts = [
    {title:'Guide to selecting a football turf system', date:'2025‑02‑01'},
    {title:'Lighting design basics for 5‑a‑side fields', date:'2025‑01‑12'},
    {title:'Monsoon maintenance checklist', date:'2024‑11‑28'}
  ]
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">News</h1>
        <p className="section-lead">Insights, guides, and company updates.</p>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
          {posts.map((p, i) => (
            <article className="card shadow-sm" key={i} style={{padding:18}}>
              <div className="muted" style={{fontSize:14}}>{p.date}</div>
              <h3 style={{margin:'6px 0 0'}}>{p.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


