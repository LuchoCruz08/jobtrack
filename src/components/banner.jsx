import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Bienvenido a{" "}
            <span className="sm:block bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              JobTrack
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg sm:text-xl/relaxed text-gray-300">
            Una plataforma donde podrás llevar un control de tus postulaciones
            laborales de manera fácil y eficiente.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/login">
              <Button size="lg" className="group bg-blue-500 hover:bg-blue-600">
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="group bg-purple-600 hover:bg-purple-700 text-white"
              >
                Crear cuenta
                <Briefcase className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"></div>
    </section>
  );
}
