# SnapScout — Photo Gallery

A React photo gallery with four browsable collections and a search page. Photos are retrieved from the public Wikimedia Commons API, so no API key is required. Select a photo to open its Wikimedia Commons file page.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, or serve that build locally with `npm run preview`.

The gallery uses hash-based routes. Browse `/mountain`, `/beaches`, `/birds`, and `/food`, or search for a subject to open a search results route. Each page displays up to 30 photos, with previous/next pagination when more results are available.
