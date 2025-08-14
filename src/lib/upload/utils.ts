export const uploadImageString = (
  id: string,
  { size, crop }: { size?: string; crop?: boolean } = {}
) => {
  const parts: string[] = []

  if (size) parts.push(`preview/${size}`)
  if (crop) parts.push(`scale_crop/300x300`, `rasterize`)

  const modifiers = parts.length ? `-/${parts.join("/-/")}/` : ""

  return `https://ucarecdn.com/${id}/` + modifiers
}

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 10 // 10MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"]