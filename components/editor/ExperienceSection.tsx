// ExperienceSection.tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
}

export function ExperienceSection() {
  const { current, replaceSection } = useResumeEditorStore()

  const experience = current?.experience ?? []

  // Add new experience
  const addExperience = () => {
    replaceSection("experience", [...experience, emptyExperience])
  }

  // Update one field of one experience item
  const updateExperience = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )

    replaceSection("experience", updated)
  }

  // Delete experience
  const deleteExperience = (index: number) => {
    replaceSection(
      "experience",
      experience.filter((_: any, i: number) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Experience</h2>
        <Button variant="outline" onClick={addExperience}>
          + Add
        </Button>
      </div>

      {experience.map((exp, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 space-y-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(index, "company", e.target.value)
              }
            />
            <Input
              placeholder="Role"
              value={exp.role}
              onChange={(e) =>
                updateExperience(index, "role", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Start date"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(index, "startDate", e.target.value)
              }
            />
            <Input
              placeholder="End date"
              value={exp.endDate}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
            />
          </div>

          <Textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
          />

          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteExperience(index)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
