"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { PDFViewer, pdf } from "@react-pdf/renderer"
import ResumeDocument from "@/components/pdf/ResumeDocument"
import { Button } from "@/components/ui/button"


function ViewResume() {
    const params = useParams<{ slug: string }>()
    const [resume, setResume] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const slug = params.slug

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`/api/${slug}`)
                console.log(res.data)
                setResume(res.data.resume)
            } catch (error) {
                toast.error("Failed to fetch resume")
                setResume(null)
            }
            finally {
                setLoading(false)
            }
        }
        fetchResume()
    }, [slug])

    const handleCopyLink = async () => {
        try {
            const shareUrl = `${window.location.origin}/resume/${slug}`
            await navigator.clipboard.writeText(shareUrl)
            toast.success("Link copied ")
        } catch (err) {
            toast.error("Failed to copy link ")
        }
    }

    const handleDownload = async () => {
        if (!resume) return

        try {
            toast.loading("Generating PDF...")

            const blob = await pdf(<ResumeDocument resume={resume} />).toBlob()
            const url = URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url

            const filename = resume?.title
                ? resume.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
                : "resume"

            link.download = `${filename}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            URL.revokeObjectURL(url)
            toast.success("Downloaded successfully!")
        } catch (err) {
            toast.error("Download failed!")
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>
    }
    if (!resume) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground font-semibold">
                    Resume not found / not published
                </p>
            </div>
        )
    }




    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            {/* Top Bar */}
            <div className="h-14 px-4 flex items-center justify-between border-b bg-background/80 backdrop-blur">
                <p className="font-semibold">Resume Preview</p>

                <div className="flex gap-2">
                    <Button className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                    <Button className="px-3 py-1.5 rounded border border-border text-sm"
                        onClick={handleCopyLink}
                    >
                        Copy Link
                    </Button>
                </div>
            </div>

            {/* PDF Container */}
            <div className="flex justify-center p-4 md:p-10">
                <div className="w-full max-w-[900px] h-[calc(100vh-120px)] bg-white rounded-md overflow-hidden shadow-2xl border border-border">
                    <PDFViewer width="100%" height="100%" showToolbar={false}>
                        <ResumeDocument resume={resume} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}

export default ViewResume 