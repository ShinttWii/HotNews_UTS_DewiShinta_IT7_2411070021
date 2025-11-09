// 🔍 Fitur pencarian sesuai kategori halaman
$(document).on("submit", "#searchForm", function(e) {
  e.preventDefault();
  const keyword = $("#searchInput").val().trim();
  if (!keyword) return;

  const container = $("#news-container");
  container.html("<p class='text-center text-muted'>Mencari berita...</p>");

  const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";

  // Tentukan kategori berdasarkan judul halaman
  let category = "general";
  const title = $("h2").text().toLowerCase();
  if (title.includes("business")) category = "business";
  else if (title.includes("technology")) category = "technology";
  else if (title.includes("sport")) category = "sports";

  // 🔗 URL API News + proxy
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`;
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  $.getJSON(proxyUrl, function(data) {
    container.html("");
    if (!data.articles || !data.articles.length) {
      container.html("<p class='text-center text-muted'>Berita tidak ditemukan untuk kategori ini.</p>");
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
  }).fail(() => {
    container.html("<p class='text-center text-danger'>Gagal memuat hasil pencarian.</p>");
  });
});
