import { Event, EventProps } from "../entity/event";


export interface EventGateway {
    createEvent(data: Omit<EventProps, "id">): Promise<EventProps>;
    listEvents(): Promise<EventProps[]>;
    getEventById(id: string): Promise<EventProps | null>;
    updateEvent(id: string, data: Partial<Omit<EventProps, "id">>): Promise<EventProps>;
    deleteEvent(id: string): Promise<void>;
}