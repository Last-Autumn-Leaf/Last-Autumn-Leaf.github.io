'use client'


import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {Vortex} from "@/components/ui/vortex";
import {useTheme} from "next-themes";

export default function IndexPage() {
  const { setTheme, theme } = useTheme()
  return (
    <div className="h-full">
      <h1 className="text-2xl md:text-6xl font-bold text-center dark:text-white text-black">
        Work in progress
      </h1>
    </div>
  )
}
