var baseUrl = "http://localhost:8080/GefragtGejagt/Game";
var client_str = "screen";
var spieler_antwort = "";
var jaeger_antwort = "";
var richtig = "";

function getFrage()
{
	try {
		$.get(baseUrl, {
			client: client_str,
			target: "frage"
		}, function(response) {
			var frage = ($("frage", response)[0]).childNodes[0].childNodes[0].nodeValue;
			if (frage == 'finish')
			{
				$("#frage").html("Ende!");
				$("#a").html("");
				$("#b").html("");
				$("#c").html("");
			}
			else
			{
				var a = ($("frage", response)[0]).childNodes[1].childNodes[0].nodeValue;
				var b = ($("frage", response)[0]).childNodes[2].childNodes[0].nodeValue;
				var c = ($("frage", response)[0]).childNodes[3].childNodes[0].nodeValue;
				richtig = ($("frage", response)[0]).childNodes[4].childNodes[0].nodeValue;
				
				$("#frage").html(frage);
				$("#a").html("A<br/>" + a);
				$("#b").html("B<br/>" + b);
				$("#c").html("C<br/>" + c);
				
				getAnswers();
			}
		},
		"xml");
	} 
	catch (e) {
		alert(e.message);
	}
}

function getAnswers()
{
	// Antwort des Spielers holen
	try {
		$.get(baseUrl, {
			client: client_str,
			target: "spieler"
		}, function(response) {
			$("#spieler").addClass('ready');
			spieler_antwort = response;
		},
		"text");
	} 
	catch (e) {
		alert(e.message);
	}
	
	// Antwort des Jägers holen
	try {
		$.get(baseUrl, {
			client: client_str,
			target: "jaeger"
		}, function(response) {
			$("#jaeger").addClass('ready');
			jaeger_antwort = response;
		},
		"text");
	} 
	catch (e) {
		alert(e.message);
	}
}

function showAnswerSpieler()
{
	if (spieler_antwort != "")
	{
		if (spieler_antwort == 'A')
		{
			$("#a").addClass('selectedByPlayer');
		}
		else if (spieler_antwort == 'B')
		{
			$("#b").addClass('selectedByPlayer');
		}
		else if (spieler_antwort == 'C')
		{
			$("#c").addClass('selectedByPlayer');
		}
		spieler_antwort = "";
	}
}

function showRightAnswer()
{
	if (richtig != "")
	{
		if (richtig == 'A')
		{
			$("#a").addClass('rightAnswer');
		}
		else if (richtig == 'B')
		{
			$("#b").addClass('rightAnswer');
		}
		else if (richtig == 'C')
		{
			$("#c").addClass('rightAnswer');
		}
	}
}

function showAnswerJaeger()
{
	if (jaeger_antwort != "")
	{
		if (jaeger_antwort == 'A')
		{
			$("#a").addClass('selectedByHunter');
		}
		else if (jaeger_antwort == 'B')
		{
			$("#b").addClass('selectedByHunter');
		}
		else if (jaeger_antwort == 'C')
		{
			$("#c").addClass('selectedByHunter');
		}
		jaeger_antwort = "";
	}
}

function clickB()
{
	if (richtig != "")
	{
		if (richtig == 'A')
		{
			$("#a").addClass('rightAnswer');
		}
		else if (richtig  == 'B')
		{
			$("#b").addClass('rightAnswer');
		}
		else if (richtig == 'C')
		{
			$("#c").addClass('rightAnswer');
		}
		richtig = "";
	}
	else
	{
		// nächste Frage
		$("#a").removeClass();
		$("#a").addClass('option');
		$("#b").removeClass();
		$("#b").addClass('option');
		$("#c").removeClass();
		$("#c").addClass('option');
		
		$("#spieler").removeClass();
		$("#spieler").addClass('player');
		$("#jaeger").removeClass();
		$("#jaeger").addClass('player');
		
		getFrage();
	}
}