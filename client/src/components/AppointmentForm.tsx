import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/constants";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";

const appointmentFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8).regex(/^[0-9+\s()-]{8,15}$/),
  service: z.string(),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export default function AppointmentForm() {
  const { t } = useTranslation();
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
        title: t("appointment.successTitle"),
        description: t("appointment.successDesc"),
      });
      form.reset();
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: t("form.error"),
        variant: "destructive",
      });
    },
  });

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-xl overflow-hidden p-8 text-center">
        <div className="mb-6 text-5xl text-green-500">✓</div>
        <h3 className="text-2xl font-bold text-primary mb-4">
          {t("appointment.successTitle")}
        </h3>
        <p className="text-lg mb-6">{t("appointment.successDesc")}</p>
        <Button onClick={() => setSubmitted(false)}>{t("appointment.retry")}</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => createAppointment.mutate(data))} className="space-y-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("appointment.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("appointment.placeholderName")} {...field} />
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
                  <FormLabel>{t("appointment.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("appointment.placeholderEmail")} {...field} />
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
                  <FormLabel>{t("appointment.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("appointment.placeholderPhone")} {...field} />
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
                  <FormLabel>{t("appointment.service")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("appointment.selectPlaceholder")} />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("appointment.message")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("appointment.placeholderMessage")} rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={createAppointment.isPending}>
              {createAppointment.isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  {t("appointment.sending")}
                </>
              ) : (
                <>
                  📩 {t("appointment.submit")}
                </>
              )}
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
}
