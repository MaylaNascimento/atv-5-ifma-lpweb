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
        this._mensagemView = new MensagemView(document.querySelector('#js-mensagem-view'));
    }

    calculaMedia(event ) {
        event.preventDefault();

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.EM_AVALIACAO.toString()) {
            this._avaliacao.adiciona(new Nota(PeriodoEnum.PRIMEIRO, document.querySelector('#primeira-nota')));
            this._avaliacao.adiciona(new Nota(PeriodoEnum.SEGUNDO, document.querySelector('#segunda-nota')));
            this._avaliacao.adicionaFrequencia(new Frequencia(document.querySelector("#frequencia")))
        }

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.FINAL.toString()) {
            this._avaliacao.adiciona(new Nota(PeriodoEnum.FINAL, document.querySelector('#final-nota')));
        }

        this._avaliacao.calculaNota();

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.REPROVADO_POR_FALTA.toString()) {
            this._mensagem.send('error', `Aluno ${document.querySelector('#nome').value} reprovado por falta!`);
            this._limpaFormulario();
            return;
        }

        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.FINAL.toString()) {
            this._mensagem.texto = `Aluno ${document.querySelector('#nome').value} pendente de avalição final!`;
            this._mensagem.send('warning');
            this._mensagemView.update(this._mensagem.texto);
            document.querySelector('#form-nota-final').classList.remove('hidden');
            return;
        }


        if (this._avaliacao.resultado.toString() == Avaliacao.STATUS.REPROVADO.toString()) {
            this._mensagem.send('error', `Aluno ${document.querySelector('#nome').value} reprovado por nota!`);
            document.querySelector('#form-nota-final').classList.add('hidden');
            this._limpaFormulario();
            return;
        }

        this._mensagem.send('success', `Aluno ${document.querySelector('#nome').value} aprovado!!`);

        this._limpaFormulario();

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
        document.querySelector('#nome').value = '';
        document.querySelector('#primeira-nota').value = '0';
        document.querySelector('#segunda-nota').value = '0';
        document.querySelector('#frequencia').value = '0';
        document.querySelector('#final-nota').value = '0';
        document.querySelector('#nome').focus();
        this._avaliacao = new Avaliacao();
        this._avaliacaoView = new AvaliacaoView(document.querySelector('#js-avaliacaoView'));
        this._mensagem = new Mensagem('', messageProvider);
        this._mensagemView = new MensagemView(document.querySelector('#js-mensagem-view'));
    }
}