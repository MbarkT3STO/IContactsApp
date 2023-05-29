export class ViewContactResponseDTO {
  public name     : string;
  public email    : string;
  public phone    : string;
  public address  : string;
  public country  : string;
  public city     : string;
  public state    : string;
  public company  : string;
  public jobTitle : string;
  public imageUrl : string;
  public imageFile: File | null;
  public notes    : string;
  public groupId  : number;
  public userId   : string;

  constructor() {
    this.name      = '';
    this.email     = '';
    this.phone     = '';
    this.address   = '';
    this.country   = '';
    this.city      = '';
    this.state     = '';
    this.company   = '';
    this.jobTitle  = '';
    this.imageUrl  = '';
    this.imageFile = null;
    this.notes     = '';
    this.groupId   = 0;
    this.userId    = '';
  }
}
