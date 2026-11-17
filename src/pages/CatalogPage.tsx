import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MassFilter } from '../components/MassFilter'
import { fallbackImage } from '../components/mediaFallback'
import { GASES } from '../modules/mock'
const bounds = { min: Math.min(...GASES.map(gas => gas.molar_mass)), max: Math.max(...GASES.map(gas => gas.molar_mass)) }
export function CatalogPage() {
  const [range, setRange] = useState(bounds)
  const [appliedRange, setAppliedRange] = useState(bounds)
  const visibleGases = GASES.filter(gas => gas.molar_mass >= appliedRange.min && gas.molar_mass <= appliedRange.max)
  return <main>
    <h1 className="page-title">Газы</h1>
    <MassFilter value={range} bounds={bounds} onChange={setRange} onApply={() => setAppliedRange({ ...range })}/>
    <div className="gases-grid" aria-live="polite">
      {visibleGases.map(gas => <div className="gas-card-wrap" key={gas.id}>
        <Link className="gas-card-link" to={`/feed/${gas.id}`}>
          <article className="gas-card">
            <img className="gas-card-img" src={gas.image_url || '/placeholder.svg'} onError={fallbackImage} alt={gas.name}/>
            <div className="gas-card-body">
              <h2 className="gas-card-name">{gas.name}</h2>
              <p className="gas-card-meta">М = {gas.molar_mass.toFixed(3)} г/моль</p>
              <p className="gas-card-meta">ρ = {gas.density.toFixed(4)} кг/м³</p>
              <div className="gas-card-likes" aria-label={`Лайков: ${gas.likes_count}`}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{gas.likes_count}</div>
            </div>
          </article>
        </Link>
      </div>)}
      {!visibleGases.length && <p className="empty-state">Газы не найдены</p>}
    </div>
  </main>
}
