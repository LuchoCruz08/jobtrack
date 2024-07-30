"use client";

import { createClient } from "@/utils/supabase/client";
import { LoaderCircle, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Create() {
  const supabase = createClient();
  const router = useRouter();
  const [jobApplication, setJobApplication] = useState({
    job_title: "",
    job_description: "",
    platform: "",
    status: "",
    application_date: "",
    user_id: "", // Add user_id to the state
  });

  const [loading, setLoading] = useState(true);

  // Fetch the current user and set the user_id
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error.message);
        router.push("/login");
      } else {
        setJobApplication((prev) => ({ ...prev, user_id: data.user.id }));
        setLoading(false);
      }
    };

    fetchUser();
  });

  const onChange = (e) => {
    setJobApplication({ ...jobApplication, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .insert([jobApplication]);
      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return(
    <div role="status">
        <LoaderCircle className="w-8 h-8 text-gray-600 animate-spin"/>
    </div>
  );

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-blue-500"
        >
          <NotebookPen />
          JobTrack
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Agrega una nueva postulación
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Título del trabajo:
                </label>
                <input
                  type="text"
                  name="job_title"
                  id="job_title"
                  value={jobApplication.job_title}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Fullstack Developer Jr."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Descripción del trabajo:
                </label>
                <input
                  type="text"
                  name="job_description"
                  id="job_description"
                  value={jobApplication.job_description}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Requisitos: +1 año de experiencia, conocimientos en React.js y Spring Boot, etc."
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Plataforma desde donde aplicaste:
                </label>
                <input
                  type="text"
                  name="platform"
                  id="platform"
                  value={jobApplication.platform}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="LinkedIn, Getonbrd, etc."
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Status de la postulación:
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={jobApplication.status}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Postulado, En Proceso,Aceptado, Rechazado, etc."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Fecha de postulación:
                </label>
                <input
                  type="date"
                  name="application_date"
                  id="application_date"
                  value={jobApplication.application_date}
                  onChange={onChange}
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
                type="button"
                onClick={handleCreate}
              >
                Crear Postulación
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
