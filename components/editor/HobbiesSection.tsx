"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"
import React from "react"

export function HobbiesSection() {
  const { current, replaceSection } = useResumeEditorStore()
  const hobbies: string[] = current?.hobbies ?? []

  const [hobbyInput, setHobbyInput] = React.useState("")

  const addHobby = () => {
    const value = hobbyInput.trim()
    if (!value) return
    replaceSection("hobbies", [...hobbies, value])
    setHobbyInput("")
  }

  const removeHobby = (index: number) => {
    replaceSection("hobbies", hobbies.filter((_, i) => i !== index))
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="text-lg font-semibold">Hobbies</h2>

      <div className="flex gap-2">
        <Input
          placeholder="Add a hobby (e.g. Football)"
          value={hobbyInput}
          onChange={(e) => setHobbyInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addHobby()
          }}
        />
        <Button onClick={addHobby}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          >
            <span>{hobby}</span>
            <button
              className="text-muted-foreground hover:text-destructive"
              onClick={() => removeHobby(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
