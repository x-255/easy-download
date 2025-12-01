export const getFilename = (url: string) => {
  return url
}

export const formatBytes = (bytes: string | number) => {
  const newBytes = Number(bytes)

  if (!newBytes) {
    return '0 B'
  }

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(newBytes) / Math.log(1024))

  return parseFloat((newBytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
}
