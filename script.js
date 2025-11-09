const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";

$(document).ready(function() {
  // Load navbar & footer
  $("#navbar-container").load("navbar.html", function() {
    const current = location.pathname.split("/").pop();
    $(".nav-link").each(function() {
      if ($(this).attr("href") === current) {
        $(this).addClass("active");
      }
    });
  });

  $("#footer-container").load("footer.html");

  // Load berita pertama kali
  loadNews("general");

  // Klik kategori
  $(".news-category").click(function() {
    const category = $(this).data("category");
    loadNews(category);
  });

  // 🔍 Event untuk pencarian
  $("#search-form").on("submit", function(e) {
    e.preventDefault();
    const query = $("#search-input").val().trim();
    if (query) {
      searchNews(query);
    }
  });
});

// ====== FUNGSI UTAMA UNTUK MEMUAT BERITA BERDASARKAN KATEGORI ======
function loadNews(category = "general") {
  const container = $("#news-container");
  container.html("<p class='text-center text-muted'>Loading news...</p>");

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  $.getJSON(proxyUrl, function(data) {
    renderNews(data, container);
  }).fail(() => {
    container.html("<p class='text-center text-danger'>Failed to load news.</p>");
  });
}

// ====== FUNGSI UNTUK PENCARIAN BERITA ======
function searchNews(query) {
  const container = $("#news-container");
  container.html("<p class='text-center text-muted'>Searching news...</p>");

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=9&apiKey=${apiKey}`;
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  $.getJSON(proxyUrl, function(data) {
    renderNews(data, container, `Results for "${query}"`);
  }).fail(() => {
    container.html("<p class='text-center text-danger'>Failed to search news.</p>");
  });
}

// ====== FUNGSI UNTUK RENDER BERITA KE HALAMAN ======
function renderNews(data, container, title = "") {
  container.html("");

  if (title) {
    container.append(`<h5 class="text-center text-primary mb-3">${title}</h5>`);
  }

  if (!data.articles || !data.articles.length) {
    container.html("<p class='text-center text-muted'>No news available.</p>");
    return;
  }

  data.articles.slice(0, 9).forEach(a => {
    container.append(`
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img src="${a.urlToImage || 'https://via.placeholder.com/400x200'}" 
               class="card-img-top" style="height:180px;object-fit:cover;">
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
}
