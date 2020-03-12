import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Participante, ParticipanteService } from '../participante.service';
import { Equipe, EquipeService } from '../equipe.service';
import { Grupo, GrupoService } from '../grupo.service';

interface MSG {
  msg: String;
  time: number;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild('stepperParticipante') stepperParti;
  @ViewChild('stepperEquipe') stepperEquipe;

  participanteIdFormGroup: FormGroup;
  participanteSecretFormGroup: FormGroup;
  infoParticipante: String = "Clique aqui e forneça seus dados";
  msgParti: String = " ";
  erroParti: Boolean = false;
  expansionParti: Boolean = false;

  equipeIdFormGroup: FormGroup;
  equipeSecretFormGroup: FormGroup;
  infoEquipe: String = "Clique aqui e forneça seus dados";
  msgEquipe: String = " ";
  erroEquipe: Boolean = false;
  expansionEquipe: Boolean = false;

  participanteIsLoading: Boolean = false;
  equipeIsLoading: Boolean = false;

  legenda: String = "Olá mundo!";

  participante: Participante = null;
  equipe: Equipe = null;
  grupo: Grupo = null;

  constructor(private _formBuilder: FormBuilder, private participanteService: ParticipanteService, private equipeService: EquipeService, private grupoService: GrupoService) {
    this.participanteIdFormGroup = this._formBuilder.group({
      partiID: ['', Validators.required]
    });
    this.participanteSecretFormGroup = this._formBuilder.group({
      partiSecret: ['', Validators.compose([Validators.required, Validators.maxLength(6)])]
    });
    this.equipeIdFormGroup = this._formBuilder.group({
      equipeId: ['', Validators.required]
    });
    this.equipeSecretFormGroup = this._formBuilder.group({
      equipeSecret: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  public resetInfoParticipante() {
    this.legenda = "Olá mundo!";
    this.participante = null;
    this.equipe = null;
    this.grupo = null;
    this.infoParticipante = "Clique aqui e forneça seus dados";
    this.infoEquipe = "Clique aqui e forneça seus dados";
    this.stepperParti.reset();
  }

  public resetInfoEquipe() {
    this.equipe = null;
    this.infoEquipe = "Clique aqui e forneça seus dados";
    this.stepperEquipe.reset();
  }

  public requisitarEquipe() {
    this.expansionParti = false;

    const frases_iniciais: MSG[] = [
      { msg: '...', time: 1300 },
      { msg: 'Ummm!', time: 1500 },
      { msg: 'Parece que você não faz parte de uma casa ainda.', time: 1800 },
      { msg: 'Nem de uma equipe.', time: 2700 },
      { msg: 'Então deixe-me te analisar.', time: 2600 }
    ];

    let frases_do_chapeu: MSG[] = [
      { msg: 'Ahh..', time: 1000 },
      { msg: 'Muito bem.', time: 1600 },
      { msg: 'Certo. Muito bem.', time: 2000 },
      { msg: 'Já sei.', time: 1600 },
      { msg: 'Difícil. Muito difícil.', time: 2200 },
      { msg: 'Tem muita coragem, estou vendo.', time: 2600 },
      { msg: 'Tem uma mente nada má também.', time: 2600 },
      { msg: 'Tem talento, se tem.', time: 2000 },
      { msg: 'Possui uma sede de provar seu valor.', time: 2800 },
      { msg: 'Mas onde vou colocá-lo?.', time: 1900 },
      { msg: 'Sonserina não?', time: 1600 },
      { msg: 'A Sonserina iria ajudá-lo a alcançar essa grandeza.', time: 2600 },
    ];

    let maxMsgChapel = 5;
    ((context) => {
      function inicio(i) {
        if (i < frases_iniciais.length) {
          setTimeout(async function () {
            context.legenda = frases_iniciais[i].msg;
            console.log(context.legenda);
            await inicio(i + 1)
          }, frases_iniciais[i].time);
        } else if (maxMsgChapel >= 0) {
          ((context) => {
            async function chapel(time) {
              if (maxMsgChapel-- >= 0) {
                const index = Math.floor(Math.random() * frases_do_chapeu.length);

                setTimeout(async function () {
                  const timeOutMsg = frases_do_chapeu[index].time;
                  context.legenda = frases_do_chapeu[index].msg;
                  frases_do_chapeu.splice(index, 1);
                  console.log(frases_do_chapeu.length)
                  console.log(context.legenda);
                  await chapel(timeOutMsg);
                }, time);
              } else {
                setTimeout(async function () {
                  context.participante = await context.participanteService.randomEquipeParti(context.participante.id, context.participante.secret);
                  context.equipe = await context.equipeService.getEquipe(context.participante.idTeam, null);
                  context.grupo = await context.grupoService.getTeam(context.equipe.groupId);
                  context.infoEquipe = `Equipe ${context.equipe.name}`;
                  context.legenda = `Bem vindo a equipe ${context.equipe.name} e ao grupo ${context.grupo.name}`;
                }, time);
              }
            }
            chapel(frases_iniciais[i - 1].time)
          })(context)
        }
      }
      inicio(0)
    })(this)
  }

  public requisitarGrupo() {
    this.expansionEquipe = false;
  }

  public async verifyParticipant() {
    this.participanteIsLoading = true;

    const id: Number = this.participanteIdFormGroup.get('partiID').value;
    const secret: String = this.participanteSecretFormGroup.get('partiSecret').value;

    try {
      this.participante = await this.participanteService.getParticipante(id, secret);

      if (this.participante.idTeam != null) {
        this.equipe = await this.equipeService.getEquipe(this.participante.idTeam, null);
        this.grupo = await this.grupoService.getTeam(this.equipe.groupId);
        this.infoEquipe = `Equipe ${this.equipe.name}.`;
      }

      this.erroParti = false;
    } catch (e) {
      this.participante = null;
    }

    if (this.participante === null) {
      this.erroParti = true;
    }

    if (this.erroParti === false) {
      this.infoParticipante = `${this.participante.name} seja bem vindo.`;
      if (this.participante.idTeam === null) {
        this.msgParti = `Olá ${this.participante.name.split(' ')[0]}. Você ainda não faz parte de uma equipe. Requisite uma equipe.`
      } else {
        this.msgParti = `Você faz parte da equipe ${this.equipe.name}.`
        this.legenda = `Olá ${this.participante.name.split(' ')[0]}. Você faz parte da equipe ${this.equipe.name}.`
      }
    } else {
      this.msgParti = "Não foi possível determinar quem é você, verifique seu id e secret e tente novamente.";
    }

    this.participanteIsLoading = false;
  }

  public async verifyTeam() {
    this.equipeIsLoading = true;

    const id: Number = this.equipeIdFormGroup.get('equipeId').value;
    const secret: String = this.equipeSecretFormGroup.get('equipeSecret').value;

    try {
      this.equipe = await this.equipeService.getEquipe(id, secret);
      this.erroEquipe = false;
    } catch (e) {
      this.equipe = null;
    }

    if (this.equipe === null) {
      this.erroEquipe = true;
    }

    if (this.erroEquipe === false) {
      this.infoEquipe = `${this.equipe.name} seja bem vindo.`;
      if (this.equipe.groupId === null) {
        this.msgEquipe = `Olá ${this.equipe.name}. Você ainda não faz parte de um grupo. Requisite um grupo.`
      } else {
        this.msgEquipe = `Você faz parte do grupo tal.`
      }
    } else {
      this.msgEquipe = "Não foi possível determinar quem é você, verifique seu id e secret e tente novamente.";
    }

    this.equipeIsLoading = false;
  }

}
