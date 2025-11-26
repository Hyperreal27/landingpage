'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};


export function Hero() {
  const handleCTAClick = () => {
    scrollToElement('contact');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F57F11]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F57F11]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F57F11]/10 border border-[#F57F11]/20 text-[#F57F11] text-sm font-medium">
              IA revolution is coming...
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-white">Convirtiendo tareas repetitivas en </span>
              <span className="text-[#F57F11]">resultados automáticos</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Más que un chatbot. Automatiza conversaciones, entiende a tus clientes y crece tu negocio
            </p>
          </motion.div>

          {/* Key benefits */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap justify-center gap-8 text-sm sm:text-base">
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-[#F57F11] rounded-full mr-3" />
                ROI Escalable
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-[#F57F11] rounded-full mr-3" />
                Automatización 24/7
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-[#F57F11] rounded-full mr-3" />
                Implementación en 14 días
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={handleCTAClick}
              className="btn-primary text-lg px-12 py-5 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Empieza hoy
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToElement('process')}
              className="btn-secondary text-lg px-12 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Nuestro Proceso
            </motion.button>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-400 text-xs">Scroll para descubrir más</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#F57F11]/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-[#F57F11] rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 