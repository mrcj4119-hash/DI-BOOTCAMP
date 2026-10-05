const path = require('node:path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 3000;
const FEED_URL = 'https://thefactfile.org/feed/';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'pages'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '10kb' }));
app.use(bodyParser.json({ limit: '10kb' }));

function getCategories(items) {
  return [...new Set(items.flatMap((item) => {
    const categories = item.categories || item.category || [];
    return (Array.isArray(categories) ? categories : [categories])
      .filter((category) => typeof category === 'string' && category.trim())
      .map((category) => category.trim());
  }))].sort((a, b) => a.localeCompare(b));
}

function toPost(item) {
  let link = 'https://thefactfile.org/';

  try {
    const parsedLink = new URL(item.link);
    if (parsedLink.protocol === 'https:' || parsedLink.protocol === 'http:') {
      link = parsedLink.href;
    }
  } catch {
    // Keep the safe site URL when a feed item has no valid link.
  }

  const publishedAt = item.isoDate || item.pubDate;
  const publishedDate = publishedAt && !Number.isNaN(Date.parse(publishedAt))
    ? new Date(publishedAt).toLocaleDateString()
    : 'Date unavailable';
  const categories = item.categories || item.category || [];

  return {
    title: item.title || 'Untitled fact',
    link,
    publishedDate,
    creator: item.creator || item.author || item['dc:creator'] || 'Unknown',
    categories: (Array.isArray(categories) ? categories : [categories])
      .filter((category) => typeof category === 'string' && category.trim()),
    content: item.contentSnippet || item.content || item.summary || 'No description available.'
  };
}

async function getPosts() {
  const feed = await parser.parseURL(FEED_URL);
  return feed.items.map(toPost);
}

function renderSearch(res, { posts = [], categories = [], titles = [], error = '', query = '' } = {}) {
  return res.render('search', { posts, categories, titles, error, query });
}

app.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.render('index', { posts, error: '' });
  } catch (error) {
    console.error('Failed to load the RSS feed:', error);
    res.status(502).render('index', {
      posts: [],
      error: 'The facts feed is temporarily unavailable. Please try again later.'
    });
  }
});

app.get('/search', async (req, res) => {
  try {
    const posts = await getPosts();
    renderSearch(res, {
      categories: getCategories(posts),
      titles: posts.map((post) => post.title)
    });
  } catch (error) {
    console.error('Failed to load the RSS feed for search:', error);
    res.status(502).render('search', {
      posts: [],
      categories: [],
      titles: [],
      error: 'The facts feed is temporarily unavailable. Please try again later.',
      query: ''
    });
  }
});

app.post('/search/title', async (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';

  try {
    const posts = await getPosts();
    renderSearch(res, {
      posts: title
        ? posts.filter((post) => post.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
        : [],
      categories: getCategories(posts),
      titles: posts.map((post) => post.title),
      query: title,
      error: title ? '' : 'Enter a title to search.'
    });
  } catch (error) {
    console.error('Failed to search RSS posts by title:', error);
    res.status(502).render('search', {
      posts: [],
      categories: [],
      titles: [],
      error: 'The facts feed is temporarily unavailable. Please try again later.',
      query: title
    });
  }
});

app.post('/search/category', async (req, res) => {
  const category = typeof req.body.category === 'string' ? req.body.category.trim() : '';

  try {
    const posts = await getPosts();
    const categories = getCategories(posts);
    const selectedCategory = categories.find(
      (feedCategory) => feedCategory.toLocaleLowerCase() === category.toLocaleLowerCase()
    );

    renderSearch(res, {
      posts: selectedCategory
        ? posts.filter((post) => post.categories.some(
          (postCategory) => postCategory.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
        ))
        : [],
      categories,
      titles: posts.map((post) => post.title),
      query: selectedCategory || '',
      error: selectedCategory ? '' : 'Choose a valid category to search.'
    });
  } catch (error) {
    console.error('Failed to search RSS posts by category:', error);
    res.status(502).render('search', {
      posts: [],
      categories: [],
      titles: [],
      error: 'The facts feed is temporarily unavailable. Please try again later.',
      query: category
    });
  }
});

app.listen(PORT, () => {
  console.log(`RSS Facts Reader is running at http://localhost:${PORT}`);
});
