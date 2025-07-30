const newsContainer = document.getElementById("newsContainer");
const apiKey = "b2310664b5fb45c5b8c74e9d87c49216";
const newsApiUrl = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=20&apiKey=${apiKey}`;

async function fetchNews() {
  newsContainer.textContent = "Loading latest currency news...";

  try {
    const res = await fetch(newsApiUrl);
    const data = await res.json();

    if (data.status !== "ok") {
      newsContainer.textContent = "Failed to load news.";
      return;
    }

    if (data.articles.length === 0) {
      newsContainer.textContent = "No news available.";
      return;
    }

    newsContainer.innerHTML = ""; // Clear old content

    data.articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "news-article";

      const date = new Date(article.publishedAt);
      const now = new Date();
      const diffMinutes = Math.floor((now - date) / 60000);

      let timeAgo;
      if (diffMinutes < 1) timeAgo = "Just now";
      else if (diffMinutes < 60) timeAgo = `${diffMinutes}m ago`;
      else timeAgo = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      articleDiv.innerHTML = `
        <div class="news-left">
          <span class="news-source">${article.source.name}</span>
          <span class="news-time">${timeAgo}</span>
        </div>
        <div class="news-right">
          <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-title">${article.title}</a>
        </div>
      `;

      newsContainer.appendChild(articleDiv);
    });
  } catch (error) {
    newsContainer.textContent = "Error loading news.";
    console.error(error);
  }
}

fetchNews();
