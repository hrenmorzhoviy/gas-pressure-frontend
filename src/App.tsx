import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { CatalogPage } from './pages/CatalogPage'
import { ReelsPage } from './pages/ReelsPage'
import { AddPage } from './pages/AddPage'
import { LoginPreviewPage } from './pages/LoginPreviewPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/gases" replace />} />
          <Route path="/gases" element={<CatalogPage />} />
          <Route path="/feed" element={<ReelsPage />} />
          <Route path="/feed/:id" element={<ReelsPage />} />
          <Route path="/reels" element={<Navigate to="/feed" replace />} />
          <Route path="/reels/:id" element={<ReelsPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/login" element={<LoginPreviewPage />} />
          <Route path="*" element={<Navigate to="/gases" replace />} />
        </Routes>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}

export default App
