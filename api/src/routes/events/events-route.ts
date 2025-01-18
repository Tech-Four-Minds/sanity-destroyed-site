import { Router } from "express";
import { EventController } from "../../controllers/events/eventController";
import { InMemoryEventRepository } from "../../infra/repository/event-repository/event-repository";

const eventGateway = new InMemoryEventRepository
const eventController = new EventController(eventGateway)

export const eventRoutes = () => {

    const routerEvent = Router();

    routerEvent.post("/events/post", eventController.createEvent.bind(eventController));
    routerEvent.get("/events/get", eventController.listEvents.bind(eventController));
    routerEvent.get("/events/:id", eventController.getEventById.bind(eventController));
    routerEvent.put("/events/:id", eventController.updateEvent.bind(eventController));
    routerEvent.delete("/events/:id", eventController.deleteEvent.bind(eventController));

    return routerEvent;
}