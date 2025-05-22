"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../components/ui/button"; // ✅ Chemin relatif
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

import { useToast } from "../components/ui/use-toast"; // ✅ Gestion correcte du toast

// ✅ Correction TS2367 : Utilisation d'un type union au lieu d'une énumération
type LangType = "fr" | "ar";

const lang: LangType = (localStorage.getItem("lang") as LangType) || "fr";
const isAr = lang === "ar";

const translations = {
  fr: {
    title: "Contactez-nous",
    description:
      "Pour toute question, demande de rendez-vous ou information complémentaire, n'hésitez pas à nous écrire via ce formulaire.",
    name: "Nom complet",
    email: "Adresse email",
    message: "Message",
    placeholderName: "Votre nom",
    placeholderEmail: "vous@email.com",
    placeholderMessage: "Votre message...",
    send: "Envoyer",
    sending: "Envoi en cours...",
    successTitle: "Merci pour votre message !",
    successDesc: "Nous vous répondrons dans les plus brefs délais.",
    retry: "Envoyer un autre message",
    error: "Une erreur est survenue. Veuillez réessayer.",
  },
  ar: {
    title: "اتصل بنا",
    description:
      "لأي استفسار، أو طلب موعد، لا تتردد في مراسلتنا عبر هذا النموذج.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    placeholderName: "اسمك الكامل",
    placeholderEmail: "example@email.com",
    placeholderMessage: "اكتب رسالتك هنا...",
    send: "إرسال",
    sending: "جار الإرسال...",
    successTitle: "شكراً لرسالتك!",
    successDesc: "سنرد عليك في أقرب وقت ممكن.",
    retry: "إرسال رسالة أخرى",
    error: "حدث خطأ، حاول مرة أخرى.",
  },
};

const currentTranslations = translations[lang];

// ✅ Validation avec Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: isAr ? "الاسم قصير جدًا" : "Le nom est trop court",
  }),
  email: z.string().email({
    message: isAr
      ? "البريد الإلكتروني غير صالح"
      : "Adresse email invalide",
  }),
  message: z.string().min(10, {
    message: isAr ? "الرسالة قصيرة جدًا" : "Le message est trop court",
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await axios.post("/api/contact", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success(currentTranslations.successTitle);
      form.reset();
      setSubmitted(true);
    },
    onError: () => {
      toast.error(currentTranslations.error);
    },
  });

  return (
    <section
      className={`py-16 px-4 md:px-8 lg:px-16 bg-white ${
        isAr ? "text-right" : "text-left"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        {/* Infos */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{currentTranslations.title}</h2>
          <p className="text-gray-600 mb-6">{currentTranslations.description}</p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>{isAr ? "العنوان :" : "Adresse :"}</strong> 32 Boulevard Hammou Boutlelis, Oran
            </li>
            <li>
              <strong>{isAr ? "الهاتف :" : "Téléphone :"}</strong> 0661 59 81 32
            </li>
            <li>
              <strong>{isAr ? "البريد الإلكتروني :" : "Email :"}</strong> cherif.benameur@gmail.com
            </li>
          </ul>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-md shadow-md">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} noValidate>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentTranslations.name}</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={currentTranslations.placeholderName} autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-6 w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? currentTranslations.sending : currentTranslations.send}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-green-600 mb-2">
                {currentTranslations.successTitle}
              </h3>
              <p className="text-gray-700">{currentTranslations.successDesc}</p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>
                {currentTranslations.retry}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}