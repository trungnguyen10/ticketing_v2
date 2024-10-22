export class TicketDto {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public userId: string
  ) {}
}
