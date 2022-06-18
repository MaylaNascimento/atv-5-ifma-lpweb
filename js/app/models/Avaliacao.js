class Avaliacao {

    constructor() {
        this._notas = [];
        this._frequencia = 0;
        this._resultado = 0;
    }

    get resultado() {
        return this._resultado
    }

    static get MEDIA () {
        return 70
    }

    static get STATUS () {
        return Object.freeze({
            APROVADO:   Symbol("Aprovado"),
            REPROVADO:  Symbol("Reprovado"),
            REPROVADO_POR_FALTA: Symbol("Reprovado por falta"),
            FINAL: Symbol('Pendente avaliação final')
        });
    }

    adiciona (item ) {
        if (!(item instanceof Nota)) {
            throw new TypeError("a nota adicionada precisa ser instancia de Notas");
        }
        this._notas.push(item);
    }

    adicionaFrequencia(valorFrequencia) {
        if (!(valorFrequencia instanceof Frequencia)) {
            throw new TypeError("a frequencia adicionada precisa ser instancia de Frequencia");
        }
        this._frequencia = valorFrequencia;
    }

    getNotas() {
       return [].concat(this._notas);
    }

    calculaNota() {
        if (!this._frequencia.frequenciaMinimaNecessaria()) {
            this._resultado = Avaliacao.STATUS.REPROVADO_POR_FALTA;
            return;
        }

        let mediaAluno = 0;
        this._notas.forEach((e) => mediaAluno += new Number(e._valor))

        if (mediaAluno < Avaliacao.MEDIA) {
            this._resultado = Avaliacao.STATUS.FINAL;
            return;
        }



    }
}