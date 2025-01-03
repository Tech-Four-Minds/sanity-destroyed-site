import { EventProps } from "../../domain/entity/event";
import { EventGateway } from "../../domain/gateway/event.gateway";
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
                this.handleError(error); // Removido o erro duplicado
            } else {
                this.handleError(new Error("Erro ao listar eventos."));
            }

            throw error;
        }
    }

}
