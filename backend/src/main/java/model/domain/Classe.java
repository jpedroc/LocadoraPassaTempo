package model.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Classe {

	@Id
	@GeneratedValue
	private Long id;
	
	private String nome;
	
	private Double valor;
	
	private Long prazoDevolucao;
	
	
	public Classe() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Long getPrazoDevolucao() {
		return prazoDevolucao;
	}

	public void setPrazoDevolucao(Long prazoDevolucao) {
		this.prazoDevolucao = prazoDevolucao;
	}
	
}
