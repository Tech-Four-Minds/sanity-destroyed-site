export type EventProps = { 
    id?: string;
    name: string;
    location: string;
    date: Date;
    schedule: string;
    price: number;
    ticket?: string;
    status: boolean;
    image?: Buffer;
};

export class Event {
    private constructor(private props: EventProps) {}

    public static create(
        name: string,
        location: string,
        date: Date,
        schedule: string,
        price: number,
        ticket?: string,
        status: boolean = true,
        image?: Buffer,
        id?: string
    ): Event {
         return new Event({
            id: id || "" ,
            name,
            location,
            date ,
            schedule,
            price,
            ticket,
            status,
            image
        });
    }


    public get id(): string {
        return this.props.id || ""; 
    }


    public get name(): string {
        return this.props.name;
    }

    public get location(): string {
        return this.props.location;
    }

    public get date(): Date {
        return this.props.date;
    }

    public get schedule(): string {
        return this.props.schedule;
    }

    public get price(): number {
        return this.props.price;
    }

    public get ticket(): string | undefined {
        return this.props.ticket;
    }

    public get status(): boolean {
        return this.props.status;
    }

    public get image(): Buffer | undefined {
        return this.props.image;
    }

    public set id(id: string) {
        if (!id || id.trim().length === 0) {
            throw new Error("O ID do evento é obrigatório.");
        }
        this.props.id = id;
    }

    public set name(name: string) {
        if (!name || name.trim().length === 0) {
            throw new Error("O nome do evento é obrigatório.");
        }
        this.props.name = name;
    }

    public set location(location: string) {
        if (!location || location.trim().length === 0) {
            throw new Error("O local do evento é obrigatório.");
        }
        this.props.location = location;
    }

    public set date(date: Date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Data inválida.");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0); 

        if (date && new Date(date) < new Date()) {
            throw new Error("A data do evento não pode ter passado.");
        }

        if (date && isNaN(date.getTime())) {
            throw new Error("Data inválida.");
        }
    
        if (eventDate < today) {
            throw new Error("A data do evento não pode ter passado.");
        }

    
        this.props.date = date;
    }

    public set schedule(schedule: string) {
        const scheduleRegex = /^\d{2}:\d{2} - \d{2}:\d{2}$/; 
        if (!scheduleRegex.test(schedule)) {
            throw new Error("O horário informado é inválido. Use o formato HH:MM - HH:MM.");
        }
        this.props.schedule = schedule;
    }
    

    public set price(price: number) {
        if (price < 0) {
            throw new Error("O valor do evento não pode ser negativo.");
        }
        this.props.price = price;
    }

    public set ticket(ticket: string) {
        if (!ticket || ticket.trim().length === 0) {
            throw new Error("O ticket é obrigatório.");
        }
        this.props.ticket = ticket;
    }

    public set image(value: Buffer | undefined) {
        this.props.image = value;
    }
    

    public set status(status: boolean) {
        this.props.status = status;
    }

    
}
