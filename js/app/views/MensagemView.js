class MensagemView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(message) {

        return `
        <div class="alert alert-warning" role="alert">
             ${message}
        </div>
        `;
    }

    update(message ) {
        this._elemento.innerHTML =
                      this._template(message );
    }
}
