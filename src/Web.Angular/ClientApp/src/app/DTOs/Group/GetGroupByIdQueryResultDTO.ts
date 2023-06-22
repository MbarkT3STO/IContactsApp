export class GetGroupByIdQueryResultDTO {

  public id: number;
  public name: string;
  public description: string;
  public contacts: { id: number, name: string, imageUrl: string }[];

  constructor()
  {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.contacts = [];
  }
}
