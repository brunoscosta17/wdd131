function setCurrentYear() {
    const span = document.querySelector('#current-year');
    if (span) {
        span.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
});
