import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  public async getTeam(id: Number): Promise<Grupo> {
      return await this.http.get<Grupo>(environment.apiUrl + `/public/groups/${id}`)
        .toPromise();
    
  }
}
