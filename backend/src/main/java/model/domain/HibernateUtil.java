package model.domain;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	private static SessionFactory session = buildSessionFactory();

	private static SessionFactory buildSessionFactory() {
		try {
			Configuration cfg =  new Configuration();
			cfg.configure("hibernate.cfg.xml");
			return cfg.buildSessionFactory();
		} catch (Throwable e) {
			System.out.println("Deu pau! Manolo!\n " + e );
			System.out.println(e.fillInStackTrace());
			throw new ExceptionInInitializerError();
		}
	}

	public static SessionFactory getSession() {
		
		if (session == null)
			session = HibernateUtil.buildSessionFactory();
		
		return session;
	}

}
