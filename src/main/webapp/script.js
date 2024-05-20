// ==============================================================
// 		EVENTOS


// RESET
reset = function() {
	
	const payload = {
		op: "RESET"
	}
	
	fetch("ControllerServlet", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(payload)
    }).then(() => {
		atualizaSessao()
		window.location.href = "/prova1"
	}).catch(() => {
		alert("Houve um erro ao resetar os dados")
	})
}

novaAula = function() {
	window.location.href = "nova";
}


calcelarNovaAula = function() {
	window.location.href = "/prova1";
}


editarAula = function(id) {
	window.location.href = "edit?id=" + id;
}



enviarNovaAula = function() {

	let data = document.getElementById('data-id').value;
	let horario = document.getElementById('hora-id').value;
	let duracao = document.getElementById('dur-id').value;
	let codDisciplina = document.getElementById('disc-id').value;
	let assunto = document.getElementById('ass-id').value;

	
	
	if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {
        document.getElementById('msg-id').style.display = 'block';
        return;
    }
    
    const payload = {
		data,
		horario,
		duracao,
		codDisciplina,
		assunto,
		op: "CREATE"
	}
    
	fetch("ControllerServlet", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(payload)
    }).then(() => {
		atualizaSessao()
		window.location.href = "/prova1"
	}).catch(() => {
		alert("Houve um erro ao criar")
	})
 }

enviarEdit = function() {
	let id = document.getElementById('id').innerHTML;
	let data = document.getElementById('data-id').value;
	let horario = document.getElementById('hora-id').value;
	let duracao = document.getElementById('dur-id').value;
	let codDisciplina = document.getElementById('disc-id').value;
	let assunto = document.getElementById('ass-id').value;
	
	console.log(data, horario, duracao, codDisciplina, assunto)
	
	
	
if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {
        document.getElementById('msg-id').style.display = 'block';
        return;
    }
    
    const payload = {
		id,
		data,
		horario,
		duracao,
		codDisciplina,
		assunto,
		op: "UPDATE"
	}
    
	fetch("ControllerServlet", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(payload)
    }).then(() => {
		atualizaSessao()
		window.location.href = "/prova1"
	}).catch(() => {
		alert("Erro de edição")
	})
}

deleta = function(id) {

	const payload = {
		id,
		op: "DELETE"
	}
	
	fetch("ControllerServlet", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(payload)
    }).then(() => {
		atualizaSessao();
	    window.location.href = "/prova1";
	}).catch(() => {
		alert("Erro ao deletar")
	})

	
			
}


const voltarParaoIndex = function() {
	 window.location.href = "/prova1";
}


const atualizaSessao = function() {
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
		
		} else if (req.readyState == 4) {
		
			console.error("Erro ao atualizar sessão. Status: " + req.status);
			alert("Não foi possível atualizar a sessão. Por favor, tente novamente.");
		}
	}
	req.send("op=START_SESSION");
}


validaNovaAula = function(data, horario, duracao, codDisciplina, assunto) {
  const existsValues = [data,horario,duracao, codDisciplina, assunto].every(value => !!value)
  
  
    return existsValues;
}




atualizaSessao();
