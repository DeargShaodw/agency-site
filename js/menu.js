// ================================
// DATA SOURCE — switch between options
// Option 1: Local JSON (development/offline)
// Option 2: Google Sheets (live client data)
// Comment out the one you are not using
// ================================

// OPTION 1 — Local JSON
// async function fetchMenuData() {
//     const response = await fetch('../menu.json');
//     const items = await response.json();
//     return items;
// }

// // OPTION 2 — Google Sheets (CSV export)
async function fetchMenuData() {
    const SHEET_ID = '1w_zX5XL-_4ZPHHvJpwBODt7Y-VkLMmOxgS311T8SybA';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    const response = await fetch(url);
    const csv = await response.text();
    return parseCSV(csv);
}

// CSV parser — converts Google Sheets CSV to item array
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
        const item = {};
        headers.forEach((header, i) => {
            item[header.trim()] = values[i] ? values[i].replace(/^"|"$/g, '').trim() : '';
        });
        item.price = parseFloat(item.price);
        return item;
    });
}

// ================================
// RENDER
// ================================


async function loadMenu() {
    const loading = document.querySelector('#menu-loading');
    const error = document.querySelector('#menu-error');
    const grid = document.querySelector('#menu-grid');

    try {
        const response = await fetch('../menu.json');
        const items = await response.json();

        loading.style.display = 'none';

        const categories = [...new Set(items.map(item => item.category))];

        categories.forEach(category => {
            const section = document.createElement('div');
            section.classList.add('menu-category');

            const heading = document.createElement('h2');
            heading.textContent = category;
            section.appendChild(heading);

            const categoryItems = items.filter(item => item.category === category);

            categoryItems.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('menu-item');
                card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-header">
                        <h3>${item.name}</h3>
                        <span class="menu-item-price">$${item.price}</span>
                    </div>
                    <p>${item.description}</p>
                `;
                section.appendChild(card);
            });

            grid.appendChild(section);
        });

    } catch(err) {
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

loadMenu();