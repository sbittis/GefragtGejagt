package server;

import java.io.IOException;
import java.util.List;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GameService extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	
	//Thread.sleep(10000);
	
	// permanente Speicherung der Auswahl, damit das an den Screen weitergegeben werden kann
	// der Screen fragt jede Sekunde nach den Auswahlen
	private String jaegerPerm = "";
	private String spielerPerm = "";
	private List<Frage> fragen = null;
	private Frage aktFrage = null;
	private int counter = 0;
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException,ServletException
	{
		String client = request.getParameter("client");
		if ("jaeger".equals(client))
		{
			String jaeger = request.getParameter("jaeger");
			if (jaeger != null)
			{
				System.out.println("Jäger hat gewählt: " + jaeger);
				jaegerPerm = jaeger;
				sendeAntwort(response, "ok");
			}
			else
			{
				// keine Antwort eingegeben ==> der Client will die Frage abrufen
				while (aktFrage == null)
				{
					warte(1, response);
				}
				sendeObjektFrage(aktFrage, response);
			}
		}
		else if ("spieler".equals(client))
		{
			String spieler = request.getParameter("spieler");
			if (spieler != null)
			{
				System.out.println("Spieler hat gewählt: " + spieler);
				spielerPerm = spieler;
				sendeAntwort(response, "ok");
			}
			else
			{
				// keine Antwort eingegeben ==> der Client will die Frage abrufen
				while (aktFrage == null)
				{
					warte(1, response);
				}
				sendeObjektFrage(aktFrage, response);
			}
		}
		else if ("screen".equals(client))
		{
			String target = request.getParameter("target");
			if ("frage".equals(target))
			{
				// Frage an die Clients ausliefern
				if (fragen == null)
				{
					// initialisiere
					// später aus Textdatei etc. laden
					fragen = new Vector<Frage>();
					fragen.add(new Frage("Was ist Pi?", "4,52", "1,32", "3,16", "C"));
					fragen.add(new Frage("Wer ist Peter?", "Oli", "Joe", "Mark", "A"));
					System.out.println("Fragen initialisiert.");
				}
				if (counter < fragen.size())
				{
					aktFrage = fragen.get(counter);
					sendeObjektFrage(aktFrage, response);
					counter++;
					System.out.println("Frage gesendet.");
					jaegerPerm = "";
					spielerPerm = "";
					warte(1.5, response);
					aktFrage = null;
				}
				else
				{
					sendeAntwort(response, "<frage><quiz>finish</quiz></frage>", "text/xml");
					System.out.println("Alle Fragen abgearbeitet. Ende.");
					// um an die Clients "Ende" zu schicken
					aktFrage = new Frage("Ende", "", "", "", "A");
				}
			}
			else if ("spieler".equals(target))
			{
				System.out.println("Warte auf Antwort des Spielers...");
				while ("".equals(spielerPerm))
				{
					warte(1, response);
				}
				sendeAntwort(response, spielerPerm);
				System.out.println("Antwort Spieler an Screen gesendet.");
			}
			else if ("jaeger".equals(target))
			{
				System.out.println("Warte auf Antwort des Jägers...");
				while ("".equals(jaegerPerm))
				{
					warte(1, response);
				}
				sendeAntwort(response, jaegerPerm);
				System.out.println("Antwort Jäger an Screen gesendet.");
			}
		}
	}
	
	private void sendeObjektFrage(Frage f, HttpServletResponse response)
	{
		String antwort = "<frage><frage>" + f.getFrage() + "</frage>"
				+ "<a>" + f.getA() + "</a><b>" + f.getB()
				+ "</b><c>" + f.getC() + "</c><richtig>" + f.getRichtig()
				+ "</richtig></frage>";
		sendeAntwort(response, antwort, "text/xml");
	}
	
	private void warte(double sek, HttpServletResponse response)
	{
		try
		{
			Thread.sleep((int)(sek * 1000));
		}
		catch (Exception e)
		{
			sendeAntwort(response, "Fehler beim Warten.");
		}
	}
	
	private void sendeAntwort(HttpServletResponse response, String antwort)
	{
		try
		{
			response.setContentType("text/plain");
			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setStatus(200);
			response.getWriter().write(antwort);
			response.getWriter().flush();
			response.getWriter().close();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
	}
	
	private void sendeAntwort(HttpServletResponse response, String antwort, String contentType)
	{
		try
		{
			response.setContentType(contentType);
			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setStatus(200);
			response.getWriter().write(antwort);
			response.getWriter().flush();
			response.getWriter().close();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
	}
}
