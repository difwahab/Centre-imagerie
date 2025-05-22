import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactMessageSchema,
  insertAppointmentSchema,
} from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiPrefix = "/api";

  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message envoyé avec succès", data: message });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Une erreur s'est produite lors de l'envoi du message." });
    }
  });

  app.get(`${apiPrefix}/contact`, async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error: any) {
      console.error("Error getting contact messages:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des messages." });
    }
  });

  app.post(`${apiPrefix}/appointments`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json({ message: "Rendez-vous demandé avec succès", data: appointment });
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Erreur lors de la demande de rendez-vous." });
    }
  });

  app.get(`${apiPrefix}/appointments`, async (_req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointments();
      res.status(200).json(appointments);
    } catch (error: any) {
      console.error("Error getting appointments:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous." });
    }
  });

  app.get(`${apiPrefix}/appointments/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });
      const appointment = await storage.getAppointmentById(id);
      if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });
      res.status(200).json(appointment);
    } catch (error: any) {
      console.error("Error getting appointment:", error);
      res.status(500).json({ message: "Erreur lors de la récupération du rendez-vous." });
    }
  });

  app.patch(`${apiPrefix}/appointments/:id/status`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Le statut est requis" });
      }
      const updated = await storage.updateAppointmentStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Rendez-vous non trouvé" });
      res.status(200).json({ message: "Statut mis à jour avec succès", data: updated });
    } catch (error: any) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du rendez-vous." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
