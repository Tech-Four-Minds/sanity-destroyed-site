import { EventProps } from "../../domain/entity/event";
import { EventGateway } from "../../domain/gateway/event.gateway";

export class InMemoryEventRepository implements EventGateway {
  private events: EventProps[] = [];


  public async createEvent(data: Omit<EventProps, "id">): Promise<EventProps> {
    const event: EventProps = {
      id: this.generateId(),
      ...data,
    };
    this.events.push(event);
    return event;
  }

  public async listEvents(): Promise<EventProps[]> {
    return this.events;
  }

 
  public async getEventById(id: string): Promise<EventProps | null> {
    return this.events.find(event => event.id === id) || null;
  }

  public async updateEvent(id: string, data: Partial<Omit<EventProps, "id">>): Promise<EventProps> {
    const event = await this.getEventById(id);
    if (!event) throw new Error("Evento não encontrado.");

    Object.assign(event, data);
    return event;
  }

  public async deleteEvent(eventId: string): Promise<{ id: string }> {
    const index = this.events.findIndex(event => event.id === eventId);
    if (index === -1) throw new Error("Evento não encontrado.");
    this.events.splice(index, 1);
    return { id: eventId };
  }

  private generateId(): string {
    return (Math.random() * 1e6).toString(36);
  }
}
