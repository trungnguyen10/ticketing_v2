import express, { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { TicketDto } from '../Dtos/TicketDto';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res
    .status(200)
    .send(
      tickets.map(
        (t) => new TicketDto(t._id!.toString(), t.title, t.price, t.userId)
      )
    );
});

export { router as getTickets };
