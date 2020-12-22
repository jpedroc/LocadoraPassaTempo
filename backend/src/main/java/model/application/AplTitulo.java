package model.application;

import model.domain.Ator;
import model.domain.HibernateUtil;
import model.domain.Titulo;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class AplTitulo {

    public static void dicidirAcao(String acao, Long id, String nome, Long idDiretor, Long idClasse, String[] idAtores) {
        switch (acao) {
            case "novo":
                incluir(nome, idDiretor, idClasse, toArrayLong(idAtores));
                break;
            case "alterar":
                alterar(id, nome, idDiretor, idClasse, toArrayLong(idAtores));
                break;
            case "excluir":
                excluir(id);
        }
    }

    public static Titulo buscarTitulo(Long id) {
        Session s = HibernateUtil.getSession().openSession();
        return s.get(Titulo.class, id);
    }

    private static List<Long> toArrayLong(String[] ids) {
        List<Long> longs = new ArrayList<>();
        Arrays.stream(ids).forEach(element -> {
            longs.add(Long.valueOf(element));
        });
        return longs;
    }

    public static int incluir(String nome, Long idDiretor, Long idClasse, List<Long> idAtores) {
        Titulo a = new Titulo();
        a.setNome(nome);
        a.setDiretor(AplDiretor.buscarDiretor(idDiretor));
        a.setClasse(AplClasse.buscarClasse(idClasse));
        List<Ator> atores = (List<Ator>) idAtores.stream().map(Ator::new).collect(Collectors.toList());
        a.setAtores(atores);

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
        a.setAtores(null);

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.update(a);
            List<Ator> atores = idAtores.stream().map(Ator::new).collect(Collectors.toList());
            a.setAtores(atores);
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
        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            Titulo a = session.get(Titulo.class, id);
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

    public static List getTitulos() {
        SessionFactory sessions = HibernateUtil.getSession();
        Session s = sessions.openSession();

        List listTitulos = s.createQuery("from Titulo ").list();
        return listTitulos;
    }
}
