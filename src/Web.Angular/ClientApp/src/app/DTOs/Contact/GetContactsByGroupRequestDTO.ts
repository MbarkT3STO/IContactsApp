export class GetContactsByGroupRequestDTO {
  groupId: number;
  userId: string;

  constructor(groupId: number, userId: string) {
    this.groupId = groupId;
    this.userId = userId;
  }
}
