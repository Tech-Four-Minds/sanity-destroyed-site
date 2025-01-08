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
        const errorMessage = "Database Error";
        mockEventGateway.deleteEvent.mockRejectedValue(new Error(errorMessage));

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await expect(deleteEventUseCase.execute(eventId))
            .rejects
            .toThrow("Falha ao deletar evento.");

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);

        errorSpy.mockRestore();
    });

    it("should delete the event successfully", async () => {
        const eventId = "123";
        mockEventGateway.deleteEvent.mockResolvedValue({ id: eventId }); 

        await expect(deleteEventUseCase.execute(eventId))
            .resolves
            .toBeUndefined();
    });
});
