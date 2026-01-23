"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useResumeEditorStore } from "@/store/editResumeStore"

const defaultPersonal = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  summary: "",
}

export function PersonalSection() {
  const { current, replaceSection } = useResumeEditorStore()

  const personal = current?.personal ?? defaultPersonal

  const updatePersonal = (key: string, value: string) => {
    replaceSection("personal", {
      ...personal,
      [key]: value,
    })
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="text-lg font-semibold">Personal</h2>

      <Input
        placeholder="Full name"
        value={personal.fullName}
        onChange={(e) => updatePersonal("fullName", e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Email"
          value={personal.email}
          onChange={(e) => updatePersonal("email", e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={personal.phone}
          onChange={(e) => updatePersonal("phone", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Location"
          value={personal.location}
          onChange={(e) => updatePersonal("location", e.target.value)}
        />
        <Input
          placeholder="Website"
          value={personal.website}
          onChange={(e) => updatePersonal("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="LinkedIn"
          value={personal.linkedin}
          onChange={(e) => updatePersonal("linkedin", e.target.value)}
        />
        <Input
          placeholder="GitHub"
          value={personal.github}
          onChange={(e) => updatePersonal("github", e.target.value)}
        />
      </div>

      <Textarea
        placeholder="Summary"
        value={personal.summary}
        onChange={(e) => updatePersonal("summary", e.target.value)}
      />
    </div>
  )
}
