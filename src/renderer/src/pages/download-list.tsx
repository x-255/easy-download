import DownloadRow from '@renderer/components/download-row'
import { useAppStore } from '@renderer/store'

export default function DownloadList() {
  const downloadList = useAppStore((state) => state.downloadList)

  return (
    <>
      <div className="space-y-2 px-50">
        {downloadList.map((item) => (
          <DownloadRow key={item.id} {...item} />
        ))}
      </div>
    </>
  )
}
