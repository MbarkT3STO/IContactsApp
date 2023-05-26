import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateContactRequestDTO } from 'src/app/DTOs/Contact/CreateContactRequestDTO';
import { CreateContactResponseDTO } from 'src/app/DTOs/Contact/CreateContactResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = 'http://localhost:5272/api/Contacts';

  constructor(private http: HttpClient) {}

  /**
   * Creates a new contact
   * @param request The request object
   * @returns The response object as an observable
   **/
  public Create(
    request: CreateContactRequestDTO
  ): Observable<CreateContactResponseDTO> {
    return this.http.post<CreateContactResponseDTO>(this.apiUrl, request);
  }

  /**
   * Creates a new contact from a form data object (used for file upload)
   * @param request The request object
   * @returns The response object as an observable
   **/
  public CreateFromForm(
    request: FormData
  ): Observable<CreateContactResponseDTO> {
    return this.http.post<CreateContactResponseDTO>(this.apiUrl, request);
  }
}
