"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeEditorStore } from "@/store/editResumeStore"

const emptyCert = {
  name: "",
  issuer: "",
  date: "",
  link: "",
}

export function CertificationsSection() {
  const { current, replaceSection } = useResumeEditorStore()
  const certifications = current?.certifications ?? []

  const add = () => replaceSection("certifications", [...certifications, emptyCert])

  const update = (index: number, key: string, value: string) => {
    const updated = certifications.map((item: any, i: number) =>
      i === index ? { ...item, [key]: value } : item
    )
    replaceSection("certifications", updated)
  }

  const remove = (index: number) => {
    replaceSection(
      "certifications",
      certifications.filter((_: any, i: number) => i !== index)
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <Button variant="outline" onClick={add}>+ Add</Button>
      </div>

      {certifications.map((c: any, index: number) => (
        <div key={index} className="rounded-lg border p-4 space-y-3">
          <Input
            placeholder="Certification name"
            value={c.name}
            onChange={(e) => update(index, "name", e.target.value)}
          />
          <Input
            placeholder="Issuer"
            value={c.issuer}
            onChange={(e) => update(index, "issuer", e.target.value)}
          />
          <Input
            placeholder="Date"
            value={c.date}
            onChange={(e) => update(index, "date", e.target.value)}
          />
          <Input
            placeholder="Certificate link"
            value={c.link}
            onChange={(e) => update(index, "link", e.target.value)}
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
