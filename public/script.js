// Fetch data from data.json and render the content
fetch('data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then((data) => {
    renderProducts(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear existing content

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    // Product Name
    const name = document.createElement('h2');
    name.textContent = product.name;

    // Prices Table
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>Store</th><th>Price</th><th>In Stock</th>`;
    table.appendChild(headerRow);

    product.prices.forEach((price) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="${price.url}" target="_blank">${new URL(price.url).hostname}</a></td>
        <td>${price.price} NOK</td>
        <td>${price.inStock ? 'Yes' : 'No'}</td>
      `;
      table.appendChild(row);
    });

    productDiv.appendChild(name);
    productDiv.appendChild(table);
    productList.appendChild(productDiv);
  });
}
