export class DeleteContactRequest {
  public id: number;
  public userId: string;

  constructor(id: number = 0, userId: string = '') {
    this.id = id;
    this.userId = userId;
  }
}
