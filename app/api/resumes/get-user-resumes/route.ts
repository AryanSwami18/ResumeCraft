import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'



export async function GET() {
    try {
        const userId = await getUserId()

        if (!userId) {
            return NextResponse.json(
                {
                    message: "UnAuthorized Access",
                    success: false,
                    data: null
                }, {
                status: 401
            }
            )
        }

        const userResumes = await prisma.resume.findMany(
            {
                where: {
                    clerkUserId: userId
                }
            }
        )

        if (userResumes.length == 0) {
            return NextResponse.json({
                message: "You dont Have Any Resumes Create One",
                resumes: userResumes,
                success: true
            },
                {
                    status: 201
                })
        }

        return NextResponse.json(
            {
            message: "Fetched All the resumes",
            resumes: userResumes,
            success: true
            },
            {
                status: 201
            }
        )



    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}