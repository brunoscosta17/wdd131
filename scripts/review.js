document.addEventListener("DOMContentLoaded", () => {
    const storageKey = "reviewCount";
    const currentCount = Number(localStorage.getItem(storageKey) || "0");
    const newCount = currentCount + 1;
    localStorage.setItem(storageKey, String(newCount));

    const countElement = document.querySelector("#reviewCount");
    if (countElement) {
        countElement.textContent = newCount;
    }

    const params = new URLSearchParams(window.location.search);

    const product = params.get("productName") || "Not provided";
    const rating = params.get("rating") || "Not provided";
    const date = params.get("installationDate") || "Not provided";
    const name = params.get("userName") || "Anonymous";

    document.querySelector("#summaryProduct").textContent = product;
    document.querySelector("#summaryRating").textContent = rating;
    document.querySelector("#summaryDate").textContent = date;
    document.querySelector("#summaryName").textContent = name;
});
