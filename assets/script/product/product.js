// Obtém o token do localStorage
const token = localStorage.getItem('Bearer Token');

// Função para listar os produtos e atualizar a tabela
async function listProducts() {
    try {
        const response = await fetch('http://localhost:8080/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Adiciona o token Bearer no cabeçalho
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar produtos.');
        }

        const products = await response.json(); // Obtém a lista de produtos

        // Atualiza a interface com os produtos
        const productsTableBody = document.querySelector('#products-table tbody');
        productsTableBody.innerHTML = ''; // Limpa a tabela atual

        // Percorre a lista de produtos e insere os dados na tabela
        products.forEach(product => {
            const row = document.createElement('tr');

            const productNameCell = document.createElement('td');
            productNameCell.textContent = product.productName;
            row.appendChild(productNameCell);

            const productDescriptionCell = document.createElement('td');
            productDescriptionCell.textContent = product.productDescription;
            row.appendChild(productDescriptionCell);

            const productPriceCell = document.createElement('td');
            productPriceCell.textContent = `R$ ${product.productPrice.toFixed(2)}`;
            row.appendChild(productPriceCell);

            const availableForSaleCell = document.createElement('td');
            availableForSaleCell.textContent = product.availableForSale ? 'Sim' : 'Não';
            row.appendChild(availableForSaleCell);

            // Adiciona a linha na tabela
            productsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao buscar produtos.');
    }
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Coleta os dados do formulário
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const availableForSale = document.getElementById('availableForSale').checked;

    const productData = {
        productName: productName,              // Nome do Produto
        productDescription: productDescription, // Descrição do Produto
        productPrice: productPrice,            // Preço do Produto
        availableForSale: availableForSale // Disponível para Venda
    };

    try {
        const response = await fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Adiciona o token Bearer no cabeçalho
            },
            body: JSON.stringify(productData) // Converte os dados do produto para JSON
        });

        if (!response.ok) {
            throw new Error('Failed to register the product'); // Lança erro se a resposta não for bem-sucedida
        } else {
            alert("Já foi");
            listProducts();
        }

        // const result = await response.json(); // Obtém a resposta em JSON
        // alert(result); // Exibe uma mensagem de sucesso
    } catch (error) {
        console.error('Error:', error); // Loga o erro no console
        alert('Error registering the product.'); // Exibe mensagem de erro
    }
});
