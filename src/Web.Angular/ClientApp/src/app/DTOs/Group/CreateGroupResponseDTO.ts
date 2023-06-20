export class CreateGroupResponseDTO {
  id         : number;
  name       : string;
  description: string;
  userId     : string;

  createdAt: Date;
  updatedAt: Date;

  contactsCount: number = 0;

  constructor(
    id            : number = 0,
    name          : string = '',
    description   : string = '',
    userId        : string = '',
    createdAt     : Date   = new Date(),
    updatedAt     : Date   = new Date(),
    contactsCount: number  = 0
  ) {
    this.id          = id;
    this.name        = name;
    this.description = description;
    this.userId      = userId;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.contactsCount = contactsCount;
  }
}
