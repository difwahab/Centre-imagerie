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

const formSchema = z.object({
  name: z.string().min(2, 'Le nom est trop court'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message est trop court'),
});

type ContactFormValues = z.infer<typeof formSchema>;

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await axios.post('/api/contact', data);
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'Message envoyé avec succès' });
      form.reset();
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
        {/* Côté gauche – Image et infos */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-600 mb-6">
            Pour toute question, demande de rendez-vous ou information complémentaire, n&apos;hésitez pas à nous écrire via ce formulaire.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Adresse :</strong> 32 Boulevard Hammou Boutlelis, Oran</li>
            <li><strong>Téléphone :</strong> 0661 59 81 32</li>
            <li><strong>Email :</strong> cherif.benameur@gmail.com</li>
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

        {/* Côté droit – Formulaire */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-md shadow-md">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nom complet</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Votre nom"
                          autoComplete="name"
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
                    <FormItem className="mt-4">
                      <FormLabel htmlFor="email">Adresse email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="vous@email.com"
                          autoComplete="email"
                          {...field}
                        />
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
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Votre message..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-green-600 mb-2">Merci pour votre message !</h3>
              <p className="text-gray-700">Nous vous répondrons dans les plus brefs délais.</p>
              <Button
                className="mt-6"
                onClick={() => setSubmitted(false)}
              >
                Envoyer un autre message
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
