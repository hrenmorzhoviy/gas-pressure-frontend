import { Form } from 'react-bootstrap'
import type { CSSProperties } from 'react'
export interface MassRange { min: number; max: number }
interface Props {
  value: MassRange
  bounds: MassRange
  onChange: (value: MassRange) => void
  onApply: () => void
}
export function MassFilter({ value, bounds, onChange, onApply }: Props) {
  const trackStyle = (mass: number) => ({ '--val': `${bounds.max === bounds.min ? 0 : (mass - bounds.min) / (bounds.max - bounds.min) * 100}%` }) as CSSProperties
  return <Form className="filter-block" onSubmit={event => { event.preventDefault(); onApply() }}>
    <div className="filter-caption">Молярная масса (г/моль)</div>
    <div className="filter-range-row">
      <label htmlFor="range-min">от</label>
      <input type="range" id="range-min" aria-label="Минимальная молярная масса"
        min={bounds.min} max={bounds.max} step="0.001" value={value.min} style={trackStyle(value.min)}
        onChange={event => { const min = Number(event.target.value); onChange({ min, max: Math.max(min, value.max) }) }} />
      <output className="range-value" htmlFor="range-min">{value.min.toFixed(3)}</output>
    </div>
    <div className="filter-range-row">
      <label htmlFor="range-max">до</label>
      <input type="range" id="range-max" aria-label="Максимальная молярная масса"
        min={bounds.min} max={bounds.max} step="0.001" value={value.max} style={trackStyle(value.max)}
        onChange={event => { const max = Number(event.target.value); onChange({ min: Math.min(value.min, max), max }) }} />
      <output className="range-value" htmlFor="range-max">{value.max.toFixed(3)}</output>
    </div>
    <div className="filter-labels"><span>{bounds.min.toFixed(3)}</span><span>{bounds.max.toFixed(3)}</span></div>
    <button type="submit" className="btn-filter">Применить фильтр</button>
  </Form>
}
