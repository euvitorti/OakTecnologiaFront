document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Coleta os dados do formulário
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const availableForSale = document.getElementById('availableForSale').checked;

    // Obtém o token do localStorage
    const token = localStorage.getItem('Bearer Token');

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
                'Authorization': `Bearer ${token}` // Adiciona o token Bearer no cabeçalho
            },
            body: JSON.stringify(productData) // Converte os dados do produto para JSON
        });

        if (!response.ok) {
            throw new Error('Failed to register the product'); // Lança erro se a resposta não for bem-sucedida
        }

        const result = await response.json(); // Obtém a resposta em JSON
        alert(result); // Exibe uma mensagem de sucesso
    } catch (error) {
        console.error('Error:', error); // Loga o erro no console
        alert('Error registering the product.'); // Exibe mensagem de erro
    }
});
