<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>@yield('title')</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Open Graph-->
    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:type" content="">
    <meta property="og:url" content="http://emuseu.com.br">
    <meta property="og:title" content="e-Museu Nacional">
    <meta property="og:site_name" content="e-Museu Nacional">
    <meta property="og:description" content="e-Museu Nacional do Esporte">
    <meta property="og:image" content="{{ $urlBase }}resources/libs/images/og-image.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="200">
    <meta property="og:image:height" content="49">

    <!--    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700|Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">-->
    <link href="{{ $urlBase }}resources/libs/fonts/fonts.googleapis.opensans-roboto.css" rel="stylesheet" >

    <!-- font Icons -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <!-- LIBS / bootstrap -->
    <link rel="stylesheet" type="text/css" media="screen"
          href="{{ $urlBase }}assets/emuseu/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" media="screen" href="{{ $urlBase }}assets/emuseu/css/style.css">

    <!-- JQUERY -->
    <script src="{{ $urlBase }}resources/libs/js/jquery/jQuery.3.3.1.js"></script>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!--Proper-->
    <script  src="{{ $urlBase }}resources/libs/js/proper/popper.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="{{ $urlBase }}assets/emuseu/js/bootstrap.min.js"></script>

    <!--Funcoes customizadas para modal bootstrap-->
    <script src="{{ $urlBase }}resources/libs/js/functions/modal_functions.js"></script>

    <!--Funcoes customizadas para modal bootstrap-->
    <script src="{{ $urlBase }}resources/libs/js/functions/api_functions.js"></script>

    <!--Funcoes customizadas para api youtube-->
    <script src="{{ $urlBase }}resources/libs/js/functions/youtube_functions.js"></script>

    <!--Definindo variavel global-->
    <script>
        window.appUrl = "{{ $urlBase }}";
    </script>

    <style>
        .link-unable {
            opacity: 0.5;
        }
    </style>


</head>
<body>

<div class="fill-black overbackground"></div>

<div id="wrapper">

    <!-- HEADER -->
    <header id="menu-desk" class="">

        <!-- Refatoração -->
        <section class="logo-principal">
            <img src="{{ $urlBase }}resources/images/logo.png" alt=""
                 onclick="window.location.href = '{{ $urlBase }}'" style="cursor: pointer">
        </section>
        <section class="menu-desk-right">
            <div class="coluna1">
                <section class="menu-secundario">
                    <ul>
                        <!--                        <li><a href="#">Fale Conosco</a></li>-->
                        <li><a href="{{ $urlBase }}quemsomos">Quem Somos</a></li>
                        <li><a href="{{ $urlBase }}termos">Política de privacidade</a></li>
                        <li><a href="{{ $urlBase }}3D">Museu 3D</a></li>
                    </ul>
                </section>
                <section class="menu-principal">
                    <ul>
                        <li>
                            <a href="#" onclick="ButtonToggle('conheca-acervo')" class="menu-btn">
                                    <span>
                                        <i class="fa fa-trophy"></i>
                                    </span>
                                <article>
                                    Conheça o Acervo
                                </article>
                            </a>
                            <section id="conheca-acervo" class="header-window">
                                <p>Conheça os acervos de grandes atletas e as histórias de envolvimento e superação</p>
                                <ul>

                                </ul>
                                <span>
                                        <a href="#"><i class="fas fa-plus"></i>Conheça outros</a>
                                    </span>
                            </section>
                        </li>
                        <li>
                            <a href="#" onclick="ButtonToggle('publique-acervo')" class="menu-btn">
                                    <span>
                                        <i class="fa fa-eye"></i>
                                    </span>
                                <article>
                                    Publique seu acervo
                                </article>
                            </a>
                            <section id="publique-acervo" class="header-window">
                                <?php if (!isset($_SESSION['usuario']['id']) && !isset($_SESSION['usuario']['logged'])): ?>
                                <p>Se você é um atleta profissional, faça logo uma solicitação e compartilhe suas
                                    conquistas! tenha já seu acervo
                                    pessoal.</p>
                                <span>Ele servirá de inspiração para muitas pessoas!</span>
                                <a href="{{ $urlBase }}register">Solicitar</a>
                                <?php else : ?>
                                <p>Acesse seu dashboard de atleta, para publicar suas histórias, fotos, videos e
                                    premiações</p>
                                <span>Ele servirá de inspiração para muitas pessoas!</span>
                                <a href="{{ $urlBase }}register">Publicar</a>
                                <?php endif; ?>
                            </section>
                        </li>
                    </ul>
                </section>
                <div id="cortina-menu" onclick="ButtonToggle('fade')"></div>
            </div>
            <div class="coluna2">

                <!-- SEARCH BAR -->
                <section class="col">
                    <article class="search-bar">
                        <input type="search" name="BUSCAR" id="" class="search-input" placeholder="BUSCAR">
                        <i class="fas fa-search"></i>
                    </article>
                </section>

                <!--Usuario deslogado-->
            <?php if (!isset($_SESSION['usuario']['id']) && !isset($_SESSION['usuario']['logged'])): ?>
            <!-- BLOCO DE LOGIN -->
                <form method="post" id="form-login">
                    <section class="col-login">
                        <i class="far fa-user" data-toggle="popover"></i>

                        <input type="text" name="data[usuario][email]" class="outline login-input"
                               placeholder="Login">
                        <input type="password" name="data[usuario][senha]" class="outline password-input"
                               placeholder="Senha">
                        <a href="#" class="login-button" id="btn-login-base">Entrar<i
                                    class="fas fa-chevron-right"></i>
                        </a>

                        <input type="submit" value="submit" style="display: none"/>

                    </section>
                </form>
                <section class="col">
                    <!--                        <a href="#">Esqueci a senha</a>-->
                </section>


            <?php else : ?><!--Usuario LOGADO-->

                <!-- BLOCO DE LOGIN, QUANDO LOGADO -->

                <section class="col-login">
                    <div class="loged" onclick="ButtonToggle('login-menu')">
                        <section class="avatar-loged">
                            <img src="<?php echo $this->view->url_imagem_avatar ?>" alt="">
                        </section>
                        <section class="name"
                                 style="    margin-left: 0;"><?php echo $_SESSION['usuario']['pessoa']['nome']; ?></section>
                    </div>
                    <section id="login-menu" class="header-window">
                        <a href="{{ $urlBase }}dashboard/perfil">Perfil <i class="fas fa-user"></i></a>
                        <a href="{{ $urlBase }}dashboard">Painel <i class="fas fa-columns"></i></a>
                        <a href="{{ $urlBase }}register/logout">Logout <i class="fas fa-sign-out-alt"></i></a>
                    </section>
                    <a href="{{ $urlBase }}register/logout" class="login-button">Logout<i
                                class="fas fa-sign-out-alt"></i></a>
                </section>

                <?php endif; ?>

            </div>
        </section>

    </header><!-- FINAL HEADER -->

    <!-- Menu Responsivo -->
    <nav id="menu-responsivo">
        <a href="#" class="sandwich" onclick="Menu.chamar('#menu-lateral')">
            <div class="barra1"></div>
            <div class="barra2"></div>
            <div class="barra3"></div>
        </a>
        <span>
            <img src="{{ $urlBase }}resources/images/logo.png" alt=""
                 onclick="window.location.href = '{{ $urlBase }}'" style="cursor: pointer">
            </span>
    </nav>

    <!-- Menu lateral chamado pelo responsivo -->
    <nav id="menu-lateral">
        <?php if (!isset($_SESSION['usuario']['id']) && !isset($_SESSION['usuario']['logged'])): ?>

            <?php else: ?>
        <section class="logado">
            <section class="logado-avatar">
                <img src="<?php echo $avatar->getPathUploadUrl() ?>" alt="">
            </section>

            <br>
            <span><h3><?php echo $usuario_nome ?></h3></span>
        </section>
        <?php endif; ?>
        <section class="search-lateral">
            <input type="search" name="" id="" placeholder="Pesquise aqui" class="outline">
            <!-- <span class="icon-search"></span> -->
        </section>
        <ul>

            <li>
                <a href="#">Conheça o acervo</a>
                <ul>
                    <li><a href="{{ $urlBase }}acervos/basquete">Basquete</a></li>
                    <li><a href="{{ $urlBase }}acervos/natacao">Natação</a></li>
                </ul>
            </li>

            <?php if (!isset($_SESSION['usuario']['id']) && !isset($_SESSION['usuario']['logged'])): ?>
            <li><a href="{{ $urlBase }}register">Publique seu Acervo</a></li>
            <!--            <li><a href="#">Conte a sua história</a></li>-->
            <li><a href="{{ $urlBase }}register/login">Login</a></li>
            <?php else: ?>
            <li><a href="{{ $urlBase }}dashboard/perfil">Perfil <i class="fas fa-user"></i></a></li>
            <li><a href="{{ $urlBase }}dashboard">Painel <i class="fas fa-columns"></i></a></li>
            <li><a href="{{ $urlBase }}register/logout">Logout <i class="fas fa-sign-out-alt"></i></a></li>


            <?php endif; ?>
        </ul>
    </nav>


    <section id="body">
        @yield('content')
    </section>

    <footer>

        <section id="footer-wrapper">

            <section class="parcerias">

                <style rel="stylesheet">
                    .realizacao {
                        padding-top : 20px;
                    }
                </style>

                <section style="width: 100%;text-align: center;padding-top: 15PX;padding-bottom: 5px;">

                    <section class="realizacao">

                        Realizadores

                        <ul class="realizadores">

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_UERJ.png" alt="">
                            </li>

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_YDREAMS.png" alt="">
                            </li>

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_IME.png" alt="">
                            </li>

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_SR-2.png" alt="">
                            </li>

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_SR-3.png" alt="">
                            </li>

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/branco_GAMA.png" alt="">
                            </li>

                        </ul>

                    </section>

                    <section class="realizacao">Apoiadores

                        <ul class="apoiadores">

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/cev.png" alt="">
                            </li>
                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/comite_brasileiro_pierre_coubertin-2.png"
                                     alt="">
                            </li>
                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/confef.png" alt="">
                            </li>

                        </ul>

                    </section>

                    <section class="realizacao">Parceiro Estratégico

                        <ul class="parceiro">

                            <li>
                                <img src="{{ $urlBase }}resources/libs/images/logos/logocbb-644.png" alt="" style="width:120px">
                            </li>

                        </ul>

                    </section>


                </section>


            </section>

        </section>
    </footer>

</div>

<script src="{{ $urlBase }}assets/emuseu/js/scripts.js"></script>

<!--HTML MODAL CONFIRM DIALOG -->
<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"
     id="mi-modal">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Confirmar</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="modal-btn-si">Sim</button>
                <button type="button" class="btn btn-primary" id="modal-btn-no">Não</button>
            </div>
        </div>
    </div>
</div>

<!--Tela de Carregamento - BlackScreen - Loading-->
<link href="{{ $urlBase }}resources/libs/css/blackScreenLoading/style.css" rel="stylesheet"/>
<div id="loader-wrapper" style="display: none; z-index: 999999999999999999999">
    <div id="loader"></div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
</div>


<script type="text/javascript">

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

</script>

<style>
    #wrapper {
        /*padding-bottom: 0px !important;*/
    }
</style>


<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-140816891-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'UA-140816891-1');
</script>

</body>

</html>