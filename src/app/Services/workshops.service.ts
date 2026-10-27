import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop } from '../Models/api.models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class WorkshopsService {
  private readonly http = inject(HttpClient);

  /** Public catalog: workshops that have not started, with their available seats. */
  list(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${API_URL}/workshops`);
  }
}
