import { getEventByIdUseCase } from "./get-event-by-id.usecase";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { EventProps } from "../../../domain/entity/event";


const mockEventGateway: jest.Mocked<EventGateway> = {
    deleteEvent: jest.fn(),
    createEvent: jest.fn(),
    listEvents: jest.fn(),
    getEventById: jest.fn(),
    updateEvent: jest.fn(),
};

describe("getEventByIdUseCase", () => {
    let getEventById: getEventByIdUseCase;

    beforeEach(() => {
        getEventById = new getEventByIdUseCase(mockEventGateway);
        jest.clearAllMocks();
    });

    it("should throw error if event ID is missing", async () => {
        const eventId = ""; 

        await expect(getEventById.execute(eventId))
            .rejects
            .toThrow("Entrada inválida");
    });

    it("should handle error and throw a user-friendly message if event is not found", async () => {
        const eventId = "123";
        const errorMessage = "Evento não encontrado";
        mockEventGateway.getEventById.mockRejectedValue(new Error(errorMessage));

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {}); 

        await expect(getEventById.execute(eventId))
            .rejects
            .toThrow("Operação falhou. Tente novamente mais tarde.");

        
        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", `Erro ao processar a operação: ${errorMessage}`);
        expect(mockEventGateway.getEventById).toHaveBeenCalledWith(eventId);

        errorSpy.mockRestore();
    });

    it("should return event successfully if event exists", async () => {
        const eventId = "123";
        const mockEvent: EventProps = {
            id: "123",
            name: "Evento Teste",
            date: new Date("2025-01-07"),
            location: "Local Teste",
            schedule: "10:00 AM",
            price: 100,
            status: true,
        };

        mockEventGateway.getEventById.mockResolvedValue(mockEvent);

        const result = await getEventById.execute(eventId);

        expect(result).toEqual(mockEvent);
        expect(mockEventGateway.getEventById).toHaveBeenCalledWith(eventId);
    });

    it("should log action when event is retrieved successfully", async () => {
        const eventId = "123";
        const mockEvent: EventProps = {
            id: "123",
            name: "Evento Teste",
            date: new Date("2025-01-07"),
            location: "Local Teste",
            schedule: "10:00 AM",
            price: 100,
            status: true,
        };

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {}); 
        mockEventGateway.getEventById.mockResolvedValue(mockEvent);

        await getEventById.execute(eventId);

        
        expect(logSpy).toHaveBeenCalledWith("Ação realizada: Evento 123 buscado com sucesso");

        logSpy.mockRestore();
    });
});
