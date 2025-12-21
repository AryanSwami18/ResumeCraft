import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'


export async function POST() {
    try {
        const userId = await getUserId()


        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }
        const resume = await prisma.resume.create({
            data: {
                clerkUserId: userId,
            },
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Resume created successfully',
                data: {
                    id: resume.id,
                    title: resume.title,
                },
            },
            { status: 201 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Cannot Create Resume' },
            { status: 403 }
        )

    }
}