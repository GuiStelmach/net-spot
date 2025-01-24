// Função assíncrona para realizar a chamada à API Melhor Plano
async function fetchCoverageData(postcode, number) {
  // Construindo a URL com os parâmetros
  const url = `https://cep.melhorplano.net/api/v1/postcodes/coverage?timeout=20000&c=tim%2Csky%2Cunifique%2Cclaro%2Cvero+internet%2Cvivo%2Coi&number=${number}&postcode=${postcode}`;

  // Configuração dos cabeçalhos
  const headers = {
    "accept": "*/*",
    "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "if-none-match": "W/\"b8e-KzWpx3jTGTi5pdPElfoPO2GIhds\"",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://melhorplano.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  try {
    // Fazendo a requisição com fetch
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      body: null // Body é nulo porque o método é GET
    });

    // Verificando se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    // Convertendo a resposta para JSON
    const data = await response.json();

    // Filtrando provedores com velocidade mínima maior que zero
    const providersWithMinSpeed = Object.entries(data.postcodeRes.providers)
      .filter(([provider, details]) => details.data.speed.min > 0)  // Filtra provedores onde min > 0
      .map(([provider, details]) => provider);  // Retorna apenas o nome do provedor

    // Se não houver provedores com min > 0, retornar a mensagem personalizada
    if (providersWithMinSpeed.length === 0) {
      return "Sem Viabilidade TIM, SKY, Unifique, Claro, Vero, Vivo e Oi.";
    }

    return providersWithMinSpeed;
  } catch (error) {
    // Exibindo erros no console
    console.error("Erro ao buscar dados de cobertura:", error);
    throw error;
  }
}

// Exemplo de uso da função
fetchCoverageData(94820170, 528)
  .then(result => console.log(result))
  .catch(error => console.error("Erro na chamada da API:", error));