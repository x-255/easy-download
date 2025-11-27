import logo from '@renderer/assets/logo.png'

export default function App() {
  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center bg-white px-7 py-5 dark:bg-green-800">
        <img src={logo} alt="logo" className="h-12 w-auto" />
        Easy Download
      </div>
      <div className="p-8"></div>
    </div>
  )
}
