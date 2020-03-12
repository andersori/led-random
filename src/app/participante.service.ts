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

  public getParticipante(id : Number, secret : String) : Participante {
    this.http.get<Participante>(environment.apiUrl + `public/participant/${id}?secret=${secret}`,  { responseType: 'text' as 'json' })
    .subscribe(data => {
      console.log(data);
    });
    return null;
  }
}
