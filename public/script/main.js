document.addEventListener('DOMContentLoaded', () => {
    const kurirElements = document.querySelectorAll('.kurir');
    const filterDateElement = document.getElementById('filterDate');

    kurirElements.forEach(kurir => {
        kurir.addEventListener('click', () => {
            const kurirId = kurir.getAttribute('data-id');
            const filterDate = filterDateElement.value;
            window.location.href = `/riwayat?kurirId=${kurirId}&date=${filterDate}`;
        });
    });

    filterDateElement.addEventListener('change', () => {
        const kurirId = new URLSearchParams(window.location.search).get('kurirId');
        const filterDate = filterDateElement.value;
        window.location.href = `/riwayat?kurirId=${kurirId}&date=${filterDate}`;
    });
});
