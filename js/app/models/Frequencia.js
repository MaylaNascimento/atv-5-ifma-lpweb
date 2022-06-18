class Frequencia {

    constructor(frequencia) {
        this._frequencia = frequencia.value;
    }

    static get MINIMA () {
        return 75;
    }

    get frequencia() {
        return this._frequencia;
    }

    frequenciaMinimaNecessaria() {
        return this._frequencia >= Frequencia.MINIMA;
    }

}