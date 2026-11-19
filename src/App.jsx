import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContactModalProvider } from './context/ContactModalContext'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import VisitorTracker from './components/VisitorTracker'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ProjectPage from './pages/ProjectPage'
import AnalyticsPage from './pages/AnalyticsPage'
import NotFound from './pages/NotFound'
import { site } from './lib/content'

function AppShell() {
  const { pathname } = useLocation()
  const isAnalytics = pathname.startsWith('/analytics')

  return (
    <ContactModalProvider>
      <div className="bg-canvas text-ink transition-colors duration-500 dark:bg-canvas-dark dark:text-ink-dark">
        {isAnalytics ? null : <Navbar />}
        <VisitorTracker />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ContactModalProvider>
  )
}

function App() {
  useEffect(() => {
    document.title = `${site.name} — ${site.role}`
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <AppShell />
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
