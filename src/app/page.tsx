import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Benefits } from '@/components/sections/Benefits';
import { Contact } from '@/components/sections/Contact';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 custom-scrollbar relative">
      {/* Premium UI Components */}
      <ScrollIndicator />
      <CustomCursor />
      <FloatingParticles count={15} />
      
      {/* AI Chatbot Assistant - Temporarily Hidden */}
      {/* <ChatBot /> */}
      
      {/* Header with navigation */}
      <Header />
      
      {/* Hero section */}
      <Hero />
      
      {/* Process section with video */}
      <Process />
      
      {/* Benefits section */}
      <Benefits />
      
      {/* Contact form section */}
      <Contact />
      
      {/* Footer */}
      <footer className="bg-dark-950 border-t border-gold-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <img src="/aiflux.png" alt="AiFlux Logo" className="w-8 h-8" />
              <h3 className="text-2xl font-display font-bold text-gold-gradient">
                Ai<span className="text-white">Flux</span>
              </h3>
            </div>
            <p className="text-gray-400">
              Automatización IA que transforma negocios · Resultados garantizados en 30 días
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>© 2024 AiFlux. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
