// Inicializar o mapa centralizado no RS
var map = L.map('mapa-exemplo').setView([-30.0346, -51.2177], 7); // Centralizado no RS

// Adicionar tile layer do OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Adicionar relatos reais das inundações no RS
L.marker([-29.6842, -53.8069]).addTo(map)
  .bindPopup('<strong>Sobradinho</strong><br>Inundação severa, várias áreas urbanas alagadas.<br><em>Setembro 2023</em>');

L.marker([-29.5393, -53.3902]).addTo(map)
  .bindPopup('<strong>Santa Maria</strong><br>Chuvas intensas causaram enchentes que deixaram dezenas de desabrigados.<br><em>Setembro 2023</em>');

L.marker([-29.7127, -52.4241]).addTo(map)
  .bindPopup('<strong>Venâncio Aires</strong><br>Inundações causadas pelo aumento do nível dos rios.<br><em>Setembro 2023</em>');

L.marker([-28.2537, -52.4068]).addTo(map)
  .bindPopup('<strong>Passo Fundo</strong><br>Chuvas intensas deixaram vários bairros alagados.<br><em>Setembro 2023</em>');

L.marker([-29.1687, -51.1791]).addTo(map)
  .bindPopup('<strong>Caxias do Sul</strong><br>Região enfrentou enchentes e deslizamentos.<br><em>Setembro 2023</em>');

L.marker([-30.0346, -51.2177]).addTo(map)
  .bindPopup('<strong>Porto Alegre</strong><br>Várias áreas da capital gaúcha ficaram alagadas devido às fortes chuvas.<br><em>Setembro 2023</em>');
