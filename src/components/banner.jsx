import Link from "next/link";
import { Button } from "./ui/button";

export default function Banner() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Bienvenido a<span className="sm:block"> JobTrack. </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Una plataforma donde podrás llevar un control de tus postulaciones
            laborales de manera fácil y eficiente.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Crear cuenta</Button>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-blue-700" />
    </section>
  );
}
