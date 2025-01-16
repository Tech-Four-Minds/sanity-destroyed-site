import { Request, Response } from "express";
import { EventGateway } from "../../domain/gateway/event.gateway";

export class EventController {
    private eventGateway: EventGateway;

    constructor(eventGateway: EventGateway){
        this.eventGateway = eventGateway;
    }

    async createEvent (req: Request, res: Response): Promise<void> {
        const {name, location, date ,schedule, price, ticket, status, image} = req.body;
        try {
            const event = await this.eventGateway.createEvent({
                name,
                location,
                date,
                schedule,
                price,
                ticket,
                status,
                image
            });
            res.status(201).json(event)
        }catch (error) {
            res.status(400).json({ error: (error as Error).message})
        }
    };

    async listEvents (req: Request, res: Response): Promise<void> {
        try {
            const event = await this.eventGateway.listEvents();
            res.status(200).json(event);
        }   catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

    async getEventById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const event = await this.eventGateway.getEventById(id);
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ error: "Evento não encontrado" });
            }
        } catch (error) {
            res.status(400).json({error: (error as Error).message});
        }
    };

    async updateEvent (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;

        try {
            const event = await this.eventGateway.updateEvent(id, data);
            res.status(200).json(event);

        }catch (error) {
            res.status(400).json({ error: (error as Error).message});
        }
    };

    async deleteEvent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.eventGateway.deleteEvent(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message})
            
        }
    };
};