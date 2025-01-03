import { EventGateway } from "../../domain/gateway/event.gateway";
import { BaseUsecase } from "../usecase";
import { EventProps } from "../../domain/entity/event";

export class CreateEventUseCase extends BaseUsecase<any, EventProps> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(input: any): Promise<EventProps> {
        this.validateInput(input);

        const { name, location, date, schedule, price, ticket, status } = input;

        if (!name) throw new Error("O nome do evento é obrigatório.");
        if (!location) throw new Error("A localização do evento é obrigatória.");
        if (date < new Date()) throw new Error("A data do evento não pode ter passado.");
        if (price < 0) throw new Error("O valor do evento não pode ser negativo.");
        if (!schedule) throw new Error("O horário do evento é obrigatório.");
        if (!ticket) throw new Error("O ticket do evento é obrigatório.");
        if (status === undefined) throw new Error("O status do evento é obrigatório.");

        try {
            const event = await this.eventGateway.createEvent(input);
            this.logAction(`Evento ${event.id} criado com sucesso.`);
            return event;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro desconhecido ao criar evento."));
            }
            throw new Error("Falha ao criar evento");
        }
    }
}
