import { InMemoryEventRepository } from "./event-repository";
import { EventProps } from "../../domain/entity/event";

describe("InMemoryEventRepository", () => {
  let repository: InMemoryEventRepository;

  beforeEach(() => {
    repository = new InMemoryEventRepository();
  });

  test("Deve criar um evento", async () => {
    const input: Omit<EventProps, "id"> = {
      name: "Evento Teste",
      location: "São Paulo",
      date: new Date("2025-07-20"),
      schedule: "20:00",
      price: 50,
      ticket: "VIP",
      status: true,
      image: "image_url.jpg",
    };

    const event = await repository.createEvent(input);

    console.log("Evento criado:", event);  // Log do evento criado
    expect(event).toHaveProperty("id");
    expect(event.name).toBe(input.name);
    expect(event.location).toBe(input.location);
  });

  test("Deve listar todos os eventos", async () => {
    const event1 = await repository.createEvent({
      name: "Evento 1",
      location: "Rio de Janeiro",
      date: new Date("2025-07-15"),
      schedule: "18:00",
      price: 100,
      ticket: "Normal",
      status: true,
      image: "image1.jpg",
    });

    const event2 = await repository.createEvent({
      name: "Evento 2",
      location: "São Paulo",
      date: new Date("2025-07-20"),
      schedule: "20:00",
      price: 200,
      ticket: "VIP",
      status: true,
      image: "image2.jpg",
    });

    const events = await repository.listEvents();

    console.log("Eventos listados:", events);  
    expect(events).toHaveLength(2);
    expect(events).toContainEqual(event1);
    expect(events).toContainEqual(event2);
  });

  test("Deve buscar um evento pelo ID", async () => {
    const event = await repository.createEvent({
      name: "Evento Teste",
      location: "São Paulo",
      date: new Date("2025-07-20"),
      schedule: "20:00",
      price: 50,
      ticket: "VIP",
      status: true,
      image: "image_url.jpg",
    });

    const foundEvent = await repository.getEventById(event.id);

    console.log("Evento encontrado:", foundEvent);  
    expect(foundEvent).toBeTruthy();
    expect(foundEvent?.id).toBe(event.id);
  });

  test("Deve atualizar um evento", async () => {
    const event = await repository.createEvent({
      name: "Evento Original",
      location: "São Paulo",
      date: new Date("2025-07-20"),
      schedule: "20:00",
      price: 50,
      ticket: "VIP",
      status: true,
      image: "image_url.jpg",
    });

    const updatedEvent = await repository.updateEvent(event.id, {
      name: "Evento Atualizado",
      price: 100,
    });

    console.log("Evento atualizado:", updatedEvent);  
    expect(updatedEvent.name).toBe("Evento Atualizado");
    expect(updatedEvent.price).toBe(100);
  });

  test("Deve deletar um evento", async () => {
    const event = await repository.createEvent({
      name: "Evento para Deletar",
      location: "São Paulo",
      date: new Date("2025-07-20"),
      schedule: "20:00",
      price: 50,
      ticket: "VIP",
      status: true,
      image: "image_url.jpg",
    });

    await repository.deleteEvent(event.id);

    const foundEvent = await repository.getEventById(event.id);

    console.log("Evento deletado:", foundEvent);  
    expect(foundEvent).toBeNull();
  });

  test("Deve lançar erro ao tentar atualizar um evento inexistente", async () => {
    try {
      await repository.updateEvent("id_inexistente", { name: "Novo Nome" });
    } catch (error: unknown) {  
      if (error instanceof Error) {  
        console.log("Erro ao atualizar evento inexistente:", error);  
        expect(error.message).toBe("Evento não encontrado.");
      }
    }
  });

  test("Deve lançar erro ao tentar deletar um evento inexistente", async () => {
    try {
      await repository.deleteEvent("id_inexistente");
    } catch (error: unknown) {  
      if (error instanceof Error) { 
        console.log("Erro ao deletar evento inexistente:", error);  
        expect(error.message).toBe("Evento não encontrado.");
      }
    }
  });
});
