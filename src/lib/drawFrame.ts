export function drawCoverFrame(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  align: 'center' | 'bottom' = 'bottom',
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const { naturalWidth, naturalHeight } = image

  if (!width || !height || !naturalWidth || !naturalHeight) return

  const scale = Math.max(width / naturalWidth, height / naturalHeight)
  const drawWidth = naturalWidth * scale
  const drawHeight = naturalHeight * scale
  const x = (width - drawWidth) / 2
  const y = align === 'bottom' ? height - drawHeight : (height - drawHeight) / 2

  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(image, x, y, drawWidth, drawHeight)
}

export function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()

  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)

  const ctx = canvas.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}
