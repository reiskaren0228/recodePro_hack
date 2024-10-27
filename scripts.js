const navButtons = document.querySelectorAll(".nav-button");
const contentSections = document.querySelectorAll("main > div");
const weatherForm = document.getElementById("weather-form");
const weatherInfo = document.getElementById("weather-info");
let cidadesData = [];

// Carregar dados do JSON
async function loadCidadesData() {
  try {
    const response = await fetch("dados.json");
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }
    const data = await response.json();
    cidadesData = data.cidades;
    populateEstadoDropdown(); // Preencher o dropdown de estados
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// Função para popular o dropdown de estados
function populateEstadoDropdown() {
  const estadoSelect = document.getElementById("estado");
  estadoSelect.innerHTML = '<option value="">Selecione um Estado</option>';

  const estados = [
    ...new Set(cidadesData.map((cidade) => cidade.estado)),
  ].sort();

  for (const estado of estados) {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado;
    estadoSelect.appendChild(option);
  }

  estadoSelect.addEventListener("change", function () {
    populateCityDropdown(this.value);
  });
}

// Função para popular o dropdown de cidades baseado no estado selecionado
function populateCityDropdown(estadoSelecionado) {
  const cidadeSelect = document.getElementById("cidade");
  cidadeSelect.innerHTML = '<option value="">Selecione uma Cidade</option>';

  if (!estadoSelecionado) return;

  const cidadesFiltradas = cidadesData
    .filter((cidade) => cidade.estado === estadoSelecionado)
    .sort((a, b) => a.nome.localeCompare(b.nome));

  for (const cidade of cidadesFiltradas) {
    const option = document.createElement("option");
    option.value = cidade.nome;
    option.textContent = cidade.nome;
    cidadeSelect.appendChild(option);
  }
}

// Exibir informações climáticas da cidade selecionada
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cidadeNome = document.getElementById("cidade").value;
  const cidadeInfo = cidadesData.find((cidade) => cidade.nome === cidadeNome);

  if (cidadeInfo) {
    weatherInfo.innerHTML = `
      <h3>Dados de ${cidadeInfo.nome}, ${cidadeInfo.estado}</h3>
      <p>Nível do Rio: ${cidadeInfo.dados.nivelRio}</p>
      <p>Previsão de Chuva: ${cidadeInfo.dados.previsaoChuva}</p>
      <p>Quantidade de Água: ${cidadeInfo.dados.quantidadeAgua} mm</p>
      <p>Nível de Risco: ${cidadeInfo.dados.nivelRisco}</p>
      <p>Clima: ${cidadeInfo.dados.clima}</p>
    `;
    weatherInfo.classList.remove("hidden");
  } else {
    weatherInfo.innerHTML =
      "<p>Dados não encontrados para a cidade selecionada.</p>";
    weatherInfo.classList.remove("hidden");
  }
});

// Configuração dos botões de navegação
for (const button of navButtons) {
  button.addEventListener("click", () => {
    for (const btn of navButtons) {
      btn.classList.remove("active");
    }
    button.classList.add("active");

    const tabId = button.getAttribute("data-tab");
    for (const section of contentSections) {
      section.classList.toggle("hidden", section.id !== `${tabId}-content`);
    }
  });
}

// Função para carregar o navbar
async function loadNavbar() {
  try {
    const response = await fetch("navbar.html");
    const data = await response.text();
    document.getElementById("main-header").innerHTML = data;
    feather.replace(); // Recarrega os ícones Feather após carregar o nav
  } catch (error) {
    console.error("Erro ao carregar o navbar:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadNavbar);

// Manipulação do formulário de contato
async function handleContactFormSubmission(e) {
  e.preventDefault();

  const formData = {
    contato: document.querySelector('input[name="contato"]:checked').value,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value,
  };

  try {
    const response = await fetch("https://formspree.io/f/mblravbe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      document.getElementById("contatoForm").reset();
    } else {
      const errorText = await response.text();
      alert(`Erro ao enviar mensagem: ${errorText}`);
    }
  } catch (error) {
    alert(`Erro ao enviar mensagem: ${error.message}`);
  }
}

// Inicializa o carregamento dos dados e eventos
document.addEventListener("DOMContentLoaded", async () => {
  await loadCidadesData();
  await loadNavbar();

  document
    .getElementById("contatoForm")
    .addEventListener("submit", handleContactFormSubmission);
});
