package model.application;

import model.domain.Diretor;
import model.domain.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class AplDiretor {

    public static int ERRO_NOMEINVALIDO = 1;
    public static int ERRO_PERSISTENCIA = 2;
    public static int ERRO_GERAL = 3;
    public static int SUCESSO = 4;

    public static void decidirAcao(String acao, Long id, String nome) {
        switch (acao) {
            case "novo":
                incluir(nome);
                break;
            case "alterar":
                alterar(id, nome);
                break;
            case "excluir":
                excluir(id);
        }
    }

    public static Diretor buscarDiretor(Long id) {
        Session s = HibernateUtil.getSession().openSession();
        return s.get(Diretor.class, id);
    }

    public static List<Diretor> getDiretores(){
        SessionFactory sessions = HibernateUtil.getSession();
        Session s = sessions.openSession();

        List listDiretores = s.createQuery("from Diretor").list();
        return listDiretores;
    }

    public static int incluir(String nome){
        if (nome.equals(""))
            return ERRO_NOMEINVALIDO;

        Diretor a = new Diretor();
        a.setNome(nome);

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

    public static int alterar(Long id, String nome){
        Diretor auxDiretor = buscarDiretor(id);
        auxDiretor.setNome(nome);

        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;

        try {
            t = session.beginTransaction();
            session.update(auxDiretor);
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

    public static int excluir(Long id){
        SessionFactory sessions =  HibernateUtil.getSession();
        Session session = sessions.openSession();
        Transaction t = null;
        Diretor auxDiretor = buscarDiretor(id);

        try {
            t = session.beginTransaction();
            session.delete(auxDiretor);
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
}
