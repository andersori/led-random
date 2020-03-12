import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Grupo {
  id: Number,
  eventId: Number,
  name: String
}

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }
}
