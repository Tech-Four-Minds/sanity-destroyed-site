import { Event } from "../entity/event";

try {
    const event = Event.create(
        "Festa do Rock",
        "Parque Dona Lindu",
        new Date("2024-12-31"),
        "20:00",
        200.0,
        "ingressos.com",
        true

    );
    console.log("Evento criador com sucesso: ", event)
} catch (error) {
    console.error("Error ao criar o evento: ", error)
}