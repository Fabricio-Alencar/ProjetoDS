        card.innerHTML = `
        <h2 class="recipe-title">${r.titulo}</h2>
        <div class="recipe-price">
            <div class="recipe-type">
                <img src="${icons[r.tipo]}" alt="${r.tipo}">
                <span>${r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}</span>
            </div>
            <div class="recipe-price">
                <img class="price-icon" src="static/imagens/lixeira.png" alt="Ícone de preço">
                <span><strong>Preço:</strong> <span class="price-value">${r.preco || 'N/A'}</span></span>
            </div>
        </div>
        `;