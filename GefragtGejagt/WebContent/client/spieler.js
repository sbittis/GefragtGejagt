var chosen = false;
var baseUrl = "http://localhost:8080/GefragtGejagt/Game";
var client_str = "spieler";

function clickA()
{
	if (!chosen)
	{
		chosen = true;
		try {
			$.get(baseUrl, {
				client: client_str,
				spieler: "A",
			}, function(response) {
				if (response == 'ok')
				{
					$("#a").addClass('chosen');
					chosen = true;
					getFrage();
				}
			},
			"text");
		} 
		catch (e) {
			alert(e.message);
		}
	}
}

function clickB()
{
	if (!chosen)
	{
		chosen = true;
		try {
			$.get(baseUrl, {
				client: client_str,
				spieler: "B",
			}, function(response) {
				if (response == 'ok')
				{
					$("#b").addClass('chosen');
					chosen = true;
					getFrage();
				}
			},
			"text");
		} 
		catch (e) {
			alert(e.message);
		}
	}
}

function clickC()
{
	if (!chosen)
	{
		chosen = true;
		try {
			$.get(baseUrl, {
				client: client_str,
				spieler: "C",
			}, function(response) {
				if (response == 'ok')
				{
					$("#c").addClass('chosen');
					chosen = true;
					getFrage();
				}
			},
			"text");
		} 
		catch (e) {
			alert(e.message);
		}
	}
}

function getFrage()
{
	try {
		$.get(baseUrl, {
			client: client_str
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
				$("#a").removeClass(); 
				$("#a").addClass('option');
				$("#b").removeClass();
				$("#b").addClass('option');
				$("#c").removeClass();
				$("#c").addClass('option');
				
				chosen = false;
				
				var a = ($("frage", response)[0]).childNodes[1].childNodes[0].nodeValue;
				var b = ($("frage", response)[0]).childNodes[2].childNodes[0].nodeValue;
				var c = ($("frage", response)[0]).childNodes[3].childNodes[0].nodeValue;
				
				$("#frage").html(frage);
				$("#a").html("a) " + a);
				$("#b").html("b) " + b);
				$("#c").html("c) " + c);
			}
		},
		"xml");
	} 
	catch (e) {
		alert(e.message);
	}
}