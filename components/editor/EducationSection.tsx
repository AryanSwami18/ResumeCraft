"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"

const emptyEducation = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
  grade: "",
}

export function EducationSection() {
  const { current, replaceSection } = useResumeEditorStore()
  const education = current?.education ?? []

  const add = () => replaceSection("education", [...education, emptyEducation])

  const update = (index: number, key: string, value: string) => {
    const updated = education.map((item: any, i: number) =>
      i === index ? { ...item, [key]: value } : item
    )
    replaceSection("education", updated)
  }

  const remove = (index: number) => {
    replaceSection("education", education.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Education</h2>
        <Button variant="outline" onClick={add}>+ Add</Button>
      </div>

      {education.map((edu: any, index: number) => (
        <div key={index} className="rounded-lg border p-4 space-y-3">
          <Input
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => update(index, "institution", e.target.value)}
          />
          <Input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => update(index, "degree", e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Start date"
              value={edu.startDate}
              onChange={(e) => update(index, "startDate", e.target.value)}
            />
            <Input
              placeholder="End date"
              value={edu.endDate}
              onChange={(e) => update(index, "endDate", e.target.value)}
            />
          </div>

          <Input
            placeholder="Grade / CGPA"
            value={edu.grade}
            onChange={(e) => update(index, "grade", e.target.value)}
          />

          <div className="flex justify-end">
            <Button variant="destructive" size="sm" onClick={() => remove(index)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
