// 通用工具函数

/** 下载一张图片（dataURL 或 blob），失败时返回 false */
export async function downloadImage(
  dataUrl: string,
  filename: string,
): Promise<boolean> {
  try {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    return true
  } catch {
    return false
  }
}

/** 从 blob 触发下载 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
