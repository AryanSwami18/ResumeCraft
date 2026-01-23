"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"
import React from "react"

export function SkillsSection() {
  const { current, replaceSection } = useResumeEditorStore()
  const skills: string[] = current?.skills ?? []

  const [skillInput, setSkillInput] = React.useState("")

  const addSkill = () => {
    const value = skillInput.trim()
    if (!value) return
    replaceSection("skills", [...skills, value])
    setSkillInput("")
  }

  const removeSkill = (index: number) => {
    replaceSection("skills", skills.filter((_, i) => i !== index))
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>

      <div className="flex gap-2">
        <Input
          placeholder="Add a skill (e.g. React)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addSkill()
          }}
        />
        <Button onClick={addSkill}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          >
            <span>{skill}</span>
            <button
              className="text-muted-foreground hover:text-destructive"
              onClick={() => removeSkill(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
