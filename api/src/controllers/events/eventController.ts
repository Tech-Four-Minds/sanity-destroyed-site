import multer from "multer";
import { Request, Response } from "express";
import { PrismaEventRepository } from "../../infra/repository/event-repository/prisma-event-repository";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

export class EventController {
    private eventGateway: PrismaEventRepository;

    constructor() {
        this.eventGateway = new PrismaEventRepository();
    }

    /**
     * @swagger
     * /events:
     *   post:
     *     summary: Cria um novo evento.
     *     security:
     *       - Auth: []
     *     description: Adiciona um novo evento ao banco de dados.
     *     tags:
     *       - Eventos
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Eventos'  
     *     responses:
     *       201:
     *         description: Evento criado com sucesso.
     *       400:
     *         description: Erro na criação do evento.
     *       500:
     *         description: Erro interno no servidor.
     */
    async createEvent(req: Request, res: Response): Promise<void> {
        upload(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: "Erro no upload da imagem." });
            }
    
            const { name, location, date, schedule, price, ticket, status } = req.body;
            const imageBuffer = req.file?.buffer;
            const priceFloat = parseFloat(price);
    
            const eventData = {
                name,
                location,
                date,
                schedule,
                price: priceFloat,
                ticket,
                status,
                image: imageBuffer || undefined,  
            };
    
            try {
                const event = await this.eventGateway.createEvent(eventData);
                res.status(201).json(event);
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                } else {
                    return res.status(500).json({ error: "Erro interno no servidor." });
                }
            }
        });
    }
    
    /**
     * @swagger
     * /events:
     *   get:
     *     summary: Lista todos os eventos.
     *     tags:
     *       - Eventos
     *     responses:
     *       200:
     *         description: Lista de eventos retornada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Eventos'
     *       400:
     *         description: Erro ao listar os eventos.
     *       500:
     *         description: Erro interno no servidor.
     */
    async listEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await this.eventGateway.listEvents();

            const eventsWithBase64Images = events.map(event => ({
                ...event,
                date: event.date ? new Date(event.date).toLocaleDateString('pt-BR') : null, 
                imageSizeKB: event.image ? (event.image.length / 1024).toFixed(2) + " KB" : "0 KB",
                image: event.image ? `data:image/jpg;base64,${Buffer.from(event.image).toString("base64")}` : null
            }));

            res.status(200).json(eventsWithBase64Images);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    }

    /**
     * @swagger
     * /events/{id}:
     *   get:
     *     summary: Busca um evento por ID.
     *     tags:
     *       - Eventos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do evento.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Evento retornado com sucesso.
     *       404:
     *         description: Evento não encontrado.
     *       400:
     *         description: Erro ao buscar o evento.
     *       500:
     *         description: Erro interno no servidor.
     */
    async getEventById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const event = await this.eventGateway.getEventById(id);
            if (event) {
                res.status(200).json({
                    ...event,
                    date: event.date ? new Date(event.date).toLocaleDateString('pt-BR') : null, 
                    imageSizeKB: event.image ? (event.image.length / 1024).toFixed(2) + " KB" : "0 KB",
                    image: event.image ? `data:image/jpeg;base64,${Buffer.from(event.image).toString("base64")}` : null
                });
            } else {
                res.status(404).json({ error: "Evento não encontrado" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    }

    /**
     * @swagger
     * /events/{id}:
     *   put:
     *     summary: Atualiza um evento existente.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Eventos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do evento.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Eventos'
     *     responses:
     *       200:
     *         description: Evento atualizado com sucesso.
     *       400:
     *         description: Erro ao atualizar o evento.
     *       404:
     *         description: Evento não encontrado.
     *       500:
     *         description: Erro interno no servidor.
     */
    async updateEvent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
        const imageBuffer = req.file?.buffer;
    
        const price = data.price ? parseFloat(data.price) : undefined;
    
        const updatedData = {
            ...data,
            price: price, 
            image: imageBuffer || data.image,  
        };
    
        try {
            const updatedEvent = await this.eventGateway.updateEvent(id, updatedData);
            res.status(200).json(updatedEvent);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    };
    
    
    /**
     * @swagger
     * /events/{id}:
     *   delete:
     *     summary: Deleta um evento por ID.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Eventos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do evento.
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Evento deletado com sucesso.
     *       400:
     *         description: Erro ao deletar o evento.
     *       404:
     *         description: Evento não encontrado.
     *       500:
     *         description: Erro interno no servidor.
     */
    async deleteEvent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.eventGateway.deleteEvent(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    }
}
