package model.application;

import model.domain.Ator;
import model.domain.Classe;
import model.domain.HibernateUtil;
import model.domain.Titulo;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class AplTitulo {

    public static void dicidirAcao(String acao, Long id, String nome, Long idDiretor, Long idClasse, List<Long> idAtores) {
        switch (acao) {
            case "novo":
                incluir(nome, idDiretor, idClasse, idAtores);
                break;
            case "alterar":
                alterar(id, nome, idDiretor, idClasse, idAtores);
                break;
            case "excluir":
                excluir(id);
        }
    }

    public static Titulo buscarTitulo(Long id) {
        Session s = HibernateUtil.getSession().openSession();
        return s.get(Titulo.class, id);
    }

    public static int incluir(String nome, Long idDiretor, Long idClasse, List<Long> idAtores) {
        Titulo a = new Titulo();
        a.setNome(nome);
        a.setDiretor(AplDiretor.buscarDiretor(idDiretor));
        a.setClasse(AplClasse.buscarClasse(idClasse));
        a.setAtores((List<Ator>) idAtores.stream().map(element -> AplAtor.buscarAtor(element)));

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.save(a);
            t.commit();

            return 1;
        }catch (HibernateException he) {
            t.rollback();

            return 0;
        }catch (Exception e) {
            t.rollback();

            return 0;
        } finally {
            session.close();
        }
    }

    public static int alterar(Long id, String nome, Long idDiretor, Long idClasse, List<Long> idAtores) {
        Titulo a = buscarTitulo(id);
        a.setNome(nome);
        a.setDiretor(AplDiretor.buscarDiretor(idDiretor));
        a.setClasse(AplClasse.buscarClasse(idClasse));
        a.setAtores((List<Ator>) idAtores.stream().map(element -> AplAtor.buscarAtor(element)));

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.update(a);
            t.commit();

            return 1;
        }catch (HibernateException he) {
            t.rollback();

            return 0;
        }catch (Exception e) {
            t.rollback();

            return 0;
        } finally {
            session.close();
        }
    }

    public static int excluir(Long id) {
        Titulo a = buscarTitulo(id);
        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.delete(a);
            t.commit();

            return 1;
        }catch (HibernateException he) {
            t.rollback();

            return 0;
        }catch (Exception e) {
            t.rollback();

            return 0;
        } finally {
            session.close();
        }
    }
}
