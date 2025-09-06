import { Card, CardTitle, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "Portofolio Ghibli",
    description: "Situs portofolio bertema Ghibli dengan animasi dan nuansa alam yang lembut.",
  },
  {
    title: "Dashboard Admin",
    description: "Dashboard UI lengkap dengan autentikasi, charts, dan table responsif.",
  },
  {
    title: "Aplikasi Edukasi AR",
    description: "Aplikasi edukasi anak dengan teknologi Augmented Reality markerless.",
  },
]

export default function Projects() {
  return (
    <section className="py-20 px-6 bg-white text-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10">Proyek Unggulan</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
              <p className="text-sm text-gray-700">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
