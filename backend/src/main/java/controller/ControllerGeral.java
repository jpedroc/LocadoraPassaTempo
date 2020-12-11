package controller;

import model.application.AplAtor;
import model.application.AplClasse;
import model.application.AplDiretor;
import model.application.AplTitulo;
import org.apache.commons.lang3.ObjectUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ControllerGeral")
public class ControllerGeral extends HttpServlet {
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControllerGeral() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        //response.getWriter().append("Served at: ").append(request.getContextPath());

        //Receber o valor do atributo da operação a ser realizada
        String op = request.getParameter("operacao");
        String form = request.getParameter("formAtual");

        switch (form) {
            case "ator":
                String idAtor = request.getParameter("id");
                String novoNome = request.getParameter("nome");
                AplAtor.dicidirAcao(
                        op,
                        verificarString(idAtor),
                        novoNome
                );
                break;

            case "titulo":
                String id = request.getParameter("idTitulo");
                String nome = request.getParameter("nomeTitulo");
                String idDir = request.getParameter("diretor");
                String idClasse1 = request.getParameter("classe");
                String[] idAtores = request.getParameterValues("atores");
                AplTitulo.dicidirAcao(
                        op,
                        verificarString(id),
                        nome,
                        verificarString(idDir),
                        verificarString(idClasse1),
                        null
                );
                break;

            case "diretor":
                String idDiretor = request.getParameter("idDiretor");
                String nomeDiretor = request.getParameter("nomeDiretor");
                AplDiretor.decidirAcao(
                        op,
                        verificarString(idDiretor),
                        nomeDiretor);
                break;

            case "classe":
                String idClasse = request.getParameter("idClasse");
                String nomeClasse = request.getParameter("nomeClasse");
                String valor = request.getParameter("valorClasse");
                String prazo = request.getParameter("prazoClasse");
                AplClasse.dicidirAcao(
                        op,
                        verificarString(idClasse),
                        nomeClasse,
                        verificarStringD(valor),
                        verificarString(prazo));
                break;
        }
    }

    private Long verificarString(String num) {
        return num != null && num.isEmpty() ? 0l : Long.valueOf(num);
    }

    private Double verificarStringD(String num) {
        return num != null && num.isEmpty() ? 0.0 : Double.valueOf(num);
    }

}
