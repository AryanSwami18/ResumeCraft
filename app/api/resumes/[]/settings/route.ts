import { NextRequest, NextResponse } from "next/server"
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

    

    return NextResponse.json(
      { success: true, message: "Resume deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to update publish resume" },
      { status: 500 }
    )
  }
}