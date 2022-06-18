class AvaliacaoController {

    constructor() {
        let messageProvider = Swal.mixin({
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        // model
        this._avaliacao = new Avaliacao();

        // view
        this._avaliacaoView = new AvaliacaoView(document.querySelector('#js-avaliacaoView'));
        this._mensagem = new Mensagem('', messageProvider);
    }

    calculaMedia(event ) {
        debugger;
        event.preventDefault();

        this._avaliacao.adiciona(new Nota(PeriodoEnum.PRIMEIRO, document.querySelector('#primeira-nota')));
        this._avaliacao.adiciona(new Nota(PeriodoEnum.SEGUNDO, document.querySelector('#segunda-nota')));
        this._avaliacao.adicionaFrequencia(new Frequencia(document.querySelector("#frequencia")))

        this._avaliacao.calculaNota();

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.REPROVADO_POR_FALTA.toString()) {
            this._mensagem.send('error', 'Aluno reprovado por falta!');
            return;
        }

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.FINAL.toString()) {
            this._mensagem.send('warning', 'Aluno ficou para avaliação final!');
            return;
        }

        this._limpaFormulario();


        this._mensagem.texto = `Item ${item.nome} foi adicionado com sucesso.`;
        this._mensagemView.update(this._mensagem );
    }

    _validaCampos(terceira = false) {
        let primeiraNota = new Number($('#primeira-nota').value),
            segundaNota = new Number($('#segunda-nota').value);

        if (primeiraNota.valueOf() >= 0 || segundaNota.valueOf() >= 0) {
            this._mensagem._texto = 'Por favor digite as notas corretamente';
            this._mensagem.send('error');
        }

        if (terceira && new Number($('#segunda-nota').value).valueOf() >= 0) {

        }
    }

    _limpaFormulario() {
        this._inputNome.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '';

        this._inputNome.focus();
    }
}