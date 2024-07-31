"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle, NotebookPen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const View = () => {
  const supabase = createClient();
  const router = useRouter();
  const { id } = useParams();
  const [jobApplication, setJobApplication] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobApplication = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error:", error.message);
      } else {
        setJobApplication(data);
      }
    };

    fetchJobApplication();
  }, [id, supabase]);

  const handleEdit = (field) => {
    setEditingField(field);
    setUpdatedValue(jobApplication[field]);
  };

  const handleUpdate = async (field) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ [field]: updatedValue })
        .eq("id", id);

      if (error) throw error;

      const { data, error: fetchError } = await supabase
        .from("job_applications")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error:", fetchError.message);
      } else {
        setJobApplication(data);
        setEditingField(null);
        setUpdatedValue("");
      }
    } catch (error) {
      console.error("Error updating:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!jobApplication)
    return (
      <div
        role="status"
        className="flex items-center justify-center min-h-screen"
      >
        <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-blue-500"
        >
          <NotebookPen />
          JobTrack
        </a>
        <div className="max-w-4xl w-full px-4 py-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
          <dl className="-my-3 divide-y divide-gray-700 text-sm">
            {[
              { label: "Título", field: "job_title" },
              { label: "Descripción", field: "job_description" },
              { label: "Empresa", field: "company" },
              { label: "Plataforma", field: "platform" },
              { label: "Enlace", field: "link" },
              { label: "Correo electrónico", field: "email" },
              { label: "Status", field: "status" },
              { label: "Extra", field: "note" },
              { label: "Fecha de postulación", field: "application_date" },
            ].map(({ label, field }) => (
              <div
                key={field}
                className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
              >
                <dt className="font-medium text-white">{label}</dt>
                <dd className="text-gray-200 sm:col-span-2">
                  {editingField === field ? (
                    <div className="flex items-center gap-2">
                      <input
                        type={field === "application_date" ? "date" : "text"}
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                        className="border rounded-lg p-2 bg-gray-900 text-white"
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                        onClick={() => handleUpdate(field)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoaderCircle className="w-5 h-5 animate-spin" />
                        ) : (
                          "Guardar"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {jobApplication[field]}
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                        onClick={() => handleEdit(field)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 text-center">
            <Link href="/dashboard">
              <Button>Volver al Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default View;
