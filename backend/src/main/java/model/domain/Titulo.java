package model.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Titulo {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	private String nome;
	
	@ManyToOne
	private Diretor diretor;

	@ManyToOne
	private Classe classe;

	@ManyToMany
	@JoinTable(name = "TITULO_ATORES", joinColumns = @JoinColumn(name = "TITULO_ID"), inverseJoinColumns = @JoinColumn(name = "ATOR_ID"))
	private List<Ator> atores;

	public Titulo(){
	}

	public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
		this.classe = classe;
	}

	public List<Ator> getAtores() {
		return atores;
	}

	public void setAtores(List<Ator> atores) {
		this.atores = atores;
	}

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public Diretor getDiretor() {
		return diretor;
	}


	public void setDiretor(Diretor diretor) {
		this.diretor = diretor;
	}
	
	
	
	
}
