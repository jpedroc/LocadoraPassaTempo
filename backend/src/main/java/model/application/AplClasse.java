package model.application;

import model.domain.Classe;
import model.domain.Diretor;
import model.domain.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class AplClasse {
    public static int ERRO_NOMEINVALIDO = 1;
    public static int ERRO_VALORINVALIDO = 2;
    public static int ERRO_PRAZOINVALIDO = 3;
    public static int ERRO_PERSISTENCIA = 4;
    public static int ERRO_GERAL = 5;
    public static int SUCESSO = 6;

    public static void dicidirAcao(String acao, Long id, String nome, Double valor, Long prazo) {
        switch (acao) {
            case "novo":
                incluir(nome, valor, prazo);
                break;
            case "alterar":
                alterar(id, nome, valor, prazo);
                break;
            case "excluir":
                excluir(id);
        }
    }

    public static Classe buscarClasse(Long id) {
        Session s = HibernateUtil.getSession().openSession();
        return s.get(Classe.class, id);
    }

    public static int incluir(String nome, Double valor, Long prazo) {
        if (nome.equals(""))
            return ERRO_NOMEINVALIDO;
        if (valor == null)
            return ERRO_VALORINVALIDO;
        if (prazo == null)
            return ERRO_PRAZOINVALIDO;

        Classe a = new Classe();
        a.setNome(nome);
        a.setValor(valor);
        a.setPrazoDevolucao(prazo);

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.save(a);
            t.commit();

            return SUCESSO;
        }catch (HibernateException he) {
            t.rollback();

            return ERRO_PERSISTENCIA;
        }catch (Exception e) {
            t.rollback();

            return ERRO_GERAL;
        } finally {
            session.close();
        }
    }

    public static int alterar(Long id, String nome, Double valor, Long prazo) {
        Classe a = buscarClasse(id);
        a.setNome(nome);
        a.setValor(valor);
        a.setPrazoDevolucao(prazo);

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.save(a);
            t.commit();

            return SUCESSO;
        }catch (HibernateException he) {
            t.rollback();

            return ERRO_PERSISTENCIA;
        }catch (Exception e) {
            t.rollback();

            return ERRO_GERAL;
        } finally {
            session.close();
        }
    }

    public static int excluir(Long id) {
        Classe a = buscarClasse(id);
        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.delete(a);
            t.commit();

            return SUCESSO;
        }catch (HibernateException he) {
            t.rollback();

            return ERRO_PERSISTENCIA;
        }catch (Exception e) {
            t.rollback();

            return ERRO_GERAL;
        } finally {
            session.close();
        }
    }

    public static List getClasses() {
        SessionFactory sessions = HibernateUtil.getSession();
        Session s = sessions.openSession();

        List listClasses = s.createQuery("from Classe").list();
        return listClasses;
    }
}
