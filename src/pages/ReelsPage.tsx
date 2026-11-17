import { useNavigate, useParams, Link } from 'react-router-dom'
import { GASES } from '../modules/mock'
import { fallbackImage, fallbackVideo } from '../components/mediaFallback'
export function ReelsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gas = GASES.find(item => item.id === (id ? Number(id) : GASES[0]?.id))
  if (!gas) return <main className="empty-feed"><h1>Газ не найден</h1><p>Выберите газ в разделе «Газы».</p><Link to="/gases" className="btn-filter">К списку газов</Link></main>
  const nextGas = GASES[(GASES.indexOf(gas) + 1) % GASES.length]
  return <main className="feed-page">
    <video key={gas.id} className="feed-video" src={gas.video_url || '/default.mp4'} poster={gas.image_url || '/default.png'} autoPlay muted loop playsInline onError={fallbackVideo}/>
    <img className="feed-img-fallback" src={gas.image_url || '/default.png'} alt="" onError={fallbackImage}/>
    <div className="feed-gradient"/>
    <div className="feed-overlay">
      <div className="feed-left">
        <h1 className="feed-gas-name">{gas.name}</h1>
        <div className="feed-desc-wrap" key={gas.id}>
          <input type="checkbox" className="feed-desc-toggle" id={`desc-${gas.id}`} aria-label="Развернуть описание"/>
          <p className="feed-desc-short">{gas.description}</p><p className="feed-desc-full">{gas.description}</p>
          <label className="feed-desc-btn" htmlFor={`desc-${gas.id}`}><span className="more-label">Ещё ▾</span><span className="less-label">Скрыть ▴</span></label>
        </div>
        {!!gas.attributes?.length && <details className="feed-attributes" key={gas.id}>
          <summary>Характеристики</summary>
          <dl>{gas.attributes.map(({ name, value }) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
        </details>}
      </div>
      <div className="feed-right">
        <div className="feed-props">
          <div className="feed-prop"><span className="feed-prop-label">Молярная масса</span><span className="feed-prop-value">{gas.molar_mass.toFixed(3)} г/моль</span></div>
          <div className="feed-prop"><span className="feed-prop-label">Плотность</span><span className="feed-prop-value">{gas.density.toFixed(4)} кг/м³</span></div>
        </div>
        <div className="feed-like-form"><button className="feed-like-btn" disabled title="Лайки станут доступны после подключения авторизации" aria-label="Поставить лайк недоступно">♡</button><span className="feed-like-count">{gas.likes_count}</span></div>
        <button className="feed-next-btn" onClick={() => navigate(`/feed/${nextGas.id}`)}>Следующий →</button>
      </div>
    </div>
  </main>
}
