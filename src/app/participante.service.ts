import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Participante {
  id: Number,
  name: String,
  secret: String,
  idTeam: Number,
  idEvent: Number
}

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  constructor(private http: HttpClient) { }

  public async getParticipante(id: Number, secret: String): Promise<Participante> {
    return await this.http.get<Participante>(environment.apiUrl + `/public/participant/${id}?secret=${secret.toUpperCase}`)
    .toPromise();
  }

  public async randomEquipeParti(id: Number, secret: String): Promise<Participante> {
    return await this.http.post<Participante>(environment.apiUrl + `/public/participant/${id}/random?secret=${secret.toUpperCase}`, null)
    .toPromise();
  }
}
