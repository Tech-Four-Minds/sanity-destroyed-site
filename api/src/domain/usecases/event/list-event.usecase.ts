import { EventProps } from "../../entity/event";
import { EventGateway } from "../../gateway/event.gateway";
import { BaseUsecase } from "../usecase";

export class ListEventsUseCase extends BaseUsecase<null, EventProps[]> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(): Promise<EventProps[]> {
        try {
            
            const events = await this.eventGateway.listEvents();

            this.logAction("Eventos listados com sucesso");

            return events;
            
        } catch (error: unknown) {

            if (error instanceof Error) {
                this.handleError(error) 
                    this.handleError(error);
                
            } else {
                this.handleError(new Error("Erro ao listar eventos."));

            }

            throw error;
            
        }
        
    }
    validateInput(input: null): void {}
    
}