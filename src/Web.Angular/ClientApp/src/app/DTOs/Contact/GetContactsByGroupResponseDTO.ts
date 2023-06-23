import { GetContactsByGroupResponseContactDTO } from "./GetContactsByGroupResponseContactDTO";

export class GetContactsByGroupResponseDTO {

  public id: number=0;
  public name: string='';
  public description: string = '';

  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public userId: string = '';

  public contacts: GetContactsByGroupResponseContactDTO[] = [];
}
