/**
 * Emula a funcao window.confirm() mas utilizando o modal Bootstrap
 * Chama modal e retorna uma closure com resposta true(sim) ou false(nao)
 * HTML do MOdal precisa constar com id mi-modal no HTML Body
 * @param callback
 */
function modalConfirm(callback) {

    $("#mi-modal").modal('show');

    var $this = this;

    $("#modal-btn-si").on("click", function (e) {
        e.stopImmediatePropagation();
        callback.apply($this,[true]);
        $("#mi-modal").modal('hide');
    });

    $("#modal-btn-no").on("click", function (e) {
        e.stopImmediatePropagation();
        callback.apply($this,[false]);
        $("#mi-modal").modal('hide');
    });

}
