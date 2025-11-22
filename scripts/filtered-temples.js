const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "images/temple-switzerland.jpg"   // ← caminho local que existe
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "images/temple-switzerland.jpg"
    },
    {
        templeName: "Bern Switzerland",
        location: "Bern, Switzerland",
        dedicated: "1955, September, 11",
        area: 35500,
        imageUrl: "images/temple-switzerland.jpg"
    }
];

const cardsContainer = document.querySelector("#temple-cards");
const pageTitle = document.querySelector("#page-title");
const nav = document.querySelector("#primary-nav");
const srStatus = document.querySelector("#sr-status");
const hamburger = document.querySelector("#hamburger");

const getYear = (temple) => parseInt(temple.dedicated.split(",")[0], 10);

function renderTemples(list) {
    cardsContainer.innerHTML = "";

    list.forEach((t) => {
        const figure = document.createElement("figure");

        figure.innerHTML = `
      <img
        src="${t.imageUrl}"
        alt="${t.templeName} Temple"
        loading="lazy"
        width="400"
        height="250"
      >
      <figcaption>
        <h3>${t.templeName}</h3>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

        cardsContainer.appendChild(figure);
    });


    if (srStatus) {
        srStatus.textContent = `${list.length} temple cards displayed.`;
    }
}

function setActiveFilter(filter) {
    const links = nav.querySelectorAll("a[data-filter]");
    links.forEach((link) => {
        const isActive = link.dataset.filter === filter;
        link.classList.toggle("active", isActive);
    });


    const labelMap = {
        home: "Home",
        old: "Old Temples (before 1900)",
        new: "New Temples (after 2000)",
        large: "Large Temples (> 90,000 sq ft)",
        small: "Small Temples (< 10,000 sq ft)"
    };

    if (pageTitle) {
        pageTitle.textContent = labelMap[filter] || "Temples";
    }
}

function applyFilter(filter) {
    let filtered = temples;

    switch (filter) {
        case "old":
            filtered = temples.filter((t) => getYear(t) < 1900);
            break;
        case "new":
            filtered = temples.filter((t) => getYear(t) > 2000);
            break;
        case "large":
            filtered = temples.filter((t) => t.area > 90000);
            break;
        case "small":
            filtered = temples.filter((t) => t.area < 10000);
            break;
        case "home":
        default:
            filtered = temples;
    }

    setActiveFilter(filter);
    renderTemples(filtered);
}


nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("a[data-filter]")) {
        event.preventDefault();
        const filter = target.dataset.filter;
        applyFilter(filter);


        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        }
    }
});


hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    if (srStatus) {
        srStatus.textContent = isOpen ? "Menu opened" : "Menu closed";
    }
});


const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastMod = document.getElementById("lastModified");
if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
}


applyFilter("home");
