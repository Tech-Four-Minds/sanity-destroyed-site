import { Router } from "express";
import { EventController } from "../../controllers/events/eventController";
import { PrismaEventRepository } from "../../infra/repository/event-repository/prisma-event-repository";

const eventGateway = new PrismaEventRepository
const eventController = new EventController(eventGateway)

export const eventRoutes = () => {

    const routerEvent = Router();

    routerEvent.post("/events/", eventController.createEvent.bind(eventController));
    routerEvent.get("/events/", eventController.listEvents.bind(eventController));
    routerEvent.get("/events/:id", eventController.getEventById.bind(eventController));
    routerEvent.put("/events/:id", eventController.updateEvent.bind(eventController));
    routerEvent.delete("/events/:id", eventController.deleteEvent.bind(eventController));

    return routerEvent;
}