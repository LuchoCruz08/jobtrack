import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="grid h-screen place-content-center px-4 bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-700">404</h1>
        <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-400">Ha ocurrido un error.</p>
        <a href="/">
          <Button>Volver al inicio</Button>
        </a>
      </div>
    </div>
  );
}
