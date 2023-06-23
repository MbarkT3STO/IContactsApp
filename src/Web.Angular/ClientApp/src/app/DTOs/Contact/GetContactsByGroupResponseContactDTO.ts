export class GetContactsByGroupResponseContactDTO {
  public id: number       = 0;
  public name: string     = '';
  public email: string    = '';
  public phone: string    = '';
  public address: string  = '';
  public country: string  = '';
  public city: string     = '';
  public state: string    = '';
  public company: string  = '';
  public jobTitle: string = '';
  public imageUrl: string = '';
  public notes: string    = '';
  public groupId: number  = 0;

  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public userId: string  = '';
}
