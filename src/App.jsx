import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'
import { site } from './lib/content'

function App() {
  useEffect(() => {
    document.title = `${site.name} — ${site.role}`
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <div className="bg-canvas text-ink transition-colors duration-500 dark:bg-canvas-dark dark:text-ink-dark">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
