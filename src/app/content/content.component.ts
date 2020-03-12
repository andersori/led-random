import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  participanteIdFormGroup: FormGroup;
  participanteSecretFormGroup: FormGroup;

  equipeUsernameFormGroup: FormGroup;
  equipeSecretFormGroup: FormGroup;

  legenda: String = "Olá mundo!";

  infoParticipante: String = "Clique aqui e forneça seus dados";
  infoEquipe: String = "Clique aqui e forneça seus dados";

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.participanteIdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.participanteSecretFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.equipeUsernameFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.equipeSecretFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
