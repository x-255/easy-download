import { ClearOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'
import logo from '@renderer/assets/logo.png'
import DownloadModal, {
  DownloadModalRef,
} from '@renderer/components/download-modal'
import ThemeIcon from '@renderer/components/theme-icon'
import { Button, ConfigProvider, theme as antdTheme } from 'antd'
import { useEffect, useRef } from 'react'
import { THEME } from './constant/theme'
import DownloadList from './pages/download-list'
import { useAppStore } from './store'
import SettingModal, { SettingModalRef } from './components/setting-modal'

export default function App() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.api.changeTheme(theme)
  }, [theme])

  const downloadModalRef = useRef<DownloadModalRef>(null)
  const settingModalRef = useRef<SettingModalRef>(null)

  const handleAddTask = () => {
    downloadModalRef.current?.open()
  }

  const handleSetting = () => {
    settingModalRef.current?.open()
  }

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === THEME.Dark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <div
        className={`h-screen w-full overflow-y-auto bg-gray-50 pb-15 dark:bg-gray-900`}
      >
        {/* header */}
        <div className="flex items-center justify-between bg-white px-50 py-3 dark:bg-slate-800">
          <div className="flex items-center gap-2 dark:text-white">
            <img src={logo} alt="logo" className="size-10 w-auto" />
            Easy Download
          </div>
          <div className="cursor-pointer dark:text-white" onClick={toggleTheme}>
            <ThemeIcon />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-50 py-6">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddTask}
          >
            添加任务
          </Button>
          <Button icon={<ClearOutlined />}>清空列表</Button>
        </div>

        <DownloadList />
        <DownloadModal ref={downloadModalRef} />
        <SettingModal ref={settingModalRef} />

        <Button
          className="fixed! right-15 bottom-10 z-1"
          size="large"
          shape="circle"
          icon={<SettingOutlined />}
          onClick={handleSetting}
        ></Button>
      </div>
    </ConfigProvider>
  )
}
