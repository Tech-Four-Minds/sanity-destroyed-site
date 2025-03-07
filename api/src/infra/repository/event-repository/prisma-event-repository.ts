import { EventProps } from "../../../domain/entity/event";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { PrismaClient } from "@prisma/client";
import { Event } from "../../../domain/entity/event";

const prisma = new PrismaClient();

export class PrismaEventRepository implements EventGateway {
    async createEvent(data: Omit<EventProps, "id">): Promise<EventProps> {
        const event = Event.create( 
            data.name,
            data.location,
            data.date,
            data.schedule,
            data.price,
            data.ticket,
            data.status,
            data.image
        );

        const createdEvent = await prisma.event.create({
            data: {
                name: event.name,
                location: event.location,
                date: event.date ?  new Date(event.date).toISOString() : new Date().toISOString(),
                schedule: event.schedule,
                price: event.price,
                ticket: event.ticket || undefined, 
                status: event.status,
                image: event.image || undefined,  
            },
        });

        return this.mapPrismaEvent(createdEvent);
    }
    async listEvents(): Promise<EventProps[]> {
        const events = await prisma.event.findMany();
        return events.map(this.mapPrismaEvent);
    }

    async getEventById(id: string): Promise<EventProps | null> {
        const event = await prisma.event.findUnique({
            where: { id },
        });
        return event ? this.mapPrismaEvent(event) : null;
    }

    async updateEvent(id: string, data: Partial<Omit<EventProps, "id">>): Promise<EventProps> {
        const event = await prisma.event.findUnique({
            where: { id },
        });
    
        if (!event) throw new Error("Evento não encontrado");
    
        const updatedEvent = Event.create( 
            data.name || event.name,
            data.location || event.location,
            data.date || event.date, 
            data.schedule || event.schedule,
            data.price || event.price,
            data.ticket || event.ticket || undefined, 
            data.status !== undefined ? data.status : event.status,
            data.image as Buffer || event.image || undefined,
            event.id
        );

        const eventUpdated = await prisma.event.update({
            where: { id },
            data: {
                name: updatedEvent.name,
                location: updatedEvent.location,
                date: updatedEvent.date,
                schedule: updatedEvent.schedule,
                price: updatedEvent.price,
                ticket: updatedEvent.ticket || undefined,
                status: updatedEvent.status,
                image: updatedEvent.image || undefined,
            },
        });

        return this.mapPrismaEvent(eventUpdated);
    }

    async deleteEvent(eventId: string, data?: { reason: string }): Promise<{ id: string }> {
        const event = await prisma.event.delete({
            where: { id: eventId },
        });
        return { id: event.id };
    }

    private mapPrismaEvent(event: any): EventProps {
        return {
            ...event,
            ticket: event.ticket ?? undefined,
            image: event.image ?? undefined,
        };
    }
}
