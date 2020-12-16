<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List"%>
<%@ page import="org.hibernate.Session"%>
<%@ page import="org.hibernate.SessionFactory"%>
<%@ page import="model.domain.HibernateUtil"%>
<%@ page import="model.application.AplDiretor"%>
<%@ page import="model.application.AplClasse"%>
<%@ page import="model.application.AplAtor"%>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Locadora Passa-Tempo</title>
</head>
<body>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <span class="navbar-brand mb-0 h1">Locadora Passa-Tempo</span>

    <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropAcervo" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Controle do Acervo
                </a>
                <div class="dropdown-menu" aria-labelledby="dropAcervo">
                    <a class="dropdown-item" onclick="gerarFormulario('ator')" href="#">Ator</a>
                    <a class="dropdown-item" onclick="gerarFormulario('classe')" href="#">Classe</a>
                    <a class="dropdown-item" onclick="gerarFormulario('diretor')" href="#">Diretor</a>
                    <a class="dropdown-item" onclick="gerarFormulario('item')" href="#">Item</a>
                    <a class="dropdown-item" onclick="gerarFormulario('titulo')" href="#">Título</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropCliente" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Atendimento ao Cliente
                </a>
                <div class="dropdown-menu" aria-labelledby="dropAcervo">
                    <a class="dropdown-item" onclick="gerarFormulario('cliente')" href="#">Cadastrar Cliente</a>
                    <a class="dropdown-item" onclick="gerarFormulario('locacao')" href="#">Locar Item</a>
                </div>
            </li>
        </ul>
    </div>
</nav>

<form method="POST" action="ControllerGeral" class="container-sm" id="form">
</form>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/js/bootstrap.min.js" integrity="sha384-XEerZL0cuoUbHE4nZReLT7nx9gQrQreJekYhJD9WNWhH8nEW+0c5qq7aIo2Wl30J" crossorigin="anonymous"></script>
<script src="./script.js"></script>
</body>
</html>