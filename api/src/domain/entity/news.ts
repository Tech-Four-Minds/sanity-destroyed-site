import crypto from "crypto";

export type NewsProps ={

    IdNews: string;
    name: string;
    date: Date;
    description: string;
};
export class News {
    private constructor(private props: NewsProps){}

    public static create(name: string, date: Date, description:string){
        return new News({
            IdNews:crypto.randomUUID().toString(),
            name,
            date,
            description,
        });
    }

    public static with(props: NewsProps){
        return new News(props);
    }
    public get IdNews(): string{
        return this.props.IdNews;
    }
   
    public get name(): string{
        return this.props.name;
    }

    public get date(): Date{
        return this.props.date;
    }

    public get description(): string{
        return this.props.description
    }

   
    public set name(name: string) {
        if (!name || name.trim().length === 0) {
            throw new Error("O nome da notícia é obrigatório.");
        }
        this.props.name = name;
    }

    public set description(description: string) {
        if (!description || description.trim().length === 0) {
            throw new Error("A descrição da notícia é obrigatória.");
        }
        this.props.description = description;
    }

    public set date(date: Date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Data inválida.");
        }
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.props.date = normalizedDate;
    }
    
    
    
    
}
