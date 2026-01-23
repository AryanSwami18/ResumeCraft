"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"

const emptyProject = {
  name: "",
  techStack: "",
  link: "",
  description: "",
}

export function ProjectsSection() {
  const { current, replaceSection } = useResumeEditorStore()
  const projects = current?.projects ?? []

  const add = () => replaceSection("projects", [...projects, emptyProject])

  const update = (index: number, key: string, value: string) => {
    const updated = projects.map((item: any, i: number) =>
      i === index ? { ...item, [key]: value } : item
    )
    replaceSection("projects", updated)
  }

  const remove = (index: number) => {
    replaceSection("projects", projects.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button variant="outline" onClick={add}>+ Add</Button>
      </div>

      {projects.map((p: any, index: number) => (
        <div key={index} className="rounded-lg border p-4 space-y-3">
          <Input
            placeholder="Project name"
            value={p.name}
            onChange={(e) => update(index, "name", e.target.value)}
          />
          <Input
            placeholder="Tech stack (comma separated)"
            value={p.techStack}
            onChange={(e) => update(index, "techStack", e.target.value)}
          />
          <Input
            placeholder="Project link"
            value={p.link}
            onChange={(e) => update(index, "link", e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={p.description}
            onChange={(e) => update(index, "description", e.target.value)}
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
