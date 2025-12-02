import { DOWNLOAD_STATUS } from '@renderer/constant/download'
import { cn } from '@renderer/lib/cn'
import { DownloadItem } from '@renderer/store/download-slice'
import { FolderOpen, PauseIcon, PlayIcon, RefreshCcw, X } from 'lucide-react'

const CreateActionButton = ({
  icon,
  className,
  disabled = false,
  onClick,
}: {
  icon: React.ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
}) => (
  <div
    className={cn(
      'cursor-pointer rounded-sm p-1 hover:opacity-85',
      {
        'cursor-not-allowed opacity-60 hover:opacity-60': disabled,
      },
      className
    )}
    onClick={() => {
      if (!disabled) {
        onClick()
      }
    }}
  >
    {icon}
  </div>
)

interface ActionButtonProps {
  downloadItem: DownloadItem
}

const StartButton = ({ downloadItem }: ActionButtonProps) => (
  <CreateActionButton
    className="bg-blue-100 text-blue-600"
    icon={<PlayIcon />}
    onClick={() => {
      console.log(`start====`, downloadItem.id)
    }}
  />
)

const PauseButton = ({
  downloadItem,
  disabled,
}: ActionButtonProps & { disabled?: boolean }) => (
  <CreateActionButton
    className="bg-yellow-100 text-yellow-600"
    icon={<PauseIcon />}
    disabled={disabled}
    onClick={() => {
      console.log(`pause====`, downloadItem.id)
    }}
  />
)

const CancelButton = ({ downloadItem }: ActionButtonProps) => (
  <CreateActionButton
    className="bg-red-100 text-red-600"
    icon={<X />}
    onClick={() => {
      console.log(`cancel====`, downloadItem.id)
    }}
  />
)

const RetryButton = ({ downloadItem }: ActionButtonProps) => (
  <CreateActionButton
    className="bg-orange-100 text-orange-600"
    icon={<RefreshCcw />}
    onClick={() => {
      console.log(`retry====`, downloadItem.id)
    }}
  />
)

const OpenFolderButton = ({ downloadItem }: ActionButtonProps) => (
  <CreateActionButton
    className="bg-green-100 text-green-600"
    icon={<FolderOpen />}
    onClick={() => {
      console.log(`open folder====`, downloadItem.id)
    }}
  />
)

export default function DownloadActions({
  downloadItem,
}: {
  downloadItem: DownloadItem
}) {
  let firstAction: React.ReactNode
  switch (downloadItem.status) {
    case DOWNLOAD_STATUS.Pending:
      firstAction = <PauseButton disabled downloadItem={downloadItem} />
      break
    case DOWNLOAD_STATUS.Downloading:
      firstAction = <PauseButton downloadItem={downloadItem} />
      break
    case DOWNLOAD_STATUS.Completed:
      firstAction = <OpenFolderButton downloadItem={downloadItem} />
      break
    case DOWNLOAD_STATUS.Paused:
      firstAction = <StartButton downloadItem={downloadItem} />
      break
    default:
      firstAction = <RetryButton downloadItem={downloadItem} />
      break
  }

  return (
    <div className="flex items-center gap-2">
      {firstAction}
      <CancelButton downloadItem={downloadItem} />
    </div>
  )
}
