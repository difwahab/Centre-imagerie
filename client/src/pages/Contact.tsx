'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Choix de la langue : 'fr' ou 'ar'
const lang = 'fr'; // change à 'ar' pour arabe
const isAr = lang === 'ar';

const t = {
  title: isAr ? 'اتصل بنا' : 'Contactez-nous',
  description: isAr
    ? 'لأي استفسار، أو طلب موعد، لا تتردد في مراسلتنا عبر هذا النموذج.'
    : "Pour toute question, demande de rendez-vous ou information complémentaire, n'hésitez pas à nous écrire via ce formulaire.",
  name: isAr ? 'الاسم الكامل' : 'Nom complet',
  email: isAr ? 'البريد الإلكتروني' : 'Adresse email',
  message: isAr ? 'الرسالة' : 'Message',
  placeholderName: isAr ? 'اسمك الكامل' : 'Votre nom',
  placeholderEmail: isAr ? 'example@email.com' : 'vous@email.com',
  placeholderMessage: isAr ? 'اكتب رسالتك هنا...' : 'Votre message...',
  send: isAr ? 'إرسال' : 'Envoyer',
  sending: isAr ? 'جار الإرسال...' : 'Envoi en cours...',
  successTitle: isAr ? 'شكراً لرسالتك!' : 'Merci pour votre message !',
  successDesc: isAr ? 'سنرد عليك في أقرب وقت ممكن.' : 'Nous vous répondrons dans les plus brefs délais.',
  retry: isAr ? 'إرسال رسالة أخرى' : 'Envoyer un autre message',
  error: isAr ? 'حدث خطأ، حاول مرة أخرى.' : 'Une erreur est survenue. Veuillez réessayer.',
};

const formSchema = z.object({
  name: z.string().min(2, isAr ? 'الاسم قصير جدًا' : 'Le nom est trop court'),
  email: z.string().email(isAr ? 'البريد الإلكتروني غير صالح' : "Adresse email invalide"),
  message: z.string().min(10, isAr ? 'الرسالة قصيرة جدًا' : 'Le message est trop court'),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await axios.post('/api/contact', data);
      return response.data;
    },
    onSuccess: () => {
      toast({ title: t.successTitle });
      form.reset();
      setSubmitted(true);
    },
    onError: () => {
      toast({ title: t.error, variant: 'destructive' });
    },
  });

  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 bg-white ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        {/* Infos */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600 mb-6">{t.description}</p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>{isAr ? 'العنوان :' : 'Adresse :'}</strong> 32 Boulevard Hammou Boutlelis, Oran</li>
            <li><strong>{isAr ? 'الهاتف :' : 'Téléphone :'}</strong> 0661 59 81 32</li>
            <li><strong>{isAr ? 'البريد الإلكتروني :' : 'Email :'}</strong> cherif.benameur@gmail.com</li>
          </ul>
          <div className="mt-6 w-full aspect-video rounded-md overflow-hidden">
            <Image
              src="/map.jpg"
              alt="Carte"
              width={600}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
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
                      <FormLabel>{t.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.placeholderName} autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{t.email}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t.placeholderEmail} autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{t.message}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t.placeholderMessage} rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-6 w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? t.sending : t.send}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-green-600 mb-2">{t.successTitle}</h3>
              <p className="text-gray-700">{t.successDesc}</p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>
                {t.retry}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
