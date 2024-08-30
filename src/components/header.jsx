import { NotebookPen, LogIn, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-500 transition-colors hover:text-blue-400">
              <NotebookPen className="h-8 w-8" />
              <span className="hidden text-xl font-bold sm:inline">JobTrack</span>
              <span className="sr-only">JobTrack</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"></div>
    </header>
  )
}