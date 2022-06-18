class AvaliacaoView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(avaliacao) {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>Média Parcial</th>
                    <th>Resultado</th>
                    <th>SUBTOTAL</th>
                </tr>
            </thead>

            <tbody>
                ${avaliacao._notas.map(nota => `

                    <tr>
                        <td>${item.nome}</td>
                        <td>${item.quantidade}</td>
                        <td>${item.valor}</td>
                        <td>${item.subTotal}</td>
                    </tr>

                `).join('')}
            </tbody>

           <tfoot>
                <td colspan="3"></td>
                <td>
                    ${pedido.itens.reduce((total, item) =>
                        total + item.subTotal, 0.0)}
                </td>
            </tfoot>

        </table>
        `;
    }

    update(avaliacao ) {
        this._elemento.innerHTML =
                      this._template(avaliacao );
    }
}
