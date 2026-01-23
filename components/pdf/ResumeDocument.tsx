"use client"

import React from "react"
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer"

// ---------- Helpers ----------
const ensureHttp = (url?: string) => {
  if (!url) return ""
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `https://${url}`
}

const formatRange = (start?: string, end?: string) => {
  const s = (start || "").trim()
  const e = (end || "").trim()
  if (!s && !e) return ""
  if (s && !e) return `${s} - Present`
  if (!s && e) return e
  return `${s} - ${e}`
}

const splitBullets = (text?: string) => {
  if (!text) return []
  return text.split("\n").map((x) => x.trim()).filter(Boolean)
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#222",
  },

  // --- HEADER (FIXED SPACING) ---
  header: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#AAA",
    paddingBottom: 15,
  },
  
  // New container specifically to hold Name & Role and push contacts down
  headerNameSection: {
    marginBottom: 12, // <--- THIS IS THE FIX: 12pt gap between Name and Contacts
  },
  
  name: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#000",
    lineHeight: 1, // Tighter line height prevents invisible box overlap
  },
  headerRole: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  // Contact Row
  contactRow: {
    marginTop: 4,        // Extra buffer from the top
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    fontSize: 9,
    color: "#444",
    textDecoration: "none",
  },
  separator: {
    marginHorizontal: 8, // Clean space around the pipe "|"
    color: "#CCC",
    fontSize: 9,
  },

  // --- SECTIONS ---
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 2,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#000",
  },

  // Items
  itemBlock: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111",
  },
  itemDate: {
    fontSize: 9,
    color: "#666",
    textAlign: "right",
    minWidth: 70,
  },
  itemSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Oblique",
    color: "#333",
  },
  itemLocation: {
    fontSize: 9,
    color: "#666",
  },

  // Bullets
  bulletContainer: {
    marginLeft: 2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletPoint: {
    width: 12,
    fontSize: 14,
    lineHeight: 1,
    color: "#666",
    marginTop: -2,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: "#333",
    lineHeight: 1.4,
  },

  // Skills
  skillBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    fontSize: 9,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    color: "#374151",
  },
})

type ResumeData = {
  personal?: any
  experience?: any[]
  education?: any[]
  skills?: string[]
  projects?: any[]
  certifications?: any[]
  hobbies?: string[]
}

const toArray = (x: any) => (Array.isArray(x) ? x : [])

export default function ResumeDocument({ resume }: { resume: ResumeData }) {
  const personal = resume.personal ?? {}
  const skills = toArray(resume.skills)
  const experience = toArray(resume.experience)
  const projects = toArray(resume.projects)
  const education = toArray(resume.education)
  const certifications = toArray(resume.certifications)
  const hobbies = toArray(resume.hobbies)

  // Build contact array
  const contacts = []
  if (personal.email) contacts.push({ text: personal.email, href: `mailto:${personal.email}` })
  if (personal.phone) contacts.push({ text: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, "")}` })
  if (personal.location) contacts.push({ text: personal.location, href: null })
  if (personal.linkedin) contacts.push({ text: "LinkedIn", href: ensureHttp(personal.linkedin) })
  if (personal.github) contacts.push({ text: "GitHub", href: ensureHttp(personal.github) })
  if (personal.website) contacts.push({ text: "Portfolio", href: ensureHttp(personal.website) })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          
          {/* 1. Name Section with explicit Margin Bottom */}
          <View style={styles.headerNameSection}>
              <Text style={styles.name}>{personal.fullName || "YOUR NAME"}</Text>
              {personal.title && (
                 <Text style={styles.headerRole}>{personal.title}</Text>
              )}
          </View>
          
          {/* 2. Contact Row with explicit Margin Top */}
          <View style={styles.contactRow}>
            {contacts.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Text style={styles.separator}>|</Text>}
                {c.href ? (
                  <Link style={styles.contactItem} src={c.href}>{c.text}</Link>
                ) : (
                  <Text style={styles.contactItem}>{c.text}</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* --- SUMMARY --- */}
        {personal.summary && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.bulletText}>{personal.summary}</Text>
          </View>
        )}

        {/* --- SKILLS --- */}
        {skills.length > 0 && (
          <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <View style={styles.skillBlock}>
              {skills.map((skill: string, i: number) => (
                <Text key={i} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* --- EXPERIENCE --- */}
        {experience.length > 0 && (
          <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Experience</Text>
            </View>

            {experience.map((exp: any, i: number) => {
              const bullets = splitBullets(exp.description)
              const date = formatRange(exp.startDate, exp.endDate)

              return (
                <View key={i} style={styles.itemBlock}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.role || "Role"}</Text>
                    <Text style={styles.itemDate}>{date}</Text>
                  </View>
                  
                  <View style={styles.itemSubHeader}>
                    <Text style={styles.itemSubtitle}>{exp.company || "Company"}</Text>
                    {exp.location && <Text style={styles.itemLocation}>{exp.location}</Text>}
                  </View>

                  <View style={styles.bulletContainer}>
                    {bullets.map((b, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )
            })}
          </View>
        )}

        {/* --- PROJECTS --- */}
        {projects.length > 0 && (
          <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Projects</Text>
            </View>

            {projects.map((p: any, i: number) => {
              const bullets = splitBullets(p.description)
              return (
                <View key={i} style={styles.itemBlock}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>
                        {p.name}
                        {p.link && <Link src={ensureHttp(p.link)} style={{ fontSize: 9, color: "#2563EB", textDecoration: "none" }}> ↗</Link>}
                    </Text>
                  </View>

                  {p.techStack && (
                     <Text style={[styles.itemSubtitle, { marginBottom: 4, fontSize: 9, color: "#555" }]}>
                        {p.techStack}
                     </Text>
                  )}

                  <View style={styles.bulletContainer}>
                    {bullets.map((b, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )
            })}
          </View>
        )}

        {/* --- EDUCATION --- */}
        {education.length > 0 && (
          <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Education</Text>
            </View>

            {education.map((edu: any, i: number) => (
              <View key={i} style={styles.itemBlock}>
                 <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.institution}</Text>
                    <Text style={styles.itemDate}>{formatRange(edu.startDate, edu.endDate)}</Text>
                  </View>
                  <View style={styles.itemSubHeader}>
                    <Text style={styles.itemSubtitle}>
                      {edu.degree} {edu.grade ? `| GPA: ${edu.grade}` : ""}
                    </Text>
                  </View>
              </View>
            ))}
          </View>
        )}

        {/* --- CERTIFICATIONS --- */}
        {certifications.length > 0 && (
           <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Certifications</Text>
            </View>
            {certifications.map((cert: any, i: number) => (
               <View key={i} style={[styles.itemHeader, { marginBottom: 6 }]}>
                  <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#333" }}>{cert.name}</Text>
                  <Text style={styles.itemDate}>{cert.date}</Text>
               </View>
            ))}
           </View>
        )}

        {/* --- HOBBIES --- */}
        {hobbies.length > 0 && (
           <View style={styles.section}>
             <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Interests</Text>
            </View>
            <View style={styles.skillBlock}>
              {hobbies.map((hobby: string, i: number) => (
                <Text key={i} style={styles.skillTag}>{hobby}</Text>
              ))}
            </View>
           </View>
        )}

      </Page>
    </Document>
  )
}