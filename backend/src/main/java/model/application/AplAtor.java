package model.application;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import model.domain.Ator;
import model.domain.HibernateUtil;

public class AplAtor {

	public static int ERRO_NOMEINVALIDO = 1;
	public static int ERRO_PERSISTENCIA = 2;
	public static int ERRO_GERAL = 3;
	public static int SUCESSO = 4;

	public static void dicidirAcao(String acao, Long id, String nomeAtor) {
		switch (acao) {
			case "novo":
				incluirAtor(nomeAtor);
				break;
			case "alterar":
				alterarAtor(id, nomeAtor);
				break;
			case "excluir":
				excluirAtor(id);
		}
	}

	public static Ator buscarAtor(Long id) {
		Session s = HibernateUtil.getSession().openSession();
		return s.get(Ator.class, id);
	}

	public static int incluirAtor (String nomeAtor) {

		if (nomeAtor.equals(""))
			return ERRO_NOMEINVALIDO;

		Ator a = new Ator();
		a.setNome(nomeAtor);

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

	public static int alterarAtor (Long idAtor, String novoNome) {
		if (novoNome.equals(""))
			return ERRO_NOMEINVALIDO;

		Ator auxAtor = buscarAtor(idAtor);
		auxAtor.setNome(novoNome);

		SessionFactory sessions =  HibernateUtil.getSession();
		Session session = sessions.openSession();
		Transaction t = null;
		
		try {
			t = session.beginTransaction();
			session.update(auxAtor);
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

	public static int excluirAtor (Long idAtor) {
		SessionFactory sessions =  HibernateUtil.getSession();
		Session session = sessions.openSession();
		Transaction t = null;
		Ator auxAtor = buscarAtor(idAtor);
		
		try {
			t = session.beginTransaction();
			session.delete(auxAtor);
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
