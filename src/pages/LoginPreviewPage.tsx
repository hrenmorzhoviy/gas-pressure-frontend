export function LoginPreviewPage() {
  return <main className="add-page">
    <h1 className="page-title">Вход</h1>
    <p className="demo-note">В ЛР5 форма показывается для ознакомления. Вход подключается в ЛР6.</p>
    <fieldset disabled>
      <label className="field-label" htmlFor="preview-user">Имя пользователя</label>
      <input id="preview-user" className="add-input" type="text" />
      <label className="field-label" htmlFor="preview-password">Пароль</label>
      <input id="preview-password" className="add-input" type="password" />
      <button className="btn-filter" type="button">Войти</button>
    </fieldset>
  </main>
}
