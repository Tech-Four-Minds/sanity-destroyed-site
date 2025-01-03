import { DeleteEventUseCase } from "./delete-event.usecase";
import { EventGateway } from "../../../domain/gateway/event.gateway";

const mockEventGateway: jest.Mocked<EventGateway> = {
    deleteEvent: jest.fn(),
    createEvent: jest.fn(),
    listEvents: jest.fn(),
    getEventById: jest.fn(),
    updateEvent: jest.fn(),
};

describe("DeleteEventUseCase", () => {
    let deleteEventUseCase: DeleteEventUseCase;

    beforeEach(() => {
        deleteEventUseCase = new DeleteEventUseCase(mockEventGateway);
    });

    it("should throw error if event ID is missing", async () => {
        const eventId = "";
        await expect(deleteEventUseCase.execute(eventId))
            .rejects
            .toThrow("O ID do evento é obrigatório.");
    });

    it("should log action and handle error if event deletion fails", async () => {
        const eventId = "123";
        mockEventGateway.deleteEvent.mockRejectedValue(new Error("Database Error"));

        await expect(deleteEventUseCase.execute(eventId))
            .rejects
            .toThrow("Falha ao deletar evento.");
    });

    it("should delete the event successfully", async () => {
        const eventId = "123";
        mockEventGateway.deleteEvent.mockResolvedValue({ id: eventId }); 

        await expect(deleteEventUseCase.execute(eventId))
            .resolves
            .toBeUndefined();
    });
});
