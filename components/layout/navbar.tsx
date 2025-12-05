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

function Navbar() {
    return (
        <div className="w-full border-b border-border bg-background text-">
            {/* Inner container */}
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <div className="text-xl font-semibold">
                    <span className="text-accent">Resume</span>
                    <span className="text-primary">Craft</span>
                </div>

                {/* Desktop nav */}
                <div className="hidden items-center gap-4 md:flex font-bold">
                    <div className="border-r pr-3">
                        <ThemeToggle />
                    </div>

                    <Button variant="ghost">Sign In</Button>
                    <Button>Log In</Button>
                </div>

                {/* Mobile nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-1">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex flex-col gap-4">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <span className="text-accent">Resume</span>
                                    <span className="text-primary">Craft</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="mt-4 flex flex-col gap-3 p-2 ">
                                <Button variant="ghost" className="justify-start font-bold ">
                                    Sign In
                                </Button>
                                <Button className="justify-start font-bold">Log In</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default Navbar
