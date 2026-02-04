import slugify from "slugify"
import  prisma  from "@/lib/prisma"

export async function generateUniqueSlug(title: string) {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })

  let slug = baseSlug
  let count = 1

  while (true) {
    const existing = await prisma.resume.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!existing) return slug

    count++
    slug = `${baseSlug}-${count}`
  }
}
