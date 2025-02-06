import { Router } from "express";
import { EventController } from "../../controllers/events/eventController";
import { authenticateRequest } from "../../infra/middlewares/authenticateRequest";

export const eventRoutes = () => {

    const eventController = new EventController();

    const routerEvent = Router();

    routerEvent.post("/events/", authenticateRequest ,eventController.createEvent.bind(eventController));
    routerEvent.get("/events/", eventController.listEvents.bind(eventController));
    routerEvent.get("/events/:id", eventController.getEventById.bind(eventController));
    routerEvent.put("/events/:id", authenticateRequest ,eventController.updateEvent.bind(eventController));
    routerEvent.delete("/events/:id", authenticateRequest ,eventController.deleteEvent.bind(eventController));

    return routerEvent;
}