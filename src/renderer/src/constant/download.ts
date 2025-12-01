export enum DOWNLOAD_STATUS {
  Pending = 'pending',
  Downloading = 'downloading',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

export const DOWNLOAD_STATUS_LABELS: { [key in DOWNLOAD_STATUS]: string } = {
  [DOWNLOAD_STATUS.Pending]: '正在初始化',
  [DOWNLOAD_STATUS.Downloading]: '下载中',
  [DOWNLOAD_STATUS.Paused]: '已暂停',
  [DOWNLOAD_STATUS.Completed]: '已完成',
  [DOWNLOAD_STATUS.Failed]: '下载失败',
  [DOWNLOAD_STATUS.Cancelled]: '已取消',
}

export const DOWNLOAD_STATUS_COLORS: { [key in DOWNLOAD_STATUS]: string } = {
  [DOWNLOAD_STATUS.Pending]: '#9334EB',
  [DOWNLOAD_STATUS.Downloading]: '#409EFF',
  [DOWNLOAD_STATUS.Paused]: '#FFC107',
  [DOWNLOAD_STATUS.Completed]: '#67C23A',
  [DOWNLOAD_STATUS.Failed]: '#EF4644',
  [DOWNLOAD_STATUS.Cancelled]: '#94A4B9',
}
