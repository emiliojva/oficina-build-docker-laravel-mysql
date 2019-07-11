/**
 * Pega li via ajax, preechida de acordo com data-id, contido na ancora passada por parametro
 * @param setaDOMAnchor
 * @returns {boolean}
 */
function irParaPremio(setaDOMAnchor) {

    init();

    function init() {

        $(setaDOMAnchor).off('click');
        // remover fake

        // adicionar bloco li FAKE para preenchimento do CSS. Caso array esteja vazio
        if ($('.bloco-evento').length == 0) {

            // fake li para criar altura padrao do quadro de premios
            $('ul#evento-ajax-add').html('<li class="bloco-evento" data-anterior="" data-proximo="" id="premio_fake" style="width: 1082.2px; min-height: 400px"></li>');

            // force resize correct width: max-content
            window.dispatchEvent(new Event('resize'));

        }

        var direcao = setaDOMAnchor.dataset.direcao;
        var id = setaDOMAnchor.dataset.id;

        // se nao tem id bloqueia a acao
        if (!setaDOMAnchor.dataset.id) {
            direcionar(artigoSlide(direcao));
            return false;
        }

        // verificar se o premio ja foi adicionado por ajax
        var premioDOMID = document.getElementById('premio_' + id);

        // remove todas as classes ativas com a chega de uma nova li
        $('.bloco-evento-ativo').removeClass('bloco-evento-ativo');


        // Li com Premio ja foi adicionado ao DOM. Nao carregar ajax novamente
        if (premioDOMID) {

            // diretiona para artigo existente e guardo retorno
            var divScroll = artigoSlide(direcao);

            // atribuo como artigo ativo
            $(divScroll).addClass('bloco-evento-ativo');

            direcionar(divScroll);

            return false;

        } else {

            // carregar premio por ajax Promise
            loadPremio(id).then(htmlResult => {

                $('#premio_fake').remove();

                // direcionar inclusao da Li para antes da atual. Para que respeite a ordem de retorno da api.
                if (direcao == "before") {
                    $('#evento-ajax-add').prepend(htmlResult);
                }


                // direcionar inclusao da Li para fim da fila
                if (direcao == "after") {
                    $('#evento-ajax-add').append(htmlResult);

                }

                // dispara evento de resize para corrigir bugs com css usando propriedade max-content no width/height
                window.dispatchEvent(new Event('resize'));


                if (direcao == "after")
                    artigoSlide(direcao);


                var slideAtual = $('.bloco-evento-ativo');
                direcionar(slideAtual);


            });

        }
    }

    function loadPremio(premio_id) {

        if (!premio_id) {
            return false;
        }

        $('#loader-wrapper').show();

        return new Promise((resolve, reject) => {

            var url = window.appUrl + 'api/midias/premio/' + premio_id;

            $.get(url, function (htmlResult) {
                resolve(htmlResult);
            });

        });


    }

    function direcionar(slideAtual) {

        if($('#premio_anterior')[0] !=undefined){
            var id_anterior = $(slideAtual).data('anterior');
            var id_proximo = $(slideAtual).data('proximo');

            $('#premio_anterior')[0].dataset.id = id_anterior;
            $('#premio_proximo')[0].dataset.id = id_proximo;

        }

        $('#loader-wrapper').hide();
    }

}