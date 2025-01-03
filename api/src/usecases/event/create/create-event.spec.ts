import { CreateEventUseCase } from "./create-event.usecase";
import { EventGateway } from "../../../domain/gateway/event.gateway";

const mockEvent = {
    id: "123",
    name: "Test Event",
    location: "Test Location",
    date: new Date("2025-12-31"),
    schedule: "2024-12-31T10:00:00Z",
    price: 100,
    ticket: "abc123",
    status: true,
};

describe("CreateEventUseCase", () => {
    let createEventUseCase: CreateEventUseCase;
    let mockEventGateway: EventGateway;

    beforeEach(() => {
        mockEventGateway = {
            createEvent: jest.fn(),
            listEvents: jest.fn(),
            getEventById: jest.fn(),
            updateEvent: jest.fn(),
            deleteEvent: jest.fn(),
        };

        createEventUseCase = new CreateEventUseCase(mockEventGateway);
    });

    it("should create event successfully", async () => {
        const input = {
            name: "New Event",
            location: "Online",
            date: new Date("2025-12-31"),
            schedule: "2024-12-31T10:00:00Z",
            price: 100,
            ticket: "abc123",
            status: true,
        };

        (mockEventGateway.createEvent as jest.Mock).mockResolvedValue({
            id: "123", 
            ...input,
        });

        const event = await createEventUseCase.execute(input);

        expect(event).toHaveProperty("id");
        expect(event.name).toBe(input.name);
        expect(mockEventGateway.createEvent).toHaveBeenCalledWith(input);
    });

    it("should throw error if event name is missing", async () => {
        const input = { ...mockEvent, name: "" };

        await expect(createEventUseCase.execute(input))
            .rejects
            .toThrow("O nome do evento é obrigatório.");
    });

    it("should throw error if location is missing", async () => {
        const input = { ...mockEvent, location: "" };

        await expect(createEventUseCase.execute(input))
            .rejects
            .toThrow("A localização do evento é obrigatória.");
    });

    it("should throw error if price is negative", async () => {
        const input = { ...mockEvent, price: -10 };

        await expect(createEventUseCase.execute(input))
            .rejects
            .toThrow("O preço do evento não pode ser negativo.");
    });

    it("should throw error if event date is in the past", async () => {
        const input = { ...mockEvent, date: new Date("2020-12-31") };

        await expect(createEventUseCase.execute(input))
            .rejects
            .toThrow("A data do evento não pode ter passado.");
    });

    it("should throw error if event creation fails", async () => {
        const input = { ...mockEvent, name: "Error Event" };
        (mockEventGateway.createEvent as jest.Mock).mockRejectedValue(new Error("Database Error"));

        await expect(createEventUseCase.execute(input))
            .rejects
            .toThrow("Operação falhou. Tente novamente mais tarde.");
    });
});
