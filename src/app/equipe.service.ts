import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Equipe {
  id: Number,
  verified: Boolean,
  score: Number,
  secret: String,
  participants: String[],
  groupId: Number,
  name: String,
  eventId: Number
}

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }

  public async getEquipe(id: Number, secret: String): Promise<Equipe> {
    if (secret != null) {
      return await this.http.get<Equipe>(environment.apiUrl + `/public/teams/${id}?secret=${secret.toUpperCase}`)
        .toPromise();
    } else {
      return await this.http.get<Equipe>(environment.apiUrl + `/public/teams/${id}`)
        .toPromise();
    }
  }

  public async randomGrupo(id: Number, secret: String): Promise<Equipe> {
    return await this.http.post<Equipe>(environment.apiUrl + `/public/teams/${id}/random?secret=${secret.toUpperCase}`, null)
    .toPromise();
  }
}
