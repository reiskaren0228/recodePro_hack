let visibilidadeRegioes = {
    alto: false,
    medio: false,
    baixo: false
  };
  
  // Função para alternar a visibilidade das outras regiões
  function toggleRegioes(nivel) {
    const regioesContainer = document.getElementById('regioes-container');
    const detalhesRegioes = document.getElementById('detalhes-regioes');
  
    // Limpa as regiões anteriores
    regioesContainer.innerHTML = '';
  
    // Verifica se a seção já está visível
    visibilidadeRegioes[nivel] = !visibilidadeRegioes[nivel];
  
    // Esconde a seção se já estava visível
    if (!visibilidadeRegioes[nivel]) {
      detalhesRegioes.classList.add('hidden');
      return;
    }
  
    // Exibe as regiões correspondentes ao alerta
    let regioes = [];
    if (nivel === 'alto') {
      regioes = [
        { regiao: 'Várzea Grande', alerta: 'Alerta Alto de Inundação', classe: 'regiao-alto' },
        { regiao: 'Cáceres', alerta: 'Risco de Inundação Elevado', classe: 'regiao-alto' }
      ];
    } else if (nivel === 'medio') {
      regioes = [
        { regiao: 'Rondonópolis', alerta: 'Chuvas Fortes nas Próximas 48h', classe: 'regiao-medio' },
        { regiao: 'Sinop', alerta: 'Previsão de Chuvas Intensas', classe: 'regiao-medio' }
      ];
    } else if (nivel === 'baixo') {
      regioes = [
        { regiao: 'Tangará da Serra', alerta: 'Risco Baixo de Tempestades', classe: 'regiao-baixo' },
        { regiao: 'Barra do Garças', alerta: 'Condições Climáticas Favoráveis', classe: 'regiao-baixo' }
      ];
    }
  
    // Preenche o container com as novas regiões e aplica a classe de cor correta
    regioes.forEach(regiao => {
      const card = document.createElement('div');
      card.classList.add('regiao-card', regiao.classe);
      card.innerHTML = `
        <h3>${regiao.regiao}</h3>
        <p>${regiao.alerta}</p>
      `;
      regioesContainer.appendChild(card);
    });
  
    // Exibe a seção de detalhes
    detalhesRegioes.classList.remove('hidden');
  }
  
  