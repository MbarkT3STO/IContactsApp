export class CreateContactResponseDTO {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public address: string;
  public country: string;
  public city: string;
  public state: string;
  public company: string;
  public jobTitle: string;
  public imageUrl: string;
  public notes: string;

  public groupId: number;
  public userId: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.country = '';
    this.city = '';
    this.state = '';
    this.company = '';
    this.jobTitle = '';
    this.imageUrl = '';
    this.notes = '';
    this.groupId = 0;
    this.userId = '';
  }
}
