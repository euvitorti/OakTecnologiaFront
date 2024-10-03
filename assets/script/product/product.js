// Retrieves the token from localStorage
const token = localStorage.getItem('Bearer Token');

async function listProducts() {
    try {
        // Checks if the token exists before making the request
        if (!token) {
            throw new Error('Token not available.');
        }

        // Sends a GET request to fetch products
        const response = await fetch('http://localhost:8080/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Adds the Bearer token in the header
            }
        });

        // Throws an error if the response is not successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - Failed to fetch products.`);
        }

        // Parses the response JSON to retrieve the product list
        const products = await response.json();

        // Sorts the products by price in ascending order
        products.sort((a, b) => a.productPrice - b.productPrice);

        // Updates the UI with the product data
        const productsTableBody = document.querySelector('#products-table tbody');
        productsTableBody.innerHTML = ''; // Clears the current table content

        // Function to create table cells
        const createCell = (content) => {
            const cell = document.createElement('td');
            cell.textContent = content;
            return cell;
        };

        // Loops through the product list and inserts the data into the table
        products.forEach(product => {
            const row = document.createElement('tr');

            row.appendChild(createCell(product.productName));
            row.appendChild(createCell(product.productDescription));
            row.appendChild(createCell(`R$ ${product.productPrice.toFixed(2)}`));
            row.appendChild(createCell(product.availableForSale ? 'Yes' : 'No'));

            // Adds the row to the table
            productsTableBody.appendChild(row);
        });
    } catch (error) {
        // Logs the error and displays an alert message
        console.error('Error fetching products:', error);
        alert(`Error: ${error.message}`);
    }
}

// Adds an event listener for the form submission
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Collects form data
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const availableForSale = document.getElementById('availableForSale').checked;

    // Creates an object with the product data
    const productData = {
        productName: productName,              // Product Name
        productDescription: productDescription, // Product Description
        productPrice: productPrice,            // Product Price
        availableForSale: availableForSale     // Available for Sale
    };

    try {
        // Sends a POST request to register the product
        const response = await fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Adds the Bearer token in the header
            },
            body: JSON.stringify(productData) // Converts the product data to JSON
        });

        // Checks if the response is successful
        if (!response.ok) {
            throw new Error('Failed to register the product'); // Throws an error if the request fails
        } else {
            listProducts(); // Calls listProducts to refresh the product list after adding a new one
        }

        // const result = await response.json(); // Optionally retrieves the response in JSON
        // alert(result); // Optionally displays a success message
    } catch (error) {
        // Logs the error and displays an alert message
        console.error('Error:', error);
        alert('Error registering the product.');
    }
});
