import React from "react"
import { Rocket, ShieldCheck, Laptop, Copy } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function CardContainer() {
    return (
        <section className="w-full flex flex-col items-center gap-8 md:gap-12 px-4">
            {/* Heading */}
            <div className="max-w-[720px] text-center">
                <h2
                    className="
                                font-semibold
                                text-3xl leading-tight  
                                md:text-4xl md:leading-snug
                                lg:text-5xl
                                 tracking-tight
                            "
                >
                    Everything you need to land your{" "}
                    <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                        next job
                    </span>
                    .
                </h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                    Modern templates, ATS-friendly formatting, and powerful tools to
                    highlight your skills, projects, and experience — without the stress.
                </p>
            </div>

            {/* Cards */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2  gap-5 lg:gap-7">
                {/* Card 1 */}
                <Card className="flex flex-col h-full border border-border/70 bg-card/80 shadow-sm hover:shadow-lg hover:border-accent/60 transition-all duration-200">
                    <CardHeader className="items-center text-center space-y-3 pt-6">
                        <Rocket className="text-primary mx-auto" size={36} />
                        <CardTitle className="text-lg md:text-xl font-semibold">
                            Build your resume in minutes
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Skip formatting struggles — just add your details and let the
                            builder structure everything into a polished, professional resume.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Card 2 */}
                <Card className="flex flex-col h-full border border-border/70 bg-card/80 shadow-sm hover:shadow-lg hover:border-accent/60 transition-all duration-200">
                    <CardHeader className="items-center text-center space-y-3 pt-6">
                        <ShieldCheck className="text-primary mx-auto" size={36} />
                        <CardTitle className="text-lg md:text-xl font-semibold">
                            Pass every ATS screening
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Templates are optimized for Applicant Tracking Systems and
                            recruiter readability — so your resume never gets rejected for
                            layout or formatting issues.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Card 3 */}
                <Card className="flex flex-col h-full border border-border/70 bg-card/80 shadow-sm hover:shadow-lg hover:border-accent/60 transition-all duration-200">
                    <CardHeader className="items-center text-center space-y-3 pt-6">
                        <Laptop className="text-primary mx-auto" size={36} />
                        <CardTitle className="text-lg md:text-xl font-semibold">
                            Showcase projects & achievements
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Highlight internships, academic projects, hackathons, and work
                            experience with tailored sections that make your strengths
                            impossible to miss.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Card 4 */}
                <Card className="flex flex-col h-full border border-border/70 bg-card/80 shadow-sm hover:shadow-lg hover:border-accent/60 transition-all duration-200">
                    <CardHeader className="items-center text-center space-y-3 pt-6">
                        <Copy className="text-primary mx-auto" size={36} />
                        <CardTitle className="text-lg md:text-xl font-semibold">
                            Create and manage multiple resumes
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Different roles need different resumes — keep them all in one
                            place and switch templates anytime without re-entering your data.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </section>
    )
}

export default CardContainer
