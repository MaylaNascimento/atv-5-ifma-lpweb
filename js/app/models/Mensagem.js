class Mensagem {

    constructor(texto='', provider ) {
        this._texto = texto;
        this._provider = provider;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto ) {
        this._texto = texto;
    }

    send(status, message = '') {
        this._provider.fire({
             icon: status,
             title: message || this._texto
        })
    }
}
