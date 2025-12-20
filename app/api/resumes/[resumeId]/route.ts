import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await context.params  

    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const deleted = await prisma.resume.deleteMany({
      where: {
        id: resumeId,
        clerkUserId: userId,
      },
    })

    if (deleted.count === 0) {
      return NextResponse.json(
        { success: false, message: "Resume not found or unauthorized" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Resume deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to delete resume" },
      { status: 500 }
    )
  }
}
