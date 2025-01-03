import { EventProps } from "../../entity/event";
import { EventGateway } from "../../gateway/event.gateway";
import { BaseUsecase } from "../usecase";

type UpdateEventinput = Partial<Omit<EventProps, "id">>;

export class UpdateEventUsecase extends BaseUsecase<{ id: string; data: UpdateEventinput }, EventProps> {
    constructor(private eventGateway: EventGateway) {
        super();
    }

    async execute(input: { id: string; data: UpdateEventinput; }): Promise<EventProps> {
        this.validateInput(input);

        try {
            const updateEvent = await this.eventGateway.updateEvent(input.id, input.data);
            this.logAction(`Evento ${input.id} atualizado com sucesso.`);
            return updateEvent;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro ao atualizar evento."));
            }
            throw new Error("Atualização falhou.")            
        }
    }

    validateInput(input: { id: string; data: UpdateEventinput; }): void {
        if (!input.id || input.data) {
            throw new Error("ID e dados da atualização são obrigatórios. ")
        }
    }
}