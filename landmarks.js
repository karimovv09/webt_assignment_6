function sortLandmarks(order) {
    const list = document.getElementById('landmarksList');
    const items = Array.from(list.getElementsByTagName('li'));

    const sortedItems = items.sort((a, b) => {
        const yearA = parseYear(a.querySelector('.badge').textContent);
        const yearB = parseYear(b.querySelector('.badge').textContent);

        return order === 'asc' ? yearA - yearB : yearB - yearA;
    });

    list.innerHTML = '';

    sortedItems.forEach(item => list.appendChild(item));
}

function parseYear(yearString) {
    if (yearString.includes('BC')) {
        return -parseInt(yearString.replace(' BC', ''));
    } else {
        return parseInt(yearString.replace(' AD', ''));
    }
}
