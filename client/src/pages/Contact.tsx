import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  contactInfo, 
  workingHours, 
  socialLinks,
  heroImages 
} from "@/lib/constants";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  LoaderCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Instagram, 
  Linkedin,
  CheckCircle
} from "lucide-react";
import MapReactLeaflet from "@/components/MapReactLeaflet";

const contactFormSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom doit comporter au moins 3 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide",
  }),
  phone: z
    .string()
    .min(8, {
      message: "Le numéro de téléphone doit comporter au moins 8 caractères",
    })
    .regex(/^[0-9+\s()-]{8,15}$/, {
      message: "Veuillez entrer un numéro de téléphone valide",
    }),
  message: z.string().min(10, {
    message: "Le message doit comporter au moins 10 caractères",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const submitContact = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      form.reset();
      setSubmitted(true);
      // Scroll to the success message
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('contact-form')?.offsetTop || 0,
          behavior: 'smooth'
        });
      }, 100);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    submitContact.mutate(data);
  }

  return (
    <div className="pt-28">
      {/* Hero Section with Map Background */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages.contact}
            alt="Centre d'imagerie médicale contact background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Contactez-nous</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Nous sommes à votre disposition pour répondre à vos questions et vous accompagner dans vos besoins d'imagerie médicale.
            </p>
          </div>
        </div>
      </section>

      {/* Map and Contact Info Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Notre adresse</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.location.lat},${contactInfo.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Obtenir l'itinéraire →
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Téléphone & Email</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Nous envoyer un email →
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Horaires d'ouverture</h3>
                    <div className="text-gray-600">
                      {workingHours.map((period, index) => (
                        <p key={index} className="text-gray-600">
                          {period.days}: <span className="font-medium">{period.hours}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-primary text-sm font-medium">
                  Horaires sur rendez-vous
                </div>
              </div>
            </div>
            
            {/* Map Component */}
            <MapReactLeaflet />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  Contactez-nous
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-6">
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Vous avez des questions sur nos services d'imagerie médicale? Besoin d'informations complémentaires? Notre équipe est à votre disposition pour vous répondre dans les plus brefs délais.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Délai de réponse rapide</h4>
                      <p className="text-gray-600">Nous nous engageons à vous répondre sous 24h ouvrables</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Service de qualité</h4>
                      <p className="text-gray-600">Notre équipe est formée pour répondre précisément à vos questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Confidentialité assurée</h4>
                      <p className="text-gray-600">Vos informations personnelles sont traitées avec la plus stricte confidentialité</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    <a 
                      href={socialLinks[0].url} 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href={socialLinks[1].url} 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href={socialLinks[2].url} 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                {submitted ? (
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden p-10 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Message envoyé avec succès</h3>
                    <p className="text-gray-600 mb-8">
                      Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">Nom complet</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Votre nom complet"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="votre.email@exemple.com"
                                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 font-semibold">Téléphone</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Votre numéro de téléphone"
                                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Votre message..."
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 min-h-[150px]"
                                    rows={5}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                            disabled={submitContact.isPending}
                            size="lg"
                          >
                            {submitContact.isPending ? (
                              <>
                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                Envoi en cours...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5" />
                                Envoyer le message
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
