import { NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";

export default function Login() {
  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-blue-500"
        >
          <NotebookPen />
          JobTrack
        </a>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Iniciar Sesión
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ejemplo@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="******"
                  required
                />
              </div>

              <Button
                formAction={login}
                className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Iniciar Sesión
              </Button>
              <p className="text-sm font-light text-gray-400">
                No tienes una cuenta?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Crear Cuenta
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
