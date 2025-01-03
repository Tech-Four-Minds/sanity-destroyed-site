import { CreateEventUseCase } from "../../usecases/event/create-event.usecase";
import { EventGateway } from "../gateway/event.gateway";

const mockEventGateway: EventGateway = {
    createEvent: jest.fn(),
    listEvents: jest.fn(),
    getEventById: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
};


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

    beforeEach(() => {
        createEventUseCase = new CreateEventUseCase(mockEventGateway);
    });

    it("should create an event successfully", async () => {
        const input = {
            name: "Event Test",
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

    it("should list events", async () => {
        const mockEvents = [mockEvent, { ...mockEvent, id: "124", name: "Another Event" }];
        (mockEventGateway.listEvents as jest.Mock).mockResolvedValue(mockEvents);

        const events = await mockEventGateway.listEvents();
        expect(events).toHaveLength(2);
        expect(events[0]).toHaveProperty("id");
        expect(events[0].name).toBe(mockEvent.name);
    });

    it("should update an event successfully", async () => {
        const eventId = "123";
        const updatedData = { name: "Updated Event Name" };
    
        (mockEventGateway.updateEvent as jest.Mock).mockResolvedValue({ ...mockEvent, ...updatedData });
    
        const event = await mockEventGateway.updateEvent(eventId, updatedData);
    
        expect(event).toHaveProperty("id", eventId);
        expect(event.name).toBe(updatedData.name);
    });
    

    it("should update an event successfully", async () => {
        const eventId = "123";
        const updatedData = { name: "Updated Event Name" };
    
        (mockEventGateway.updateEvent as jest.Mock).mockResolvedValue({ ...mockEvent, ...updatedData });
    
        const event = await mockEventGateway.updateEvent(eventId, updatedData);
    
        expect(event).toHaveProperty("id", eventId);
        expect(event.name).toBe(updatedData.name);
    });
    

    it("should delete an event successfully", async () => {
        const eventId = "123";
        const deleteData = { reason: "Event canceled" };
    
        (mockEventGateway.deleteEvent as jest.Mock).mockResolvedValue({ id: eventId });
    
        const result = await mockEventGateway.deleteEvent(eventId, deleteData);
    
        expect(result).toHaveProperty("id", eventId);
        expect(mockEventGateway.deleteEvent).toHaveBeenCalledWith(eventId, deleteData);
    });
    
    
});
