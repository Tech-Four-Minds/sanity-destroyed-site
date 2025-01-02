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
    public get IdNews(){
        return this.props.IdNews;
    }
   
    public get name(){
        return this.props.name;
    }
    public get description(){
        return this.props.description
    }



}