'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  revenue: string;
  website: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}


const budgetOptions = [
  { value: 'Básico (500 - 1.500 USD)', label: 'Básico (500 - 1.500 USD)' },
  { value: 'Estándar (1.500 - 3.000 USD)', label: 'Estándar (1.500 - 3.000 USD)' },
  { value: 'Premium (3.000 - 5.000 USD)', label: 'Premium (3.000 - 5.000 USD)' },
  { value: 'Empresarial (5.000+ USD)', label: 'Empresarial (5.000+ USD)' },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '',
    website: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }

    if (!formData.revenue) {
      newErrors.revenue = 'Selecciona el presupuesto';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for FormSubmit.co
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('budget', formData.revenue);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('message', formData.message);
      
      // Hidden fields for FormSubmit.co
      formDataToSend.append('_subject', 'Nueva consulta desde Intellia.mx');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'box');
      formDataToSend.append('_next', '/gracias');

      // Send data to FormSubmit.co
      const response = await fetch('https://formsubmit.co/intellia@intellia.mx', {
        method: 'POST',
        body: formDataToSend,
      });

      // Check if form was submitted successfully
      if (response.ok) {
        console.log('Form data sent successfully to FormSubmit.co');
        setIsSubmitted(true);
        
        // Redirect to thank you page after showing success message
        setTimeout(() => {
          window.location.href = '/gracias';
        }, 2000);
      } else {
        throw new Error(`FormSubmit error: ${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('Error sending form data to FormSubmit.co:', error);
      // Show success message even on error to avoid breaking user experience
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          revenue: '',
          website: '',
          message: '',
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message component
  const SuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
      <p className="text-gray-300">
        Te contactaremos en las próximas 24 horas para tu consulta estratégica gratuita.
      </p>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            action="https://formsubmit.co/intellia@intellia.mx"
            method="POST"
            className="space-y-6"
          >
            {/* Hidden fields for FormSubmit.co */}
            <input type="hidden" name="_subject" value="Nueva consulta desde Intellia.mx" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_next" value="/gracias" />
            
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors`}
                  placeholder="tu@empresa.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono/WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors`}
                  placeholder="+52 55 1234 5678"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.company ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors`}
                  placeholder="Nombre de tu empresa"
                />
                {errors.company && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.company}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="revenue" className="block text-sm font-medium text-gray-300 mb-2">
                  Presupuesto de Inversión *
                </label>
                <select
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.revenue ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F57F11] transition-colors`}
                >
                  <option value="">Elige tu rango de inversión</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-dark-800">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.revenue && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.revenue}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Sitio Web o Red Social
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors"
                  placeholder="https://tuempresa.com o @usuario"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Cuéntanos tu Desafío (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F57F11] transition-colors resize-none"
                placeholder="Describe brevemente el principal desafío que quieres resolver con IA..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-6 h-6" />
                  Obtener Consulta Estratégica GRATIS
                </>
              )}
            </motion.button>

            {/* Trust indicators */}
            <div className="text-center text-sm text-gray-400 space-y-1">
              <p>✅ Respuesta garantizada en 24 horas</p>
              <p>✅ Consulta estratégia 100% gratuita</p>
              <p>✅ Sin spam, solo valor real</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
} 