import { EventProps } from "../../../domain/entity/event";
import { EventGateway } from "../../../domain/gateway/event.gateway";
import { BaseUsecase } from "../../usecase";

export class getEventByIdUseCase extends BaseUsecase<string, EventProps | null> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(id: string): Promise<EventProps | null> {
        this.validateInput(id);

        try {

            const event = await this.eventGateway.getEventById(id);

            this.logAction(`Evento ${id} buscado com sucesso`);

            return event;
            
        } catch (error: unknown) {
            
            if (error instanceof Error) {
                this.handleError(error);

            } else {
                this.handleError(new Error("Erro ao buscar o evento"))
            }

            return null;
        }
        
    }
}