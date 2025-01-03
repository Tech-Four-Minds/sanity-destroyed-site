export interface Usecase<InputDto, OutputDto> {
    execute(input: InputDto): Promise<OutputDto>;
    handleError(error: Error): void;
    logAction(action: string): void;
}

export abstract class BaseUsecase<InputDto, OutputDto> implements Usecase<InputDto, OutputDto> {
    abstract execute(input: InputDto): Promise<OutputDto>;

    protected validateInput(input: InputDto): void {
        if (!input) {
            throw new Error("Entrada inválida");
        }
    }

    handleError(error: Error): void {
        console.error("Erro ao processar a operação:", error.message);
        throw new Error("Operação falhou. Tente novamente mais tarde.");
    }

    logAction(action: string): void {
        console.log(`Ação realizada: ${action}`);
    }
}
