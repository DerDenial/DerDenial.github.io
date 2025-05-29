document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    
    // Kürzerer Loading Screen (1.5s gesamt)
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            ladeWunschliste();
        }, 600); // Ausblend-Animation
    }, 900); // Verkürzte Wartezeit (900ms + 600ms = 1.5s)
});

function ladeWunschliste() {
    fetch('wunschliste.json')
        .then(response => response.json())
        .then(items => {
            const liste = document.getElementById("wunschliste");
            
            // Container sichtbar machen
            document.querySelector('.wunschliste-container').style.opacity = 1;
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    const li = document.createElement("li");
                    li.classList.add("wunschliste-item");
                    
                    li.innerHTML = `
                        <img src="${item.bild}" alt="${item.name}" />
                        <div class="text">
                            <div class="name">${item.name}</div>
                            <div class="beschreibung">${item.beschreibung}</div>
                            <div class="price">${item.preis}</div>
                        </div>
                    `;
                    
                    li.addEventListener("click", () => {
                        window.location.href = item.url;
                    });
                    
                    liste.appendChild(li);
                    
                    // Animation mit Verzögerung auslösen
                    setTimeout(() => {
                        li.classList.add("visible");
                    }, 10);
                    
                }, index * 250); // 250ms Abstand zwischen Items
            });
        })
        .catch(error => console.error('Fehler:', error));
}
