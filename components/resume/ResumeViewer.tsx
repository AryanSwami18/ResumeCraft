"use client"

export default function ResumeViewer({ resume }: { resume: any }) {
  const personal = resume.personal ?? {}

  return (
    <div className="mx-auto max-w-3xl bg-white text-black p-8 shadow rounded-lg">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide">
          {personal.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {personal.title || ""}
        </p>

        <div className="text-sm text-gray-700 mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(resume.skills) && resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
            Skills
          </h2>
          <p className="text-sm text-gray-800">
            {resume.skills.join(", ")}
          </p>
        </section>
      )}

      {/* Experience */}
      {Array.isArray(resume.experience) && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
            Experience
          </h2>

          <div className="space-y-4">
            {resume.experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm">{exp.role}</p>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                </div>

                {exp.description && (
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-800 space-y-1">
                    {exp.description
                      .split("\n")
                      .map((line: string) => line.trim())
                      .filter(Boolean)
                      .map((line: string, i: number) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {Array.isArray(resume.projects) && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
            Projects
          </h2>

          <div className="space-y-4">
            {resume.projects.map((p: any, idx: number) => (
              <div key={idx}>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{p.name}</p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 underline"
                    >
                      View
                    </a>
                  )}
                </div>

                {p.techStack && (
                  <p className="text-xs text-gray-600 mt-1">{p.techStack}</p>
                )}

                {p.description && (
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-800 space-y-1">
                    {p.description
                      .split("\n")
                      .map((line: string) => line.trim())
                      .filter(Boolean)
                      .map((line: string, i: number) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
