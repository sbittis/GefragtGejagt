package server;

public class Frage 
{
	private String frage = "";
	private String a = "";
	private String b = "";
	private String c = "";
	private String richtig = "";
	
	public Frage()
	{
		
	}
	
	public Frage(String frage, String a, String b, String c, String richtig)
	{
		this.frage = frage;
		this.a = a;
		this.b = b;
		this.c = c;
		this.richtig = richtig;
	}

	public String getFrage() {
		return frage;
	}

	public void setFrage(String frage) {
		this.frage = frage;
	}

	public String getA() {
		return a;
	}

	public void setA(String a) {
		this.a = a;
	}

	public String getB() {
		return b;
	}

	public void setB(String b) {
		this.b = b;
	}

	public String getC() {
		return c;
	}

	public void setC(String c) {
		this.c = c;
	}

	public String getRichtig() {
		return richtig;
	}

	public void setRichtig(String richtig) {
		this.richtig = richtig;
	}
	
	
}
