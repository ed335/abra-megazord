"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Youtube, Heart, ArrowRight } from "lucide-react"

function FooterSection() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative">
      <div className="bg-[#1B4332] py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Pronto para começar seu tratamento?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Agende sua consulta agora e dê o primeiro passo para uma vida com mais qualidade
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cadastro">
              <Button className="bg-white text-[#1B4332] hover:bg-gray-100 px-8 py-6 text-base font-medium rounded-full">
                Agendar consulta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-medium rounded-full">
                Fale conosco
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#3FA174] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ABRACANM</span>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm">
                Associação Brasileira de Cannabis Medicinal. Conectando pacientes a tratamentos seguros e legais.
              </p>
              <form className="relative">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="pr-12 backdrop-blur-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[#3FA174] text-white transition-transform hover:scale-105 hover:bg-[#359966]"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Inscrever</span>
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Receba novidades e conteúdos exclusivos
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">Links Rápidos</h3>
              <nav className="space-y-3 text-sm">
                <Link href="/" className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#3FA174]">
                  Início
                </Link>
                <Link href="/sobre" className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#3FA174]">
                  Sobre Nós
                </Link>
                <Link href="/planos" className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#3FA174]">
                  Planos
                </Link>
                <Link href="/educacao" className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#3FA174]">
                  Educação
                </Link>
                <Link href="/contato" className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#3FA174]">
                  Contato
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">Contato</h3>
              <address className="space-y-3 text-sm not-italic text-gray-600 dark:text-gray-400">
                <p>São Paulo, SP - Brasil</p>
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Tel: (11) 99999-9999</p>
                <p>contato@abracanm.com.br</p>
              </address>
            </div>

            <div className="relative">
              <h3 className="mb-4 text-base font-semibold">Siga-nos</h3>
              <div className="mb-6 flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-gray-800 hover:bg-[#3FA174] hover:text-white hover:border-[#3FA174]">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga no Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-gray-800 hover:bg-[#3FA174] hover:text-white hover:border-[#3FA174]">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga no Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-gray-800 hover:bg-[#3FA174] hover:text-white hover:border-[#3FA174]">
                        <Youtube className="h-4 w-4" />
                        <span className="sr-only">YouTube</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Inscreva-se no YouTube</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-gray-800 hover:bg-[#3FA174] hover:text-white hover:border-[#3FA174]">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Conecte no LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-gray-400" />
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="h-4 w-4 text-gray-400" />
                <Label htmlFor="dark-mode" className="sr-only">
                  Alternar modo escuro
                </Label>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 text-center md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 ABRACANM - Associação Brasileira de Cannabis Medicinal. Todos os direitos reservados.
            </p>
            <nav className="flex gap-4 text-sm">
              <Link href="/privacidade" className="text-gray-500 transition-colors hover:text-[#3FA174]">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-500 transition-colors hover:text-[#3FA174]">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-500 transition-colors hover:text-[#3FA174]">
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterSection }
