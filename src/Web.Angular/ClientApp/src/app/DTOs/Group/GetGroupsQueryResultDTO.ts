export class GetGroupsQueryResultDTO {
  id: number = 0;
  name: string = '';
  description: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  userId: string = '';
  contactsCount:number = 0;
}
