"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LoaderCircle, NotebookPen, Briefcase, Calendar, Link as LinkIcon, Mail, Edit2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const View = () => {
  const supabase = createClient()
  const router = useRouter()
  const { id } = useParams()
  const [jobApplication, setJobApplication] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [updatedValue, setUpdatedValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchJobApplication = async () => {
      if (!id) return

      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error:", error.message)
      } else {
        setJobApplication(data)
      }
    }

    fetchJobApplication()
  })

  const handleEdit = (field) => {
    setEditingField(field)
    setUpdatedValue(jobApplication[field])
  }

  const handleUpdate = async (field) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ [field]: updatedValue })
        .eq("id", id)

      if (error) throw error

      const { data, error: fetchError } = await supabase
        .from("job_applications")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) {
        console.error("Error:", fetchError.message)
      } else {
        setJobApplication(data)
        setEditingField(null)
        setUpdatedValue("")
      }
    } catch (error) {
      console.error("Error updating:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!jobApplication)
    return (
      <div role="status" className="flex items-center justify-center min-h-screen bg-gray-900">
        <LoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    )

  const getStatusColor = (status) => {
    switch (status) {
      case "Rechazado": return "bg-red-500"
      case "Aceptado": return "bg-green-500"
      case "En Proceso": return "bg-yellow-500"
      case "Postulado": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <NotebookPen className="h-12 w-12 text-blue-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">JobTrack</CardTitle>
            <CardDescription className="text-gray-400">Detalles de la Postulación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Título", field: "job_title", icon: Briefcase },
                { label: "Descripción", field: "job_description", icon: NotebookPen },
                { label: "Empresa", field: "company", icon: Briefcase },
                { label: "Plataforma", field: "platform", icon: LinkIcon },
                { label: "Enlace", field: "link", icon: LinkIcon },
                { label: "Correo electrónico", field: "email", icon: Mail },
                { label: "Status", field: "status", icon: NotebookPen },
                { label: "Extra", field: "note", icon: NotebookPen },
                { label: "Fecha de postulación", field: "application_date", icon: Calendar },
              ].map(({ label, field, icon: Icon }) => (
                <div key={field} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-400">{label}</h3>
                    {editingField === field ? (
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          type={field === "application_date" ? "date" : "text"}
                          value={updatedValue}
                          onChange={(e) => setUpdatedValue(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button
                          onClick={() => handleUpdate(field)}
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center justify-between">
                        {field === "status" ? (
                          <Badge className={`${getStatusColor(jobApplication[field])}`}>
                            {jobApplication[field]}
                          </Badge>
                        ) : field === "link" ? (
                          <a href={jobApplication[field]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {jobApplication[field]}
                          </a>
                        ) : (
                          <span className="text-white">{jobApplication[field]}</span>
                        )}
                        <Button
                          onClick={() => handleEdit(field)}
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default View