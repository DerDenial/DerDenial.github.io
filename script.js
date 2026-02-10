document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const sidebarClose = document.getElementById("sidebarClose");
  const darkToggle = document.getElementById("darkModeToggle");
  const fab = document.getElementById("fab");
  const wishlist = document.getElementById("wishlist");
  const filter = document.getElementById("categoryFilter");

  // 🌙 Darkmode Setup
  const isDark = localStorage.getItem("darkmode") === "true";
  document.documentElement.classList.toggle("darkmode", isDark);
  darkToggle.checked = isDark;
  darkToggle.addEventListener("change", () => {
    const checked = darkToggle.checked;
    document.documentElement.classList.toggle("darkmode", checked);
    localStorage.setItem("darkmode", checked);
  });

  // 📂 Sidebar
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    fab.classList.add("open");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    fab.classList.remove("open");
  }
  fab.addEventListener("click", () =>
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar()
  );
  sidebarClose.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // 🎁 Modal
  const modal = document.getElementById("previewModal");
  const modalImg = document.getElementById("previewImg");
  const modalName = document.getElementById("previewName");
  const modalPrice = document.getElementById("previewPrice");
  const modalNeed = document.getElementById("previewNeed");
  const modalComment = document.getElementById("previewComment");
  const orderButton = document.getElementById("orderButton");
  const closeModal = document.getElementById("closeModal");

  closeModal.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });

  const renderStars = (n = 0) => "★".repeat(n) + "☆".repeat(5 - n);

  const openPreview = item => {
    modalImg.src = item.image;
    modalName.textContent = item.name;
    modalPrice.textContent = item.price ? `💰 ${item.price}` : "";
    modalNeed.innerHTML = renderStars(item.need || 0);
    modalComment.textContent = item.comment || "Kein Kommentar vorhanden.";
    orderButton.href = item.link;
    modal.classList.add("active");
  };

  // 📦 JSON laden
  let items = [];
  try {
    const res = await fetch("items.json");
    if (!res.ok) throw new Error(res.status);
    items = await res.json();
  } catch (err) {
    console.error("Konnte items.json nicht laden", err);
  }

  // 🪄 Fade-In
  function observeElement(el) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  }

  // 🎨 Wishlist anzeigen
  function renderWishlist(category = "all") {
    wishlist.innerHTML = "";
    items
      .filter(i => category === "all" || i.category.toLowerCase() === category.toLowerCase())
      .forEach(item => {
        const li = document.createElement("li");
        li.className = "wish";
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="wish-details">
            <span class="wish-title">${item.name}</span>
            <div class="status">${item.status}</div>
          </div>
        `;
        li.addEventListener("click", () => openPreview(item));
        wishlist.appendChild(li);
        observeElement(li);
      });
  }

  filter.addEventListener("change", e => renderWishlist(e.target.value));
  renderWishlist();
});
