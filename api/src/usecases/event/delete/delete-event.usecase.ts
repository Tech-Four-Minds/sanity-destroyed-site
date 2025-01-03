import { EventGateway } from "../../../domain/gateway/event.gateway";
import { BaseUsecase } from "../../usecase";

export class DeleteEventUseCase extends BaseUsecase<string, void> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(id: string): Promise<void> {
        this.validateInput(id); 

        try {
            await this.eventGateway.deleteEvent(id);
            this.logAction(`Evento ${id} deletado com sucesso.`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro desconhecido ao deletar evento.")); 
            }
        }
    }

    handleError(error: Error): void {
        console.error("Erro ao processar a operação:", error.message);
        throw new Error("Falha ao deletar evento."); 
    }
    
    protected validateInput(id: string): void {
        if (!id) {
            throw new Error("O ID do evento é obrigatório.");
        }
    }
}
