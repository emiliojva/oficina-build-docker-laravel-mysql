$(document).ready(function(){
    ajustPage();
});

$(window).resize(function(){
    ajustPage();
});

function ajustPage(){
    var divWidth = $('#eventos').css('width');
    $('.bloco-evento').css('width',divWidth);
};


position = 0;
function artigoSlide(acao){
    // alert('oi');
    var itens = $('.eventos-itens ul .bloco-evento');
    var divScroll = $("#eventos");

    if(acao == 'after'){
        if(position < itens.length-1){
            position++;
            console.log(itens[position].offsetLeft);
            divScroll.scrollLeft(itens[position].offsetLeft);
        }else if(position >= itens.length-1){
            position = 0;
            divScroll.scrollLeft(0);
        }
    }else{
        if(position > 0){
            console.log(itens.length);
            position--;
            divScroll.scrollLeft(itens[position].offsetLeft);
            if(position <=0){
                divScroll.scrollLeft(0);
            }
        }else{
            position += itens.length-1;
            divScroll.scrollLeft(itens[position].offsetLeft);
        }
    }

    // retorna item na posicao atual
    return itens[position];
}
