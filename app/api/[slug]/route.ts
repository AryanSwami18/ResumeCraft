import { NextRequest, NextResponse } from "next/server"
import  prisma  from "@/lib/prisma"

export async function GET(
  req: NextRequest,
   context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params
    const resume = await prisma.resume.findUnique({
      where: { slug: params.slug },
      select: {
      title: true,
      slug: true,
      published: true,
      personal: true,
      experience: true,
      projects: true,
      skills: true,
      education: true,
      certifications: true,
      hobbies: true,
      createdAt: true,
      updatedAt: true,
    },
    })

    if (!resume || !resume.published) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ resume })
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
