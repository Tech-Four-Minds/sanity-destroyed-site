import { Event } from "../entity/event";

import { Product  } from "../entity/products";

try {
    const event = Event.create(
        "Festa do Rock",
        "Parque Dona Lindu",
        new Date("2024-12-31"),
        "20:00",
        200.0,
        "ingressos.com",
        true,
        "imagem-evento.jpg"

    );
    console.log("Evento criador com sucesso: ", event)
} catch (error) {
    console.error("Error ao criar o evento: ", error)
}

try {
    const product = Product.create(
        "Camisa Rock",
        50,
        "Camisa",
        "M",
        10,
        "imagem-evento.jpg"

    );
    
    console.log("Produto criado com sucesso:", product);
    console.log("Nome do produto: ", product.name);
    console.log("Valor do produto: ", product.price);
    console.log("Quantidade do produto: ", product.quantity);
    console.log("Tipo do produto: ", product.type);
    console.log("Tamanho do produto: ", product.size);

        
    product.addQuantity(5);
    console.log(`Nova quantidade: ${product.quantity}`);

    
    product.removeQuantity(3);
    console.log(`Quantidade após remoção: ${product.quantity}`); 

    
    console.log(`Preço total: ${product.calculateTotalPrice()}`); 

    product.applyDiscount(50);
    console.log(`Preço com desconto: ${product.price}`); 
    
} catch (error) {
    console.error("Error ao criar o produto", error);
}