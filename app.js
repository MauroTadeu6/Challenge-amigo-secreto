//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let listaDeAmigos = [];
let sorteiosRealizados = []; // Para armazenar os pares sorteados

// Função para capitalizar a primeira letra de um nome
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nomeAmigo = capitalizeFirstLetter(inputAmigo.value.trim());

    const regex = /^[A-Za-z\u00C0-\u00FF]/; 
    if (!regex.test(nomeAmigo)) {
        inputAmigo.value = "";
        alert("Favor redigite um nome válido");
        return;
    }

    if (nomeAmigo === "") {
        alert("Favor digitar um nome válido");
        return;
    }

    if (listaDeAmigos.includes(nomeAmigo)) {
        alert(`O nome '${nomeAmigo}' já consta da lista!`);
        inputAmigo.value = "";
        return;
    }

    listaDeAmigos.push(nomeAmigo);
    atualizarListaDeAmigos();
    inputAmigo.value = ""; // Limpar o campo após adicionar
}

// Função para atualizar a lista de amigos exibida na tela
function atualizarListaDeAmigos() {
    const listaAmigosElement = document.getElementById("listaAmigos");
    listaAmigosElement.innerHTML = "";

    listaDeAmigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigosElement.appendChild(li);
    });
}

// Função para sortear um amigo secreto
function sortearAmigo() {
    if (sorteiosRealizados.length >= listaDeAmigos.length) {
        alert("Todos os amigos já foram sorteados! Reinicie para adicionar novos nomes.");
        return;
    }

    // Limpar resultados anteriores
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "";

    // Sortear e mostrar novos pares
    for (let i = 0; i < listaDeAmigos.length; i++) {
        let indiceSorteado;

        do {
            indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
        } while (sorteiosRealizados.includes(indiceSorteado) || indiceSorteado === i);

        sorteiosRealizados.push(indiceSorteado);
        const amigoSorteado = listaDeAmigos[indiceSorteado];
        const amigoDaVez = listaDeAmigos[i];

        resultadoElement.innerHTML += `<li>${amigoDaVez} é amigo secreto de ${amigoSorteado}</li>`;
    }
}

// Função para reiniciar o programa
function reiniciarPrograma() {
    listaDeAmigos = [];
    sorteiosRealizados = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("amigo").value = "";
    alert("Programa reiniciado! Adicione novos nomes.");
}

// Event listeners
document.getElementById("amigo").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});
