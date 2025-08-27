 // Seleciona o botão com id 'searchBtn' e adiciona um evento de clique
 document.getElementById('searchBtn').addEventListener('click', async () => {

    // Pega o valor digitado no input de id 'movieSearch'
    const searchTerm = document.getElementById('movieSearch').value;
  
    // Se o campo estiver vazio, mostra um alerta e interrompe a execução
    if (!searchTerm) {
      alert("Digite um termo de busca!");
      return; // para a função
    }
    
    // Define a chave da API da OMDB (precisa ser válida para funcionar)
    const apiKey = '';  
    // Monta a URL para buscar filmes na API com base no termo digitado
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
  
    try {
      // Faz a requisição à API (assíncrona, por isso usa await)
      const response = await fetch(url);
      // Converte a resposta da API em JSON
      const data = await response.json();
  
      // Pega o elemento HTML onde os filmes serão exibidos
      const moviesContainer = document.getElementById('moviesList');
      // Pega o elemento da mensagem de "nenhum resultado encontrado"
      const emptyMessage = document.getElementById('emptyMessage');
      
      // Se a resposta da API foi bem-sucedida (encontrou filmes)
      if (data.Response === 'True') {
        // Esconde a mensagem de "nenhum resultado"
        emptyMessage.hidden = true;
  
        // Extrai a lista de filmes retornada
        const movies = data.Search;
        // Limpa o container antes de exibir novos resultados
        moviesContainer.innerHTML = '';  
  
        // Para cada filme encontrado...
        movies.forEach(movie => {
          // Cria uma div para representar o filme
          const movieElement = document.createElement('div');
          movieElement.className = 'movie'; // adiciona a classe CSS 'movie'
          
          // Define o conteúdo da div com poster, título, tipo e ano
          movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster" />
            <div class="movie-details">
              <h2>${movie.Title} (${movie.Year})</h2>
              <p><strong>Tipo:</strong> ${movie.Type}</p>
              <p><strong>Ano:</strong> ${movie.Year}</p>
            </div>
          `;
          // Adiciona a div criada dentro do container principal
          moviesContainer.appendChild(movieElement);
        });
  
      } else {
        // Se não encontrou nenhum filme, mostra a mensagem de vazio
        emptyMessage.hidden = false;
      }
    } catch (error) {
      // Se der erro na requisição, mostra um alerta ao usuário
      alert('Erro ao buscar os filmes!');
    }
  });