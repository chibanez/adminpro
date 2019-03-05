
export class Usuario {
    // Definiendo todos los atributos en el constructor me ahorro definir las variables
    constructor (
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}
