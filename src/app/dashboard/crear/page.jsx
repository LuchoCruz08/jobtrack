"use client"

import { createClient } from "@/utils/supabase/client"
import { LoaderCircle, NotebookPen, Briefcase, Calendar, Link as LinkIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Create() {
  const supabase = createClient()
  const router = useRouter()
  const [jobApplication, setJobApplication] = useState({
    job_title: "",
    job_description: "",
    platform: "",
    status: "",
    application_date: "",
    user_id: "",
    link: "",
    company: "",
    note: "",
    email: "",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.log(error.message)
        router.push("/login")
      } else {
        setJobApplication((prev) => ({ ...prev, user_id: data.user.id }))
        setLoading(false)
      }
    }

    fetchUser()
  })

  const onChange = (e) => {
    setJobApplication({ ...jobApplication, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .insert([jobApplication])
      if (error) throw error
      router.push("/dashboard")
    } catch (error) {
      console.log(error.message)
    }
  }

  if (loading)
    return (
      <div role="status" className="flex items-center justify-center min-h-screen bg-gray-900">
        <LoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    )

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col justify-center py-12">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <NotebookPen className="h-12 w-12 text-blue-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">JobTrack</CardTitle>
            <CardDescription className="text-gray-400">Agrega una nueva postulación</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="job_title" className="text-white">
                  Título del trabajo <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={jobApplication.job_title}
                  onChange={onChange}
                  placeholder="Fullstack Developer Jr."
                  required
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_description" className="text-white">Descripción del trabajo</Label>
                <Textarea
                  id="job_description"
                  name="job_description"
                  value={jobApplication.job_description}
                  onChange={onChange}
                  placeholder="Requisitos, Conocimientos, etc."
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">Empresa</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={jobApplication.company}
                    onChange={onChange}
                    placeholder="Nombre de la empresa"
                    className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform" className="text-white">Plataforma</Label>
                  <Input
                    type="text"
                    id="platform"
                    name="platform"
                    value={jobApplication.platform}
                    onChange={onChange}
                    placeholder="LinkedIn, Getonbrd, etc."
                    className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link" className="text-white">Enlace a la oferta laboral</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="url"
                    id="link"
                    name="link"
                    value={jobApplication.link}
                    onChange={onChange}
                    placeholder="https://www.jobs.com/puesto"
                    className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email de contacto</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={jobApplication.email}
                  onChange={onChange}
                  placeholder="recruiter@company.com"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-white">
                  Status de la postulación <span className="text-red-500">*</span>
                </Label>
                <Select name="status" value={jobApplication.status} onValueChange={(value) => onChange({ target: { name: 'status', value } })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecciona un status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="Postulado">Postulado</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Aceptado">Aceptado</SelectItem>
                    <SelectItem value="Rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-white">Información extra</Label>
                <Textarea
                  id="note"
                  name="note"
                  value={jobApplication.note}
                  onChange={onChange}
                  placeholder="Feedback recibido, opinión personal, etc."
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application_date" className="text-white">
                  Fecha de postulación <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="date"
                    id="application_date"
                    name="application_date"
                    value={jobApplication.application_date}
                    onChange={onChange}
                    required
                    className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white pl-10"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                type="button"
                onClick={handleCreate}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Crear Postulación
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}