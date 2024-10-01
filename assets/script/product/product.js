import { getDefaultHeaders } from '../../header/header'; // Importa as configurações de cabeçalho

// Função para listar os produtos
async function listProducts() {
    try {
        // Faz uma requisição GET para o endpoint que retorna os produtos
        const response = await fetch('http://localhost:8080/product', {
            method: 'GET',
            headers: getDefaultHeaders()
        });

        if (!response.ok) {
            throw new Error('A resposta da rede não foi ok: ' + response.statusText);
        }

        const data = await response.json(); // Retorna a resposta como JSON
        const tableBody = document.querySelector('#products-table tbody'); // Seleciona o corpo da tabela de produtos
        tableBody.innerHTML = ''; // Limpa os dados existentes

        // Verifica se há produtos na resposta
        if (data.content && data.content.length > 0) {
            // Ordena os produtos do menor para o maior preço
            const sortedProducts = data.content.sort((a, b) => a.productPrice - b.productPrice);

            // Cria e adiciona as linhas da tabela
            const rows = sortedProducts.map(product => {
                const row = document.createElement('tr'); // Cria uma nova linha para a tabela

                // Cria e adiciona a célula do nome do produto
                const nameCell = document.createElement('td');
                nameCell.textContent = product.productName; // Acesse o nome do produto
                row.appendChild(nameCell);

                // Cria e adiciona a célula da descrição do produto
                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = product.productDescription; // Acesse a descrição do produto
                row.appendChild(descriptionCell);

                // Cria e adiciona a célula do preço do produto
                const priceCell = document.createElement('td');
                priceCell.textContent = `R$ ${product.productPrice.toFixed(2)}`; // Formata o preço
                row.appendChild(priceCell);

                // Cria e adiciona a célula de disponibilidade para venda
                const availabilityCell = document.createElement('td');
                availabilityCell.textContent = product.availableForSale ? 'Sim' : 'Não'; // Verifica se está disponível
                row.appendChild(availabilityCell);

                return row; // Retorna a nova linha
            });

            // Adiciona todas as linhas ao corpo da tabela de uma vez
            tableBody.append(...rows);
        } else {
            console.error('Nenhum produto encontrado na resposta');
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Event listener para o formulário
document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os valores dos campos do formulário
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const availableForSale = document.getElementById('availableForSale').checked;

    // Cria um objeto com os dados do produto
    const productData = {
        productName,
        productDescription,
        productPrice,
        availableForSale
    };

    try {
        // Faz uma requisição POST para cadastrar o produto
        const response = await fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: getDefaultHeaders(),
            body: JSON.stringify(productData) // Converte os dados do produto para JSON
        });

        if (!response.ok) {
            throw new Error('A resposta da rede não foi ok: ' + response.statusText);
        }

        await response.json(); // Retorna a resposta como JSON
        alert('Produto cadastrado com sucesso');
        listProducts(); // Chama a função para listar produtos após o cadastro
    } catch (error) {
        alert('Erro ao cadastrar produto: ' + error.message);
    }
});

// Chama a função para listar produtos quando a página é carregada
document.addEventListener('DOMContentLoaded', listProducts);
