function getRoundedOsloTimestamp() {
  // Get the current date and time in Oslo's timezone
  const osloTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Oslo",
  });

  const now = new Date(osloTime);

  // Define the target hours and minutes for rounding
  const targetTimes = [
      { hours: 0, minutes: 10 },
      { hours: 8, minutes: 10 },
      { hours: 16, minutes: 10 },
  ];

  // Convert the target times to Date objects for comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDates = targetTimes.map(({ hours, minutes }) => {
      return new Date(today.getTime() + hours * 3600000 + minutes * 60000);
  });

  // Determine the latest target time that is <= current time
  let selectedTime = targetDates[0];
  for (let i = 0; i < targetDates.length; i++) {
      if (now >= targetDates[i]) {
          selectedTime = targetDates[i];
      }
  }

  // If current time is before 00:10, roll back to the previous day at 16:10
  if (now < targetDates[0]) {
      selectedTime = new Date(targetDates[2].getTime() - 24 * 3600000);
  }

  return selectedTime.toISOString();
}

// Fetch data from data.json and render the content
fetch('master.json?time='+getRoundedOsloTimestamp())
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