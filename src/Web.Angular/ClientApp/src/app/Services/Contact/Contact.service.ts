import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable }                          from '@angular/core';
import { Observable }                          from 'rxjs';
import { Contact }                             from 'src/app/DTOs/Contact/Contact';
import { CreateContactRequestDTO }             from 'src/app/DTOs/Contact/CreateContactRequestDTO';
import { CreateContactResponseDTO }            from 'src/app/DTOs/Contact/CreateContactResponseDTO';
import { DeleteContactRequest }                from 'src/app/DTOs/Contact/DeleteContactRequest';
import { DeleteContactResponse }               from 'src/app/DTOs/Contact/DeleteContactResponse';
import { GetContactsByGroupRequestDTO }        from 'src/app/DTOs/Contact/GetContactsByGroupRequestDTO';
import { GetContactsByGroupResponseDTO }       from 'src/app/DTOs/Contact/GetContactsByGroupResponseDTO';
import { UpdateContactRequest }                from 'src/app/DTOs/Contact/UpdateContactRequest';
import { UpdateContactResponse }               from 'src/app/DTOs/Contact/UpdateContactResponse';
import { ViewContactResponseDTO }              from 'src/app/DTOs/Contact/ViewContactResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = 'http://localhost:5272/api/Contacts';

  constructor(private http: HttpClient) {}

  /**
   * Gets all contacts
   * @returns The response object as an observable
   * */
  public GetAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
  /**
   * Gets a contact by id
   * @param id The id of the contact
   * @returns The response object as an observable
   * */
  public Get(id: number): Observable<ViewContactResponseDTO> {
    return this.http.get<ViewContactResponseDTO>(this.apiUrl + '/' + id);
  }

  /**
   * Creates a new contact
   * @param request The request object
   * @returns The response object as an observable
   **/
  public Create(
    request: CreateContactRequestDTO
    )      : Observable<CreateContactResponseDTO> {
    return this.http.post<CreateContactResponseDTO>(this.apiUrl, request);
  }

  /**
   * Creates a new contact from a form data object (used for file upload)
   * @param request The request object
   * @returns The response object as an observable
   **/
  public CreateFromForm(
    request: FormData
    )      : Observable<CreateContactResponseDTO> {
    return this.http.post<CreateContactResponseDTO>(this.apiUrl, request);
  }

  /**
   * Gets all contacts by group
   * @param request The request object
   * @returns The response object as an observable of type {@link GetContactsByGroupResponseDTO}
   **/
  public GetContactsByGroup(request: GetContactsByGroupRequestDTO): Observable<GetContactsByGroupResponseDTO>{
    return this.http.post<GetContactsByGroupResponseDTO>(this.apiUrl + '/GetByGroup', request);
  }

  /**
   * Updates a contact
   * @param request The request object
   * @returns The response object as an observable of type {@link UpdateContactResponse}
   * */
  public Update(request: UpdateContactRequest): Observable<UpdateContactResponse>{
    return this.http.put<UpdateContactResponse>(this.apiUrl, request);
  }

  /**
   * Updates a contact from a form data object (used for image file upload)
   * @param request The request object
   * @returns The response object as an observable of type {@link UpdateContactResponse}
   * */
  public UpdateFromForm(request: FormData): Observable<UpdateContactResponse>{
    return this.http.put<UpdateContactResponse>(this.apiUrl, request);
  }

  /**
   * Deletes a contact
   * @param id The id of the contact
   * @returns The response object as an observable of type {@link DeleteContactResponse}
   * */
  public Delete(request: DeleteContactRequest): Observable<DeleteContactResponse> {

    return this.http.delete<DeleteContactResponse>(this.apiUrl + '/Delete/' + request.id+ '/' + request.userId);
  }
}
