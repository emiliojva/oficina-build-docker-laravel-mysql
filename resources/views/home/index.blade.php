@extends('layouts.emuseu')

@section('title')
    Página Inicial
@endsection

@section('content')

    <style rel="stylesheet">

        body {
            background-image: url({{ $urlBase }} 'resources/images/background/photo-1549764206-048e4d403417.jpg');
            /*background-image: url(https://images.unsplash.com/photo-1549764206-048e4d403417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80);*/
            background-attachment: fixed;
            background-size: cover;
        }

        .fodasse {
            object-position: 100% 0% !important;
            object-fit: initial !important;
        }

    </style>

    <section id="slide">

        <div id="slideInicial" class="carousel slide" data-ride="carousel">

            <div class="carousel-inner">

                <!--            <div class="item">-->
                <!--                <img class="d-block w-100" src="--><?php //echo $template_url ?><!--/images/main1.png">-->
                <!--            </div>-->

                <div class="item active">
                    <img class="d-block w-100 fodasse" src="{{ $urlBase }}resources/images/carrossel-background/1.jpg"/>
                    <!--                <img class="d-block w-100" src="--><?php //echo $template_url ?><!--images/carrossel/banner3.png">-->
                </div>

                <div class="item">
                    <img class="d-block w-100 fodasse" src="{{ $urlBase }}resources/images/carrossel-background/2.jpg"/>
                </div>

                <div class="item">
                    <img class="d-block w-100 fodasse" src="{{ $urlBase }}resources/images/carrossel-background/3.jpg" />
                </div>

                <div class="item">
                    <img class="d-block w-100 fodasse" src="{{ $urlBase }}resources/images/carrossel-background/4.jpg" />
                </div>

                <!--            <div class="item">-->
                <!--                <img class="d-block w-100" src="--><?php //echo $template_url ?><!--images/carrossel/05.jpg">-->
                <!--            </div>-->


                <!--            <div class="item">-->
                <!--                <img src="--><?php //echo $template_url ?><!--/images/bask1.jpg">-->
                <!--            </div>-->

                <!--            <div class="item">-->
                <!--                <img src="--><?php //echo $template_url ?><!--/images/bask3.jpg">-->
                <!--            </div>-->
                <!---->
                <!--            <div class="item">-->
                <!--                <img src="--><?php //echo $template_url ?><!--/images/bask4.jpg">-->
                <!--            </div>-->
                <!---->
                <!--            <div class="item">-->
                <!--                <img src="--><?php //echo $template_url ?><!--/images/main1.png">-->
                <!--            </div>-->



            </div>

            <a href="#slideInicial" class="arrow-slide left" data-slide="prev">
                <img src="{{ $urlBase }}resources/images/paginacao_esquerda.png" alt="">
                <i class="fas fa-chevron-circle-left"></i>
            </a>

            <a href="#slideInicial" class="arrow-slide right" data-slide="next">
                <img src="{{ $urlBase }}resources/images/paginacao_direita.png" alt="">
                <i class="fas fa-chevron-circle-right"></i>
            </a>

        </div>



    </section>
    <section id="ranking" class="ranking">
        <a onclick="slideInicial.prev()" class="before">
            <i class="fas fa-chevron-left"></i>
        </a>
        <a onclick="slideInicial.next()" class="next">
            <i class="fas fa-chevron-right"></i>
        </a>
        <div class="scroll-card">
            <ul id="slide_inicial">
                <li onclick='window.location.href = "{{ $urlBase }}perfil/atleta/magic"' style="cursor: pointer">
                    <!--                <img src="--><?php //echo $template_url ?><!--/images/basquete_bg.jpg" alt="" class="rank-bg">-->
                    <img src="{{ $urlBase }}resources/images/cards-atletas/card-magic-paula.jpg" alt="" class="rank-bg">
                    <span class="fill-green"></span>
                    <section>
                        <article class="rank-avatar">
                            <!--                        <img src="--><?php //echo $template_url ?><!--images/basquete_bg.jpg" alt="" width="50px">-->
                        </article>
                        <article class="rank-info">
                            <p>Magic Paula</p>
                            <span>Prata Atlanta 1996</span>
                        </article>
                    </section>
                    <article class="rank-share">
                        <a href="#">
                            <img src="{{ $urlBase }}resources/images/share.png" alt="">
                        </a>
                    </article>
                </li>
                <li onclick='window.location.href = "{{ $urlBase }}perfil/atleta/norminha"' style="cursor: pointer">
                    <img src="{{ $urlBase }}resources/images/cards-atletas/card-norminha.jpg" alt="" class="rank-bg" style="object-position: 100% 2%;">
                    <span class="fill-green"></span>
                    <section>
                        <article class="rank-avatar">
                            <!--                        <img src="--><?php //echo $template_url ?><!--images/basquete_bg.jpg" alt="" width="50px">-->
                        </article>
                        <article class="rank-info">
                            <p>Norminha</p>
                            <span>Medalha de bronze Mundial Feminino 1971</span>
                        </article>
                    </section>
                    <article class="rank-share">
                        <a href="#">
                            <img src="{{ $urlBase }}resources/images/share.png" alt="">
                        </a>
                    </article>
                </li>
                <li onclick='window.location.href = "{{ $urlBase }}perfil/atleta/paulinho"' style="cursor: pointer">
                    <img src="{{ $urlBase }}resources/images/cards-atletas/card-paulinho-villas-boas.jpg" alt="" class="rank-bg" style="object-position: 100% 17%;">
                    <span class="fill-green"></span>
                    <section>
                        <article class="rank-avatar">
                            <!--                        <img src="--><?php //echo $template_url ?><!--images/basquete_bg.jpg" alt="" width="50px">-->
                        </article>
                        <article class="rank-info">
                            <p>Paulinho Villas Boas</p>
                            <span>Medalha de ouro nos Jogos Pan-Americanos</span>
                        </article>
                    </section>
                    <article class="rank-share">
                        <a href="#">
                            <img src="{{ $urlBase }}resources/images/share.png" alt="">
                        </a>
                    </article>
                </li>
                <li onclick='window.location.href = "{{ $urlBase }}perfil/atleta/wlamir"' style="cursor: pointer">
                    <img src="{{ $urlBase }}resources/images/cards-atletas/card-wlamir.jpg" alt="" class="rank-bg" style="object-position: 100% 0%;">
                    <span class="fill-green"></span>
                    <section>
                        <article class="rank-avatar">
                            <!--                        <img src="--><?php //echo $template_url ?><!--images/basquete_bg.jpg" alt="" width="50px">-->
                        </article>
                        <article class="rank-info">
                            <p>Wlamir Marques</p>
                            <span>Campeonato Mundial 59 e 63</span>
                        </article>
                    </section>
                    <article class="rank-share">
                        <a href="#">
                            <img src="{{ $urlBase }}resources/images/share.png" alt="">
                        </a>
                    </article>
                </li>

            </ul>
        </div>

    </section>

@endsection