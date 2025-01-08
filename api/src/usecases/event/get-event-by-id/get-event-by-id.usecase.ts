import { EventProps } from "../../../domain/entity/event";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { BaseUsecase } from "../../usecase";

export class getEventByIdUseCase extends BaseUsecase<string, EventProps | null> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    validateInput(id: string): void {
        if (!id) {
            throw new Error("Entrada inválida");
        }
    }

    async execute(id: string): Promise<EventProps | null> {
        this.validateInput(id);

        try {
            const event = await this.eventGateway.getEventById(id);
            this.logAction(`Evento ${id} buscado com sucesso`);
            return event;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao buscar o evento";

        
            this.handleError(new Error(`Erro ao processar a operação: ${errorMessage}`));
            return null;
        }
    }
}
