import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { id } from "zod/v4/locales"
import { generateUniqueSlug } from "@/lib/utils/createSlug"


export async function POST(
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

    const resume = await prisma.resume.findFirst({
        where:{
            id: resumeId,
            clerkUserId: userId
        },
        select:{
            published:true,
            slug:true,
            id:true,
            title:true
        }
    });

    if(!resume){
        return NextResponse.json(
            { success: false, message: "Resume not found or unauthorized" },
            { status: 404 }
          )
    }

    if(resume.published){
        await prisma.resume.update({
            where:{
                id: resume.id,
                clerkUserId: userId
            },
            data:{
                published:false,
            },
        })

        return NextResponse.json(
            { success: true, message: "Resume unpublished" },
            { status: 200 }
            )
    }
    let slug = resume.slug;
    if(!slug){
        slug = await generateUniqueSlug(resume.title);
    }
    await prisma.resume.update({
        where:{
            id: resume.id,
            clerkUserId: userId
        },
        data:{
            published:true,
            slug:slug
        },
    })

    return NextResponse.json(
      { success: true, message: "Resume published", slug: slug },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to change Publish Status" },
      { status: 500 }
    )
  }
}