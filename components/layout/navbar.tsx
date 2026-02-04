"use client"
import React from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "../ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet"
import { Menu } from "lucide-react"
import { useAuth, UserButton } from "@clerk/nextjs"
import Link from "next/link"

function Navbar() {
    const { isSignedIn } = useAuth()

    return (
        <div className="  bg-background  ">
            <div className="mx-auto flex  items-center justify-between px-4 py-3 md:py-4 border-b">
                {/* Logo */}
                <Link href="/" className="text-xl font-semibold">
                    <span className="text-accent">Resume</span>
                    <span className="text-primary">Craft</span>
                </Link>

                {!isSignedIn ? (
                    <>
                        {/* Desktop (signed out) */}
                        <div className="hidden items-center gap-4 md:flex font-bold">
                            <div className="border-r pr-3">
                                <ThemeToggle />
                            </div>

                            <Link href="/auth/sign-in">
                                <Button variant="ghost">Sign In</Button>
                            </Link>

                            <Link href="/auth/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </div>

                        {/* Mobile (signed out) */}
                        <div className="flex items-center gap-2 md:hidden">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>

                                <SheetContent side="right" className="flex flex-col gap-4">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <span className="text-accent">Resume</span>
                                            <span className="text-primary">Craft</span>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <Link href="/auth/sign-in">
                                        <Button variant="ghost" className="justify-start w-full cursor-pointer">
                                            Sign In
                                        </Button>
                                    </Link>

                                    <Link href="/auth/signup">
                                        <Button className="justify-start w-full cursor-pointer">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8",
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
