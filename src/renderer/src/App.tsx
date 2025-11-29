import logo from '@renderer/assets/logo.png'
import ThemeIcon from '@renderer/components/theme-icon'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useEffect } from 'react'
import { useAppStore } from './store'
import { Theme } from './store/theme-slice'
import DownloadList from './pages/download-list'

export default function App() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === Theme.Dark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <div
        className={`h-screen w-full overflow-y-auto bg-gray-50 dark:bg-gray-900`}
      >
        {/* header */}
        <div className="flex items-center justify-between bg-white px-7 py-3 dark:bg-slate-800">
          <div className="flex items-center gap-2 dark:text-white">
            <img src={logo} alt="logo" className="size-10 w-auto" />
            Easy Download
          </div>
          <div className="cursor-pointer dark:text-white" onClick={toggleTheme}>
            <ThemeIcon />
          </div>
        </div>

        <DownloadList />
      </div>
    </ConfigProvider>
  )
}
