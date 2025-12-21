import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import {ResumeUpdateSchema} from "@/lib/validators/resume"
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



export async function PATCH(req: NextRequest,
  context: { params: Promise<{ resumeId: string }> }) {
  try {
    const { resumeId } = await context.params

    const userId = await getUserId()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reqBody = await req.json()

    const body = ResumeUpdateSchema.parse(reqBody)

    //Guard Empty Patch

    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          error: "No fields to update",
          success: false
        },
        { status: 400 }
      )
    }


    const updated = await prisma.resume.updateMany(
      {
        where: {
          id: resumeId,
          clerkUserId: userId
        },
        data: body
      }
    )


    if (updated.count === 0) {
      return NextResponse.json(
        { error: "Resume Not Found or Unauthorized" },
        {
          status: 400
        }
      )
    }


    return NextResponse.json({ success: true })


  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    )
  }
}
