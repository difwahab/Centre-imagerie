import { useEffect, useRef, useState } from "react";
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

const texts = {
  nameLabel: "Nom complet",
  emailLabel: "Email",
  phoneLabel: "Téléphone",
  serviceLabel: "Service souhaité",
  messageLabel: "Message",
  submitButton: "Envoyer",
  sendingButton: "Envoi en cours...",
  successTitle: "Demande envoyée avec succès",
  successDesc:
    "Merci pour votre demande de rendez-vous. Notre équipe vous contactera sous peu pour confirmer les détails.",
  errorTitle: "Erreur",
  errorDescDefault: "Une erreur s'est produite. Veuillez réessayer.",
  nameError: "Le nom doit comporter au moins 3 caractères",
  emailError: "Veuillez entrer une adresse e-mail valide",
  phoneError: "Veuillez entrer un numéro de téléphone valide (8 à 15 caractères)",
  serviceError: "Veuillez sélectionner un service",
  namePlaceholder: "Votre nom complet",
  emailPlaceholder: "votre.email@exemple.com",
  phonePlaceholder: "Votre numéro de téléphone",
  servicePlaceholder: "Sélectionnez un service",
  messagePlaceholder: "Précisez votre demande ou vos questions",
};

const appointmentFormSchema = z.object({
  name: z.string().min(3, { message: texts.nameError }),
  email: z.string().email({ message: texts.emailError }),
  phone: z
    .string()
    .min(8, { message: texts.phoneError })
    .max(15)
    .regex(/^[0-9+\s()-]{8,15}$/, { message: texts.phoneError }),
  service: z.string().min(1, { message: texts.serviceError }),
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
    mode: "onTouched",
  });

  const firstErrorFieldRef = useRef<HTMLInputElement | null>(null);

  // Focus on first error input on errors
  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.errors) {
      const firstErrorKey = Object.keys(form.formState.errors)[0];
      if (firstErrorKey) {
        const element = document.querySelector(
          `input[name="${firstErrorKey}"], textarea[name="${firstErrorKey}"], select[name="${firstErrorKey}"]`
        ) as HTMLElement | null;
        element?.focus();
      }
    }
  }, [form.formState.errors, form.formState.isSubmitted]);

  const createAppointment = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || texts.errorDescDefault);
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: texts.successTitle,
        description: texts.successDesc,
        variant: "default",
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: texts.errorTitle,
        description: error.message || texts.errorDescDefault,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: AppointmentFormValues) {
    createAppointment.mutate(data);
  }

  if (submitted) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="bg-white rounded-lg shadow-xl overflow-hidden p-8 text-center"
      >
        <div className="mb-6 text-5xl text-green-500" aria-hidden="true">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">{texts.successTitle}</h3>
        <p className="text-lg mb-6">{texts.successDesc}</p>
        <Button onClick={() => setSubmitted(false)}>Retour</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
            aria-describedby="form-errors"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-dark font-semibold">
                    {texts.nameLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder={texts.namePlaceholder}
                      aria-invalid={!!form.formState.errors.name}
                      aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="name-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-dark font-semibold">
                    {texts.emailLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder={texts.emailPlaceholder}
                      aria-invalid={!!form.formState.errors.email}
                      aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="email-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone" className="text-dark font-semibold">
                    {texts.phoneLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      placeholder={texts.phonePlaceholder}
                      aria-invalid={!!form.formState.errors.phone}
                      aria-describedby={form.formState.errors.phone ? "phone-error" : undefined}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="phone-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="service" className="text-dark font-semibold">
                    {texts.serviceLabel}
                  </FormLabel>
                  <Select
                    id="service"
                    onValueChange={field.onChange}
                    value={field.value}
                    aria-invalid={!!form.formState.errors.service}
                    aria-describedby={form.formState.errors.service ? "service-error" : undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white">
                        <SelectValue placeholder={texts.servicePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage id="service-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message" className="text-dark font-semibold">
                    {texts.messageLabel}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder={texts.messagePlaceholder}
                      rows={4}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
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
              disabled={createAppointment.isLoading}
              aria-live="polite"
            >
              {createAppointment.isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  {texts.sendingButton}
                </>
              ) : (
                <>
                  <i className="far fa-envelope mr-2" aria-hidden="true">
                    📩
                  </i>{" "}
                  {texts.submitButton}
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
