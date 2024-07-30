"use client";

import DashboardHeader from "@/components/Dashboard/header";
import Footer from "@/components/footer";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const supabase = createClient();
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      router.push("/login");
    }
  };

  const getJobs = async () => {
    const { data, error } = await supabase.from("job_applications").select("*");
    if (error) {
      console.error("Error:", error.message);
    } else {
      setJobs(data);
    }
  };

  const handleDelete = async (jobId, jobTitle) => {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la postulación para "${jobTitle}"?`);
    if (confirmDelete) {
      const { error } = await supabase
        .from("job_applications")
        .delete()
        .eq("id", jobId);

      if (error) {
        console.error("Error deleting job application:", error.message);
      } else {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      }
    }
  };

  useEffect(() => {
    getJobs();
  });

  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto mt-8 max-w-[960px] px-4">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-700 mb-4">
          <h1 className="text-3xl font-semibold">Mis Postulaciones</h1>
          <Link
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/dashboard/crear"
          >
            Agregar postulación
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Título</th>
                <th className="py-2 px-4 border-b border-gray-700">Status</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Fecha de aplicación
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-700">
                    {job.job_title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {job.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {job.application_date}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <div className="flex gap-4">
                      <Link
                        className="text-green-600 underline hover:no-underline"
                        href={`/dashboard/ver/${job.id}`}
                      >
                        Ver/Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id, job.job_title)}
                        className="text-red-500 underline hover:no-underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs?.length < 1 && (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">
                    Todavía no agregaste ninguna postulación.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="border-t-2 border-blue-700" />
      <Footer />
    </section>
  );
};

export default Dashboard;
