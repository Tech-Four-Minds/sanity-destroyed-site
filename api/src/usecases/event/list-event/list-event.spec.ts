import { ListEventsUseCase } from "./list-event.usecase";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { EventProps } from "../../../domain/entity/event";

const mockEventGateway: jest.Mocked<EventGateway> = {
    listEvents: jest.fn(),
    getEventById: jest.fn(),
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
};

describe("ListEventsUseCase", () => {
    let listEventsUseCase: ListEventsUseCase;

    beforeEach(() => {
        listEventsUseCase = new ListEventsUseCase(mockEventGateway);
        jest.clearAllMocks();
    });

    it("should return a list of events when events exist", async () => {
        const mockEvents: EventProps[] = [
            { id: "1", name: "Evento 1", date: new Date(), location: "Local 1", schedule: "09:00", price: 100, status: true },
            { id: "2", name: "Evento 2", date: new Date(), location: "Local 2", schedule: "10:00", price: 150, status: true },
        ];

        mockEventGateway.listEvents.mockResolvedValue(mockEvents);

        const result = await listEventsUseCase.execute();

        expect(result).toEqual(mockEvents);
        expect(mockEventGateway.listEvents).toHaveBeenCalled();
    });

    it("should log action when events are listed successfully", async () => {
        const mockEvents: EventProps[] = [
            { id: "1", name: "Evento 1", date: new Date(), location: "Local 1", schedule: "09:00", price: 100, status: true },
        ];

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        mockEventGateway.listEvents.mockResolvedValue(mockEvents);

        await listEventsUseCase.execute();

        expect(logSpy).toHaveBeenCalledWith("Ação realizada: Eventos listados com sucesso");

        logSpy.mockRestore();
    });

    it("should handle error and log it when an error occurs", async () => {
        const errorMessage = "Erro ao listar eventos.";

        mockEventGateway.listEvents.mockRejectedValue(new Error(errorMessage));

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await expect(listEventsUseCase.execute()).rejects.toThrow("Operação falhou. Tente novamente mais tarde.");

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);

        errorSpy.mockRestore();
    });
});
