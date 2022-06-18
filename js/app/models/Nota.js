class Nota {

    constructor(periodo, nota) {
        this._periodo = periodo;
        this._valor = nota.value;
    }

    get periodo() {
        return this._periodo;
    }

    get valor() {
        return this._valor;
    }
}