let products = [];

function extractData() {
    const urls = document.getElementById("urls").value
                  .split("\n")
                  .filter(u => u.trim() !== "");

    if (urls.length === 0) {
        alert("Please enter at least one URL.");
        return;
    }

    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
    products = [];

    urls.forEach((url, index) => {
        // Simulated data extraction
        const product = {
            name: `Product ${index + 1}`,
            price: (Math.floor(Math.random() * 500) + 10).toFixed(2),
            rating: (Math.random() * 5).toFixed(1)
        };
        products.push(product);

        // Add row to table
        const row = tbody.insertRow();
        row.insertCell(0).textContent = product.name;
        row.insertCell(1).textContent = `$${product.price}`;
        row.insertCell(2).textContent = product.rating;
    });

    alert(`Extracted data for ${products.length} products.`);
}

function downloadCSV() {
    if (products.length === 0) {
        alert("No data to download!");
        return;
    }

    const headers = ["Name", "Price", "Rating"];
    const rows = products.map(p =>
        [p.name, p.price, p.rating].map(v => `"${v}"`).join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
