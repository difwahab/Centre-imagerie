import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  Settings, 
  Clock,
  ChevronRight,
  BadgeCheck
} from "lucide-react";

import { 
  services, 
  testimonials, 
  features,
  equipmentBenefits,
  teamBenefits,
  heroImages,
  equipmentImages
} from "@/lib/constants";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative">
        {/* Hero background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages.home}
            alt="Centre d'imagerie médicale moderne background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 pt-24 pb-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 text-white">
              <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-white text-sm font-semibold mb-6">
                Centre d'Excellence en Imagerie Médicale
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
                Excellence en imagerie médicale à Oran
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-lg">
                Des diagnostics précis et fiables réalisés par notre équipe de spécialistes avec des équipements de dernière génération.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rendez-vous">
                  <Button
                    className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
                    size="lg"
                  >
                    <Calendar className="mr-2 h-5 w-5" /> Prendre rendez-vous
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-white/20 backdrop-blur-sm"
                    size="lg"
                  >
                    Nos services <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-5/12 lg:w-5/12">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1744227702090-12819209183f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Scanner moderne au Centre d'Imagerie Benameur"
                  className="rounded-xl shadow-xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Nos Services
            </span>
            <h2 className="text-4xl font-bold text-primary font-heading mb-4">
              Services d'imagerie médicale
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous proposons une gamme complète de services d'imagerie médicale avec des équipements de dernière génération pour des diagnostics précis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>

          <div className="mt-16 overflow-hidden bg-white rounded-2xl shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  Technologie de pointe
                </span>
                <h3 className="text-3xl font-bold text-primary font-heading mb-6">
                  Des équipements médicaux avancés
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Notre centre est équipé des technologies d'imagerie médicale les plus récentes pour garantir des diagnostics précis et fiables, avec une attention particulière portée au confort du patient.
                </p>
                <ul className="space-y-4">
                  {equipmentBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <BadgeCheck className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/services">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-1">
                {equipmentImages.slice(0, 4).map((item, index) => (
                  <div key={index} className="relative overflow-hidden group h-48 lg:h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-3 text-white">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src={teamBenefits[0].image}
                  alt="Équipe médicale professionnelle du Centre Benameur"
                  className="rounded-2xl shadow-xl w-full object-cover z-10 relative"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-2xl z-0"></div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                Notre équipe
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-6">
                Une équipe médicale hautement qualifiée
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Le Centre D'Imagerie Benameur réunit des radiologues et des professionnels de santé hautement qualifiés pour vous offrir des services d'imagerie médicale exceptionnels.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Notre équipe s'engage à fournir des diagnostics précis dans un environnement accueillant, en plaçant le bien-être du patient au cœur de nos préoccupations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      {benefit.icon === "user-md" ? 
                        <Users className="h-6 w-6 text-primary"/> : 
                        <BadgeCheck className="h-6 w-6 text-primary"/>
                      }
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Témoignages
            </span>
            <h2 className="text-4xl font-bold text-primary font-heading mb-4">
              Ce que disent nos patients
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez l'expérience de nos patients avec nos services d'imagerie médicale et notre équipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                text={testimonial.text}
                author={testimonial.author}
                role={testimonial.role}
                initials={testimonial.initials}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/temoignages">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Voir plus de témoignages <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Pourquoi nous choisir
            </span>
            <h2 className="text-4xl font-bold text-primary font-heading mb-4">
              Notre engagement envers vous
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à fournir des services d'imagerie médicale de haute qualité avec une attention particulière à chaque patient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-none overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto -mt-10 rounded-full bg-white flex items-center justify-center shadow-lg text-primary mb-4">
                    {feature.icon === "users" ? <Users className="h-6 w-6" /> : 
                     feature.icon === "cog" ? <Settings className="h-6 w-6" /> : 
                     <Clock className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center bg-gradient-to-r from-primary to-secondary p-10 rounded-2xl shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Prêt à prendre rendez-vous?</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Notre équipe de professionnels est à votre disposition pour répondre à tous vos besoins en matière d'imagerie médicale.
            </p>
            <Link href="/rendez-vous">
              <Button
                className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
                size="lg"
              >
                <Calendar className="mr-2 h-5 w-5" /> Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
