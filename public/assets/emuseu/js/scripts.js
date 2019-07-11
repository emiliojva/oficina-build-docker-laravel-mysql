window.addEventListener('load',function(){

    // $('footer').removeAttr('style');
    // window.appUrl
    var url = window.appUrl + 'register/loginAjax';

    $('#btn-login-base').click((e)=>{
        e.preventDefault();
        $('#form-login').submit();

    })

    // login
    $('#form-login').submit(function(e){

        $('#loader-wrapper').show();

        e.preventDefault();

        var data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: (data)=>{

                if(data.success){
                    window.location.href = window.appUrl + 'dashboard';
                    // window.location.reload();
                } else {

                    $('#loader-wrapper').hide();
                    alert('Erro de Login');
                    this.error();
                }

                $('#loader-wrapper').hide();

            }
            //,dataType: dataType
        })

    });


});



function adjustbody(){
    let menuResp = $('#menu-responsivo')[0];
    let bodyContent = $("#body");

    bodyContent.css('padding-top',menuResp.clientHeight+5+'px');
    console.log(menuResp.clientHeight);
}
function adjustfooter(){
    let footer_height = $('#footer-wrapper').innerHeight() - 15;
    console.log(footer_height);
    $('#wrapper').css('padding-bottom', footer_height + 'px');
}
$(window).load(()=>{
    adjustfooter();
    adjustbody();

});

$(window).resize(function(){
    adjustbody()
    adjustfooter();
});




function ButtonToggle(div){
    // ButtonToggle.mostrar('csa');
    $('.slick-active').removeClass('slick-active'); // remove todos os classes slick-active



    if(div == 'fade'){
        $("#cortina-menu").css('display','none');
    }else{
        var element = document.getElementById(div);
        var elementC = document.getElementsByTagName("slick-active");

        if(element.classList.contains("slick-active")){
            element.classList.toggle("slick-active",false);
        }else{
            element.classList.toggle("slick-active",true);
        }
        $("#cortina-menu").css('display','block');
    }


}


function SlideHorizontal(id){
    this.id = id;
    this.position = 0;
    this.card = $(id+' ul li');
    this.scroll = $(id+' .scroll-card');
}
SlideHorizontal.prototype.next = function(){
    console.log(this.scroll);
    if(this.position < this.card.length-1){
        this.position++
        this.scroll.scrollLeft(this.card[this.position].offsetLeft);
    }

}
SlideHorizontal.prototype.prev = function(){
    if(this.position > 0){
        this.position--;
        if(this.position <= 0){
            this.scroll.scrollLeft(0);
        }else{
            this.scroll.scrollLeft(this.card[this.position].offsetLeft,0);
        }

    }
}

slideInicial = new SlideHorizontal('#ranking');

slidePerfil = new SlideHorizontal('#perfil-atletasRelacionados');

slideAtletas = new SlideHorizontal('#atletas-mais-vistos');

slideEsportes = new SlideHorizontal('#esportes-mais-vistos');


/* Menu Responsivo */
function MenuResponsivo(){
    this.toggleMenu = false;
}

MenuResponsivo.prototype.chamar = function(x){

    this.toggleMenu =! this.toggleMenu;
    this.menuLateralWidth = $(x).width();
    if(this.toggleMenu == true){
        $('#menu-lateral').css({transform: "translateX(0%)",zIndex: "21"});
        $('#menu-responsivo .sandwich').css('margin-left',this.menuLateralWidth+20+'px');
        $('#menu-responsivo .sandwich').addClass('sandwich-active');
    }else{
        $('#menu-lateral').css('transform','translateX(-100%)');
        $('#menu-responsivo .sandwich').css('margin-left',20+'px');
        $('#menu-responsivo .sandwich').removeClass('sandwich-active')
    }
}
Menu = new MenuResponsivo();


function Modal(){

}



function chamarMediaDinamica(div,acao){

    // html interno da div clonado
    var htmlClone = $(div).html();

    // reposicao da div que funciona no layout
    $('#lightbox-premio').html(htmlClone);

    // facebook fit style force
    $('.img-lightbox > img').css('object-fit','contain');

    // chamar a mesma div com conteudo trocado
    let light = new Lightbox('#lightbox-premio');

    if(acao == 'show'){
        light.acao('mostrar');
    }else if(acao == 'hidden'){
        light.acao('ocultar');
    }
}


function chamarMedia(div,acao){
    let light = new Lightbox(div);
    if(acao == 'show'){
        light.acao('mostrar');
    }else if(acao == 'hidden'){
        light.acao('ocultar');
    }
}

function Lightbox(id){
    this.div = id;
}
Lightbox.prototype.acao = function(x){
    if(x == 'mostrar'){
        $(this.div).css("display", "flex").hide().fadeIn();
    }else if(x == 'ocultar'){
        $(this.div).fadeOut();
    }
}

