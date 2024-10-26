// Função para exibir apenas a aba selecionada
function mostrarAba(abaId) {
  const abas = document.querySelectorAll(".aba");
  // biome-ignore lint/complexity/noForEach: <explanation>
  abas.forEach((aba) => {
    if (aba.id === abaId) {
      aba.style.display = "block";
    } else {
      aba.style.display = "none";
    }
  });
}

// Função para atualizar dados de monitoramento (simulação)
function atualizarDados() {
  document.getElementById("nivelRio").textContent = "3.5m";
  document.getElementById("previsaoChuva").textContent =
    "80% chance de chuva forte";
}

// Função para abrir o Quiz
function abrirQuiz() {
  const quizSection = document.getElementById("perguntasQuiz");
  quizSection.style.display =
    quizSection.style.display === "none" ? "block" : "none";
}

// Função para mostrar voluntários (simulação)
function mostrarVoluntarios() {
  alert("Lista de voluntários em breve.");
}
