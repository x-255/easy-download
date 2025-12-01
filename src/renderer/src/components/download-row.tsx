import { cn } from '@renderer/lib/cn'
import { DownloadItem } from '@renderer/store/download-slice'
import DownloadActions from './download-actions'
import {
  DOWNLOAD_STATUS,
  DOWNLOAD_STATUS_COLORS,
  DOWNLOAD_STATUS_LABELS,
} from '@renderer/constant/download'
import { formatBytes } from '@renderer/lib/utils'

const ProgressLabel = ({
  filesize,
  downloadedSize,
  status,
  message = '',
}: DownloadItem) => {
  switch (status) {
    case DOWNLOAD_STATUS.Pending:
    case DOWNLOAD_STATUS.Failed:
      return `${DOWNLOAD_STATUS_LABELS[status]}: ${message}`
    case DOWNLOAD_STATUS.Downloading:
    case DOWNLOAD_STATUS.Paused:
      return `${DOWNLOAD_STATUS_LABELS[status]}: ${formatBytes(downloadedSize)} / ${formatBytes(filesize)}`
    default:
      return DOWNLOAD_STATUS_LABELS[status]
  }
}

export default function DownloadRow(props: DownloadItem) {
  const { url, filename, filesize, status, downloadedSize } = props
  const progress = filesize > 0 ? (downloadedSize / filesize) * 100 : 0
  return (
    <div className="border-gray-400 bg-white p-6 text-gray-400 shadow-sm dark:bg-slate-800 dark:text-zinc-300">
      {/* fileinfo & actions */}
      <div className="flex items-center justify-between">
        <div className="max-w-2/3 truncate">
          <div className="text-xl font-bold">{filename}</div>
          <div>{url}</div>
        </div>
        <DownloadActions downloadItem={props} />
      </div>

      {/* process bar */}
      <div className="relative my-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn('absolute top-0 left-0 h-2 rounded-full', {
            'w-full': status === 'completed',
          })}
          style={{
            width: `${progress}%`,
            backgroundColor: DOWNLOAD_STATUS_COLORS[status],
          }}
        ></div>
      </div>

      {/* size & status */}
      <div className="flex justify-between">
        <ProgressLabel {...props} />
      </div>
    </div>
  )
}
