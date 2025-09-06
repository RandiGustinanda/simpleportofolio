'use client'

import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"

import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"

import { Home as HomeIcon, Folder, Mail, User } from "lucide-react"

export default function Home() {
  return (
    <SidebarProvider>
      {/* Sidebar Kiri */}
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#home">
                <HomeIcon />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#projects">
                <Folder />
                <span>Projects</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#about">
                <User />
                <span>About</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#contact">
                <Mail />
                <span>Contact</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* Konten Halaman */}
      <SidebarInset>
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Footer />
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
