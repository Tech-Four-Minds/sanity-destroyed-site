import crypto from "crypto";

export type EventProps = { 
    id: string;
    name: string;
    location: string;
    date: Date;
    schedule: string;
    price: number;
    ticket?: string;
    status: boolean;
    image?: string;
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
        image?: string
    ): Event {
        if (new Date(date) < new Date()) {
            throw new Error("A data do evento não pode ter passado.");
        }
        return new Event({
            id: crypto.randomUUID().toString(),
            name,
            location,
            date,
            schedule,
            price,
            ticket,
            status,
            image
        })
    }


    public get id(): string {
        return this.props.id;
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

    public get image(): string | undefined {
        return this.props.image;
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

    public set schedule(schedule: string) {
        if (isNaN(Date.parse(schedule))) {
            throw new Error("O horário informado é inválido.");
        }
        this.props.schedule = schedule;
    }

    public set price(price: number) {
        if (price < 0) {
            throw new Error("O valor do evento não pode ser negativo.");
        }
        this.props.price = price;
    }

    public set status(status: boolean) {
        this.props.status = status;
    }

    
}
