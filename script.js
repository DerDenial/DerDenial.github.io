document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
  
    // Test: Loading Screen für 3 Sekunden anzeigen
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1500); // Nach 3 Sekunden ausblenden
  });

// Funktion, um die Wunschliste von der externen JSON-Datei zu laden
function ladeWunschliste() {
    fetch('wunschliste.json') // Hier wird die JSON-Datei geladen
        .then(response => response.json()) // Antwort wird in JSON umgewandelt
        .then(items => {
            // Wunschliste in HTML umwandeln und anzeigen
            const liste = document.getElementById("wunschliste");

            // Alle Items durchgehen und hinzufügen
            items.forEach(item => {
                const li = document.createElement("li");
                li.classList.add("wunschliste-item");

                // Inneres HTML des Listeneintrags
                li.innerHTML = `
                    <img src="${item.bild}" alt="${item.name}" />
                    <div class="text">
                        <div class="name">${item.name}</div>
                        <div class="beschreibung">${item.beschreibung}</div>
                        <div class="price">${item.preis}</div>
                    </div>
                `;

                // Füge einen Klick-Event-Listener hinzu
                li.addEventListener("click", function() {
                    // Weiterleitung zur Produktseite
                    window.location.href = item.url;
                });

                liste.appendChild(li);
            });
        })
        .catch(error => console.error('Fehler beim Laden der Wunschliste:', error));
}

// Wunschliste beim Laden der Seite anzeigen
window.onload = ladeWunschliste;
