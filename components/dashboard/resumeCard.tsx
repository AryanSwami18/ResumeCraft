import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/card';
import { MoreHorizontalIcon, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ResumeCardProp = {
  title: string;
  id: string;
  createdAt: string;
}

function resumeCard(resume: ResumeCardProp) {

  return (
    <Card className='hover:border-accent/80  transition-border duration-200'>
      <CardHeader>
        {resume.title}
      </CardHeader>

      <CardContent>
        <div className='flex flex-row gap-2 items-center justify-between'>
          <p className='text-sm text-gray-500'>Created At: {new Date(resume.createdAt).toLocaleDateString()}</p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Delete
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </CardContent>
    </Card>
  )
}

export default resumeCard