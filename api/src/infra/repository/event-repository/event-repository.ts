import { Event, EventProps } from "../../../domain/entity/event";
import { EventGateway } from "../../../domain/gateway/event.gateway";

export class InMemoryEventRepository implements EventGateway {
  private events: Event[] = [];

  public async createEvent(data: Omit<EventProps, "id">): Promise<EventProps> {
    const event = Event.create(data.name, data.location, data.date, data.schedule, data.price, data.ticket, data.status, data.image
    );
    this.events.push(event);
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      schedule: event.schedule,
      price: event.price,
      ticket: event.ticket,
      status: event.status,
      image: event.image,
    };
  }

  public async listEvents(): Promise<EventProps[]> {
    return this.events.map(event => ({
        id: event.id,
        name: event.name,
        location: event.location,
        date: event.date,
        schedule: event.schedule,
        price: event.price,
        ticket: event.ticket,
        status: event.status,
        image: event.image,
    }));
}


  public async getEventById(id: string): Promise<EventProps | null> {
    const event = this.events.find(event => event.id === id);
    if (!event) {
      return null;
    }

    return {
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      schedule: event.schedule,
      price: event.price,
      ticket: event.ticket,
      status: event.status,
      image: event.image,
    };
  }

  public async updateEvent(id: string, data: Partial<Omit<EventProps, "id">>): Promise<EventProps> {
    const event = this.events.find(event => event.id === id);
    if (!event) throw new Error("Evento não encontrado.");

    if (data.name) event.name = data.name;
    if (data.location) event.location = data.location;
    if (data.date) event.date = new Date(data.date);
    if (data.schedule) event.schedule = data.schedule;
    if (data.price) event.price = data.price;
    if (data.ticket) event.ticket = data.ticket;
    if (data.status !== undefined) event.status = data.status;
    if (data.image) event.image = data.image;

    return {
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      schedule: event.schedule,
      price: event.price,
      ticket: event.ticket,
      status: event.status,
      image: event.image,
    };
  }

  public async deleteEvent(id: string): Promise<{ id: string }> {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) throw new Error("Evento não encontrado.");

    this.events.splice(index, 1);
    return { id };
  }
}
