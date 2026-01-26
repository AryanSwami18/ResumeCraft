"use client"

import React from "react"
import { Card, CardHeader, CardContent } from "../ui/card"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios from "axios"
import { useResumeStore } from "@/store/resume"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type ResumeCardProp = {
  title: string
  id: string
  createdAt: string
}

export default function ResumeCard(resume: ResumeCardProp) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const { removeResume } = useResumeStore()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/resumes/${resume.id}`)
      removeResume(resume.id)
      setShowDeleteDialog(false)
      toast.success("Resume deleted successfully")
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  const navigateToEdit = () => {
    router.push(`edit-resume/${resume.id}`)
  }

  return (
    <>
      <Card
        className="hover:border-accent/80 transition-border duration-200 min-h-[200px] cursor-pointer"
        onClick={navigateToEdit}
      >
        <CardHeader className="min-h-[100px]">{resume.title}</CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Created At: {new Date(resume.createdAt).toLocaleDateString()}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-muted"
                  // 👇 THIS IS THE FIX
                  onClick={(e) => {
                    e.stopPropagation() // Prevents the click from reaching the Card
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={(e) => e.stopPropagation()}
                    onSelect={(e)=>{
                      navigateToEdit()
                    }}
                  >
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onSelect={(e) => {
                      e.preventDefault() // Prevents menu from closing immediately
                      setShowDeleteDialog(true)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this resume?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation() 
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}