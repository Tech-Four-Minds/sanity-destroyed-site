import { UpdateEventUsecase } from "./update-event.usecase";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { EventProps } from "../../../domain/entity/event";

const mockEventGateway: jest.Mocked<EventGateway> = {
    deleteEvent: jest.fn(),
    createEvent: jest.fn(),
    listEvents: jest.fn(),
    getEventById: jest.fn(),
    updateEvent: jest.fn(),
};

describe("UpdateEventUsecase", () => {
    let updateEventUsecase: UpdateEventUsecase;

    beforeEach(() => {
        updateEventUsecase = new UpdateEventUsecase(mockEventGateway);
    });

    it("should throw error if event ID is missing or data is empty", async () => {
        const input = { id: "", data: {} };

        await expect(updateEventUsecase.execute(input))
            .rejects
            .toThrow("ID e dados da atualização são obrigatórios.");
    });

    it("should update event successfully", async () => {
        const input = { id: "123", data: { name: "Updated Event" } };  
        const mockUpdatedEvent: EventProps = {
            id: "123",
            name: "Updated Event",
            date: new Date("2025-01-07"),
            location: "Updated Location",
            schedule: "10:00 AM",
            price: 100,
            status: true,
        };

        mockEventGateway.updateEvent.mockResolvedValue(mockUpdatedEvent);

        const result = await updateEventUsecase.execute(input);

        expect(result).toEqual(mockUpdatedEvent);
        expect(mockEventGateway.updateEvent).toHaveBeenCalledWith(input.id, input.data);
    });

    it("should log action when event is updated successfully", async () => {
        const input = { id: "123", data: { name: "Updated Event" } };
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {}); 

        const mockUpdatedEvent: EventProps = {
            id: "123",
            name: "Updated Event",
            date: new Date("2025-01-07"),
            location: "Updated Location",
            schedule: "10:00 AM",
            price: 100,
            status: true,
        };

        mockEventGateway.updateEvent.mockResolvedValue(mockUpdatedEvent);

        await updateEventUsecase.execute(input);

        expect(logSpy).toHaveBeenCalledWith("Ação realizada: Evento 123 atualizado com sucesso.");

        logSpy.mockRestore();
    });

    it("should handle error and throw user-friendly message if update fails", async () => {
        const input = { id: "123", data: { name: "Updated Event" } };
        const errorMessage = "Database Error";

        mockEventGateway.updateEvent.mockRejectedValue(new Error(errorMessage));
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await expect(updateEventUsecase.execute(input))
            .rejects
            .toThrow("Atualização falhou.");

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);
        expect(mockEventGateway.updateEvent).toHaveBeenCalledWith(input.id, input.data);

        errorSpy.mockRestore();
    });
});
