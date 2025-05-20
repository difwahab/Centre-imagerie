import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/constants";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";

const appointmentFormSchema = z.object({
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
  service: z.string({
    required_error: "Veuillez sélectionner un service",
  }),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export default function AppointmentForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const createAppointment = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Rendez-vous demandé",
        description: "Nous vous contacterons bientôt pour confirmer votre rendez-vous.",
        variant: "default",
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: AppointmentFormValues) {
    createAppointment.mutate(data);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-xl overflow-hidden p-8 text-center">
        <div className="mb-6 text-5xl text-green-500">✓</div>
        <h3 className="text-2xl font-bold text-primary mb-4">Demande envoyée avec succès</h3>
        <p className="text-lg mb-6">
          Merci pour votre demande de rendez-vous. Notre équipe vous contactera sous peu pour confirmer les détails.
        </p>
        <Button onClick={() => setSubmitted(false)}>Retour</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-semibold">Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre nom complet"
                      className="bg-white text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="votre.email@exemple.com"
                      className="bg-white text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <FormLabel className="text-gray-800 font-semibold">Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre numéro de téléphone"
                      className="bg-white text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
