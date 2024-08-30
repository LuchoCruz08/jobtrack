"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronDown, ChevronUp, Plus, Trash2, Eye } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import DashboardHeader from "@/components/Dashboard/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ApplicationStats } from "@/components/Dashboard/stats"

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [sortOrder, setSortOrder] = useState("asc")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const supabase = createClient()
  const router = useRouter()

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      router.push("/login")
    }
  }

  const getJobs = async () => {
    const { data, error } = await supabase.from("job_applications").select("*")
    if (error) {
      console.error("Error:", error.message)
    } else {
      setJobs(data)
    }
  }

  const handleDelete = async (jobId, jobTitle) => {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la postulación para "${jobTitle}"?`)
    if (confirmDelete) {
      const { error } = await supabase
        .from("job_applications")
        .delete()
        .eq("id", jobId)

      if (error) {
        console.error("Error deleting job application:", error.message)
      } else {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId))
      }
    }
  }

  useEffect(() => {
    getUser()
    getJobs()
  })

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
  }

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.application_date) - new Date(b.application_date)
    } else {
      return new Date(b.application_date) - new Date(a.application_date)
    }
  })

  const filteredJobs = sortedJobs.filter((job) => {
    if (statusFilter === "Todos") {
      return true
    }
    return job.status === statusFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Rechazado":
        return "bg-red-500"
      case "Aceptado":
        return "bg-green-500"
      case "En Proceso":
        return "bg-yellow-500"
      case "Postulado":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto mt-8 max-w-[960px] px-4 flex-grow text-white">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-3xl font-bold">Mis Postulaciones</CardTitle>
            <Link href="/dashboard/crear">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Agregar postulación
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <label>Filtrar por estado:</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Rechazado">Rechazado</SelectItem>
                    <SelectItem value="Aceptado">Aceptado</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Postulado">Postulado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="secondary"
                onClick={toggleSortOrder}
                className="border-gray-600 hover:bg-gray-700"
              >
                Ordenar por fecha {sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Título</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Fecha de aplicación</TableHead>
                    <TableHead className="text-white">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id} className="hover:bg-gray-700">
                      <TableCell className="font-medium">{job.job_title}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(job.status)}`}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(job.application_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/dashboard/ver/${job.id}`}>
                            <Button variant="secondary" size="sm" className="border-gray-600 hover:bg-gray-700">
                              <Eye className="mr-2 h-4 w-4" /> Ver Más
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(job.id, job.job_title)}
                            className="border-gray-600 hover:bg-gray-700 text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"></div>
      <div>
        <ApplicationStats/>
      </div>
      <div className="mt-8 h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"></div>
      <Footer />
    </section>
  )
}

export default Dashboard