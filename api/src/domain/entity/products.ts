import crypto from "crypto";

export type ProductProps = {
    id: string
    name: string
    price: number
    type: string
    size: string
    quantity: number
    image?: string
}

export class Product {

    private constructor(private props: ProductProps){}

    public static create(
        name: string,
        price: number, 
        type: string, 
        size: string, 
        quantity: number,
        image?: string
    ): Product {

        if(!name || name.trim().length === 0){
            throw new Error("O nome do produto é obrigatório.");
        }
        if (price < 0) {
            throw new Error("O preço do produto não pode ser negativo.");
        }

        if(!type || type.trim().length === 0) {
            throw new Error("O tipo do produto é obrigatório.")
        }

        if(!type || size.trim().length === 0) {
            throw new Error("O tamanho do produto é obrigatório.");
        }
        if (quantity < 0 ) {
            throw new Error("A quantidade do produto não pode ser negativa.");
        }

        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            type,
            size,
            quantity,
            image

        });
    }

    public static with(props: ProductProps){
        return new Product(props);
    }
    
    public get id() {
        return this.props.id;
    }

    public get name(){
        return this.props.name;
    }

    public get price(){
        return this.props.price;
    }

    public get type(){
        return this.props.type;
    }
    
    public get size(){
        return this.props.size;
    }

    public get quantity(){
        return this.props.quantity
    }

    public set name(value: string) {
        if(!value || value.trim().length === 0){
            throw new Error("O nome do produto é obrigatório.");
        }
        this.props.name = value;
    }
    
    public set price(value: number) {
        if (value < 0) {
            throw new Error("O preço do produto não pode ser negativo.");
        }
        this.props.price = value;
    }

    public set size(value: string) {
        this.props.size = value;
    }

    public set quantity(value: number) {
        if (value < 0){
            throw new Error("A quantidade do produto não pode ser negativa.");
        }
        this.props.quantity = value;
    }

    public addQuantity(amount: number) {
        if (amount <= 0) {
            throw new Error("A quantidade a ser adicionada deve ser maior que zero.");
        }
        this.props.quantity += amount;
    }

    public removeQuantity(amount: number) {
        if(amount <=0) {
            throw new Error("A quantidade a ser removida deve ser maior que zero.");
        }
        if(this.props.quantity - amount < 0) {
            throw new Error("Não é possivel maais do que a quantidade disponivel.");
        }
        this.props.quantity -= amount;
    }

    public calculateTotalPrice(): number {
        return this.props.price * this.props.quantity
    }
    
    public applyDiscount(porcentage: number) {
        if (porcentage < 0 || porcentage > 100) {
            throw new Error("O desconto deve estar entre 0% e 100%.");
        }
        const discount = this.props.price * (porcentage / 100);
        this.props.price -= discount;
    }
}