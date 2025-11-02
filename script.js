const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";

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
});

// Fungsi ambil berita
function loadNews(category = "general") {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
  const container = $("#news-container");

  // Tambahkan teks loading sebelum ambil data
  container.html("<p class='text-center text-muted'>Loading news...</p>");

  // Ambil data lewat proxy (biar gak kena CORS block)
  $.getJSON(proxyUrl, function(data) {
    container.html(""); // kosongkan lagi setelah data datang

    if (!data.articles || !data.articles.length) {
      container.html("<p class='text-center text-muted'>No news available.</p>");
      return;
    }

    data.articles.forEach((a, i) => {
      if (i < 9) {
        container.append(`
          <div class="col-md-4 col-sm-6">
            <div class="card h-100 shadow-sm border-0">
              <img src="${a.urlToImage || 'https://via.placeholder.com/400x200'}"
                   class="card-img-top" style="height:180px;object-fit:cover;">
              <div class="card-body d-flex flex-column">
                <h6 class="fw-bold text-primary">${a.title || 'No Title'}</h6>
                <small class="text-muted mb-2">${a.source.name || ''}</small>
                <p class="text-truncate">${a.description || 'No description available.'}</p>
                <a href="${a.url}" target="_blank" class="btn btn-primary btn-sm mt-auto">Read More</a>
              </div>
            </div>
          </div>
        `);
      }
    });
  }).fail(() => {
    container.html("<p class='text-center text-danger'>Failed to load news.</p>");
  });
}
