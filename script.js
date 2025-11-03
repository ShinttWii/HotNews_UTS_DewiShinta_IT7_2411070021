$(document).ready(function() {
  // Load navbar & footer di semua halaman
  $("#navbar-container").load("navbar.html", function() {
    const current = location.pathname.split("/").pop();
    $(".nav-link").each(function() {
      if ($(this).attr("href") === current) {
        $(this).addClass("active");
      }
    });
  });

  $("#footer-container").load("footer.html");

  // Load berita default kategori "general" saat halaman pertama kali dibuka
  loadNews("general");

  // Event klik kategori (misal tombol atau nav kategori)
  $(".news-category").click(function() {
    const category = $(this).data("category");
    loadNews(category);
  });
});

// Fungsi ambil berita via serverless function Vercel
function loadNews(category = "general") {
  const container = $("#news-container");
  container.html("<p class='text-center text-muted'>Loading news...</p>");

  // Panggil serverless function /api/news
  $.get(`/api/news?category=${category}`)
    .done(function (data) {
      container.html("");

      if (!data.articles || data.articles.length === 0) {
        container.html("<p class='text-center text-muted'>No news available.</p>");
        return;
      }

      data.articles.slice(0, 9).forEach(a => {
        container.append(`
          <div class="col-md-4 col-sm-6">
            <div class="card h-100 shadow-sm border-0">
              <img src="${a.urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" style="height:180px;object-fit:cover;">
              <div class="card-body d-flex flex-column">
                <h6 class="fw-bold text-primary">${a.title || 'No Title'}</h6>
                <small class="text-muted mb-2">${a.source?.name || ''}</small>
                <p class="text-truncate">${a.description || 'No description available.'}</p>
                <a href="${a.url}" target="_blank" class="btn btn-primary btn-sm mt-auto">Read More</a>
              </div>
            </div>
          </div>
        `);
      });
    })
    .fail(function () {
      container.html("<p class='text-center text-danger'>Failed to load news.</p>");
    });
}
