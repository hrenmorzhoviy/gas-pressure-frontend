import { fallbackImage, fallbackVideo } from '../components/mediaFallback'
import { useState, useEffect } from 'react'
import type { ChangeEvent, SubmitEventHandler } from 'react'

const DEFAULT_IMAGE = '/default.png'
const DEFAULT_VIDEO = '/default.mp4'

interface FormState {
  name: string
  description: string
  molar_mass: string
  density: string
}

const EMPTY_FORM: FormState = {
  name: '',
  description: '',
  molar_mass: '',
  density: '',
}

export const AddPage = () => {
  const [fileError, setFileError] = useState('')
  const [completed, setCompleted] = useState(false)
  const [step, setStep] = useState<'name' | 'details'>('name')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [imageName, setImageName] = useState('Файл не выбран')
  const [videoName, setVideoName] = useState('Файл не выбран')

  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setName: (v: string) => void,
    setUrl: (v: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const expectedType = e.currentTarget.accept.split('/')[0]
    if (!file.type.startsWith(`${expectedType}/`) || file.size === 0) {
      setFileError('Выберите непустой файл подходящего типа — изображение или видео.')
      e.currentTarget.value = ''
      return
    }
    setFileError('')
    setCompleted(false)
    setName(file.name)
    setUrl(URL.createObjectURL(file))
    e.currentTarget.value = ''
  }

  const handleNameSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const nameInput = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    nameInput.setCustomValidity(form.name.trim() ? '' : 'Введите название, а не пробелы.')
    if (!nameInput.reportValidity()) return
    setCompleted(false)
    setFileError('')
    setStep('details')
  }

  const handlePublish: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const descriptionInput = e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement
    descriptionInput.setCustomValidity(form.description.trim() ? '' : 'Введите описание, а не пробелы.')
    if (!descriptionInput.reportValidity()) return
    setFileError('')
    setCompleted(true)
    setStep('name')
    setForm(EMPTY_FORM)
    setImageName('Файл не выбран')
    setVideoName('Файл не выбран')

    setImageUrl('')
    setVideoUrl('')
  }

  return (
    <main className="add-page">
      <header className="add-header">
        <span className="add-badge">ЛР5</span>
        <h1 className="page-title">
          {step === 'name' ? 'Новый газ' : 'Публикация газа'}
        </h1>
      </header>

      <p className="demo-note">Демонстрационная форма ЛР5. Данные не сохраняются.</p>
      {fileError && <p className="form-message" role="alert">{fileError}</p>}
      {completed && <p className="form-message" role="status">Демонстрационная публикация завершена. Поля сброшены.</p>}
      {step === 'name' && (
        <form onSubmit={handleNameSubmit}>
          <section className="add-section">
            <h2>Изображение</h2>
            <img
              onError={event => {
                if (imageUrl) setFileError('Не удалось прочитать изображение. Показана картинка по умолчанию.')
                fallbackImage(event)
              }}
              className="add-preview"
              alt={imageUrl ? "Выбранное изображение" : "Изображение по умолчанию"}
              src={imageUrl || DEFAULT_IMAGE}
            />
            <label className="file-field-custom">
              <input
                type="file"
                accept="image/*"
                aria-label="Изображение"
                onChange={(e) =>
                  handleFileChange(e, setImageName, setImageUrl)
                }
              />
              <span className="file-button">Выбрать файл</span>
              <span className="file-name">{imageName}</span>
            </label>
          </section>

          <section className="add-section">
            <h2>Видео</h2>
            <video
        onError={event => {
                if (videoUrl) setFileError('Не удалось воспроизвести видео. Показано видео по умолчанию.')
                fallbackVideo(event)
              }}
              className="add-preview"
              controls
              preload="metadata"
              playsInline
              src={videoUrl || DEFAULT_VIDEO}
            />
            <label className="file-field-custom">
              <input
                type="file"
                accept="video/*"
                aria-label="Видео"
                onChange={(e) =>
                  handleFileChange(e, setVideoName, setVideoUrl)
                }
              />
              <span className="file-button">Выбрать файл</span>
              <span className="file-name">{videoName}</span>
            </label>
          </section>

          <label className="field-label" htmlFor="name">
            Название газа
          </label>
          <input
            className="add-input"
            id="name"
            name="name"
            type="text"
            placeholder="Например, Кислород"
            required
            maxLength={100}
            onInput={event => event.currentTarget.setCustomValidity('')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <button className="btn-filter" type="submit">
            Далее
          </button>
        </form>
      )}

      {step === 'details' && (
        <form onSubmit={handlePublish}>
          <section className="add-section">
            <h2>Изображение</h2>
            <img
              onError={event => {
                if (imageUrl) setFileError('Не удалось прочитать изображение. Показана картинка по умолчанию.')
                fallbackImage(event)
              }}
              className="add-preview"
              src={imageUrl || DEFAULT_IMAGE}
              alt={form.name}
            />
          </section>

          <section className="add-section">
            <h2>Видео</h2>
            <video
        onError={event => {
                if (videoUrl) setFileError('Не удалось воспроизвести видео. Показано видео по умолчанию.')
                fallbackVideo(event)
              }}
              className="add-preview"
              src={videoUrl || DEFAULT_VIDEO}
              controls
              preload="metadata"
              playsInline
            />
          </section>

          <label className="field-label" htmlFor="description">
            Краткое описание газа
          </label>
          <textarea
            className="add-input"
            id="description"
            name="description"
            required
            maxLength={1000}
            onInput={event => event.currentTarget.setCustomValidity('')}
            placeholder="Краткое описание газа"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <label className="field-label" htmlFor="molar_mass">
            Молярная масса, г/моль
          </label>
          <input
            className="add-input"
            id="molar_mass"
            name="molar_mass"
            type="number"
            step="0.001"
            min="0.001"
            max="1000"
            required
            value={form.molar_mass}
            onChange={(e) => setForm({ ...form, molar_mass: e.target.value })}
          />

          <label className="field-label" htmlFor="density">
            Плотность, кг/м³
          </label>
          <input
            className="add-input"
            id="density"
            name="density"
            type="number"
            step="0.0001"
            min="0.0001"
            max="100"
            required
            value={form.density}
            onChange={(e) =>
              setForm({ ...form, density: e.target.value })
            }
          />

          <button className="btn-filter" type="button" onClick={() => setStep('name')}>Назад к названию и файлам</button>
          <button className="btn-filter" type="submit">
            Опубликовать
          </button>
        </form>
      )}
    </main>
  )
}
