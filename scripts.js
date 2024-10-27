const navButtons = document.querySelectorAll(".nav-button");
const contentSections = document.querySelectorAll("main > div");
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
  if (!estadoSelect) {
    console.error("Elemento 'estado' não encontrado.");
    return;
  }

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
  if (!cidadeSelect) {
    console.error("Elemento 'cidade' não encontrado.");
    return;
  }

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

/// Inicializa o carregamento dos dados e eventos
document.addEventListener("DOMContentLoaded", async () => {
  await loadCidadesData();
  await loadNavbar();

  const weatherForm = document.getElementById("weather-form");
  const weatherInfo = document.getElementById("weather-info");

  if (weatherForm) {
    weatherForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const cidadeNome = document.getElementById("cidade").value;
      const cidadeInfo = cidadesData.find(
        (cidade) => cidade.nome === cidadeNome
      );

      if (cidadeInfo) {
        const getWeatherIcon = (clima) => {
          switch (clima.toLowerCase()) {
            case "sol":
              return "sun";
            case "nublado":
              return "cloud";
            case "tempestade":
              return "cloud-rain";
            default:
              return "cloud";
          }
        };

        const getRiskLevelColor = (nivel) => {
          switch (nivel.toLowerCase()) {
            case "baixo":
              return "#10B981"; // text-green-500
            case "médio":
              return "#F59E0B"; // text-yellow-500
            case "alto":
              return "#EF4444"; // text-red-500
            default:
              return "#6B7280"; // text-gray-500
          }
        };

        weatherInfo.innerHTML = `
  <div class="weather-info">
    <h3>Dados de ${cidadeInfo.nome}, ${cidadeInfo.estado}</h3>
    
    <div class="grid">
      <div class="info-card river">
        <div class="label-group">
          <i data-feather="droplet" class="icon-blue"></i>
          <span class="label">Nível do Rio:</span>
        </div>
        <span class="value">${cidadeInfo.dados.nivelRio}</span>
      </div>

      <div class="info-card rain">
        <div class="label-group">
          <i data-feather="cloud-drizzle" class="icon-purple"></i>
          <span class="label">Previsão de Chuva:</span>
        </div>
        <span class="value">${cidadeInfo.dados.previsaoChuva}</span>
      </div>

      <div class="info-card water">
        <div class="label-group">
          <i data-feather="activity" class="icon-cyan"></i>
          <span class="label">Quantidade de Água:</span>
        </div>
        <span class="value">${cidadeInfo.dados.quantidadeAgua} mm</span>
      </div>

      <div class="info-card risk">
        <div class="label-group">
          <i data-feather="alert-triangle" class="icon-orange"></i>
          <span class="label">Nível de Risco:</span>
        </div>
        <span class="value risk-${cidadeInfo.dados.nivelRisco.toLowerCase()}">${
          cidadeInfo.dados.nivelRisco
        }</span>
      </div>

      <div class="info-card weather">
        <div class="label-group">
          <i data-feather="${getWeatherIcon(
            cidadeInfo.dados.clima
          )}" class="icon-yellow"></i>
          <span class="label">Clima:</span>
        </div>
        <span class="value">${cidadeInfo.dados.clima}</span>
      </div>
    </div>
  </div>
`;

        // Importante: Precisa chamar feather.replace() após inserir os ícones
        feather.replace();

        weatherInfo.classList.remove("hidden");
      } else {
        weatherInfo.innerHTML =
          "<p>Dados não encontrados para a cidade selecionada.</p>";
        weatherInfo.classList.remove("hidden");
      }
    });
  } else {
    console.error("Elemento 'weather-form' não encontrado.");
  }

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

  const contatoForm = document.getElementById("contatoForm");
  if (contatoForm) {
    contatoForm.addEventListener("submit", handleContactFormSubmission);
  } else {
    console.error("Elemento 'contatoForm' não encontrado.");
  }
});

// Carregar Navbar
async function loadNavbar() {
  try {
    const response = await fetch("navbar.html");
    if (!response.ok) {
      throw new Error(`Erro ao carregar o navbar: ${response.statusText}`);
    }
    const data = await response.text();
    document.getElementById("main-header").innerHTML = data;
    console.log("Navbar carregado com sucesso!");
    feather.replace();
  } catch (error) {
    console.error(error);
  }
}

// Manipulação do formulário de contato
async function handleContactFormSubmission(e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value,
  };

  try {
    const response = await fetch("https://formspree.io/f/mqakeern", {
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

function toggleInfo(infoId) {
  const infoDiv = document.getElementById(infoId);
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "block";
  } else {
    infoDiv.style.display = "none";
  }
}

function loadFooter() {
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o footer: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const footer = document.createElement("footer");
      footer.innerHTML = data;
      document.body.appendChild(footer);
    })
    .catch((error) => {
      console.error("Erro ao carregar o footer:", error);
    });
}

// Chame a função para carregar o footer
document.addEventListener("DOMContentLoaded", loadFooter);

// Função para simular o envio de SMS
function enviarSMS(alertaId) {
  console.log(`Enviando SMS para o alerta de ID: ${alertaId}`);
  alert(`SMS de alerta enviado para os usuários da região com o alerta ${alertaId}.`);
}

// Função para exibir os alertas de risco
function mostrarAlertas() {
  const alertas = document.getElementById("alertas-risco");
  alertas.classList.remove("hidden"); // Torna a seção visível
  console.log("Exibindo alertas de risco.");
}

// Exemplo de como os alertas seriam inseridos dinamicamente (em uma aplicação real, isso viria de uma API)
document.addEventListener("DOMContentLoaded", function() {
  mostrarAlertas();
});

document.getElementById('relato-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impedir que o formulário seja enviado da maneira tradicional
  
  // Capturar os dados do formulário
  const localizacao = document.getElementById('localizacao').value;
  const tipoIncidente = document.getElementById('tipo-incidente').value;
  const descricao = document.getElementById('descricao').value;

  // Adicionar um marcador no mapa (aqui simulamos com coordenadas fixas para o exemplo)
  L.marker([-15.7801, -47.9292]).addTo(map)
    .bindPopup(`<strong>${tipoIncidente}</strong><br>${descricao}<br><em>${localizacao}</em>`);

  // Mostrar uma mensagem de sucesso
  document.getElementById('mensagem-sucesso').style.display = 'block';

  // Limpar o formulário
  document.getElementById('relato-form').reset();
});