import { NotebookPen } from "lucide-react";
import LogoutButton from "./logout";

export default function DashboardHeader() {
  return (
    <header className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a href="/" className="block text-blue-500">
              <span className="sr-only">JobTrack</span>
              <NotebookPen />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"></div>
    </header>
  );
}
