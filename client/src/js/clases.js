export class Usuario {
    constructor(id, token, abilitie, foto){
        this.id = id;
        this.token = token;
        this.abilitie = btoa(abilitie);
        this.foto = foto;
    }
}

