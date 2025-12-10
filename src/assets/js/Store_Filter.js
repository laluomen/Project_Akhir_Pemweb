// /dist/assets/js/filter_store.js
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll("[data-category]");

  if (!filterButtons.length || !items.length) {
    // Jika tidak ada tombol atau item, langsung keluar
    return;
  }

  // Fungsi untuk set filter
  function applyFilter(filter) {
    items.forEach((item) => {
      const itemCategory = item.dataset.category;

      if (filter === "all" || itemCategory === filter) {
        // Tampilkan item
        item.classList.remove("d-none");
      } else {
        // Sembunyikan item
        item.classList.add("d-none");
      }
    });
  }

  // Fungsi untuk update tampilan tombol aktif
  function setActiveButton(activeButton) {
    filterButtons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-secondary");
    });

    activeButton.classList.remove("btn-outline-secondary");
    activeButton.classList.add("btn-primary");
  }

  // Pasang event ke semua tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      applyFilter(filterValue);
      setActiveButton(button);
    });
  });

  // Default: saat pertama kali load, tampilkan semua
  applyFilter("all");
});
