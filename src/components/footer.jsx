import { Github, Linkedin, Mail, NotebookPen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-blue-500">
          <NotebookPen className="h-6" />
          <span>JobTrack</span>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400">
          &copy; 2024. Creado por{" "}
          <span className="text-blue-500">Luciano Cruz.</span>
        </p>
        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="mailto:lucianovcruz2004@gmail.com?subject=Desde JobTrack"
              target="_blank"
              className="text-blue-500"
            >
              <Mail />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/lucianovcruz/"
              rel="noreferrer"
              target="_blank"
              className="text-blue-500"
            >
              <Linkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/LuchoCruz08"
              rel="noreferrer"
              target="_blank"
              className="text-blue-500"
            >
              <Github />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
