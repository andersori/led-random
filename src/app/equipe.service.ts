import { Injectable } from '@angular/core';
import { Participante } from './participante.service';
import { HttpClient } from '@angular/common/http';

export interface Equipe {
  id: Number,
  verified: Boolean,
  score: Number,
  secret: String,
  participants: Participante[],
  groupId: Number,
  name: String,
  eventId: Number
}

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }
}
