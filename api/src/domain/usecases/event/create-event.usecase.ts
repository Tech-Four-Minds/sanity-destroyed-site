import { EventProps } from "../../entity/event";
import { EventGateway } from "../../gateway/event.gateway";
import { BaseUsecase } from "../usecase";

type CreateEventInput = Omit<EventProps, "id">;

export class CreateEventUseCase extends BaseUsecase<CreateEventInput, EventProps> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(input: CreateEventInput): Promise<EventProps> {
        this.validateInput(input);

        try {

            const event = await this.eventGateway.createEvent(input);

            this.logAction(`Evento criado com sucesso: ${event.name}`);

            return event;

        } catch (error: unknown) {

           if (error instanceof Error) {

            this.handleError(error);

           } else {
            this.handleError(new Error("Erro ao criar evento."));
           }

           throw error;
            
        }

    }
}