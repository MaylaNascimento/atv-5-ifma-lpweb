class Avaliacao {

    constructor() {
        this._notas = [];
        this._frequencia = 0;
        this._resultado = Avaliacao.STATUS.EM_AVALIACAO;
    }

    get resultado() {
        return this._resultado
    }

    static get MEDIA () {
        return 7
    }

    static get MEDIA_FINAL () {
        return 5
    }

    static get MEDIA_REPROVA_DIRETO () {
        return 3
    }

    static get STATUS () {
        return Object.freeze({
            EM_AVALIACAO: Symbol("em avaliação"),
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

        let mediaAluno = 0, notaFinal = 0,  provaFinal = (this._resultado.toString() == Avaliacao.STATUS.FINAL.toString());
        this._notas.forEach((e) => {
            if (e.periodo != PeriodoEnum.FINAL) {
                mediaAluno += new Number(e._valor);
            } else {
                notaFinal = new Number(e._valor);
            }
        });

        let mediaFinal = (mediaAluno / 2);
        if (!provaFinal && mediaFinal < Avaliacao.MEDIA) {
            if (mediaFinal <= Avaliacao.MEDIA_REPROVA_DIRETO) {
                this._resultado = Avaliacao.STATUS.REPROVADO;
                return;
            }
            this._resultado = Avaliacao.STATUS.FINAL ;
            return;
        }

        mediaFinal = (mediaFinal + notaFinal) / 2;
        if (provaFinal && mediaFinal < Avaliacao.MEDIA_FINAL) {
            this._resultado =  Avaliacao.STATUS.REPROVADO;
        }

        this._resultado = Avaliacao.STATUS.APROVADO;
    }
}