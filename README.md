# OVO Fragrance House: storefront (React + TypeScript + Vite)

## Run it on your computer
1. `npm install`
2. `npm run photos`   downloads the Instagram photos (skips ones you already have and retries failures; run it again if some fail)
3. `npm run dev`      opens the site at the address it prints

The site automatically uses every photo listed in `public/images/manifest.json`, so there are never empty gaps.
Want better photos? Put your own .jpg/.png/.webp files in `public/images/ig/`, then run `npm run manifest`.

## Change the content
`src/data.ts`: products, prices, scent notes, moments, phone, email, WhatsApp number.
Product `images: [1, 2]` means "the 1st and 2nd photo in the folder".

## Put it online with GitHub (free shareable link)
1. Create a new repository on github.com (example name: `ovo-fragrance-house`) and upload the whole project folder
   (include `public/images`, but NOT `node_modules`; the included .gitignore handles that).
2. On GitHub open **Settings, Pages**, and under **Source** choose **GitHub Actions**.
3. Push or upload to the `main` branch. The included workflow builds the site, and after a minute or two your link appears in
   Settings, Pages (it looks like `https://YOUR-USERNAME.github.io/ovo-fragrance-house/`).
Every time you upload a change, the link updates itself.
The site uses `#` links (like `/#/shop`) so refreshing any page works on GitHub Pages.

## Orders
The bag sends the order, delivery area and optional gift note to WhatsApp (number in `BRAND.wa`).

## If photos fail to load
Each photo falls back automatically: your photo, then a random perfume photo from loremflickr.com, then a drawn bottle.
To make the random perfume photos permanent (no internet needed by visitors), run `npm run stock` once.
It saves 12 perfume photos into `public/images/ig/` and adds them to the list. Their licences vary (Flickr Creative Commons),
so use OVO's own photos for the real launch.
If the page ever shows "Something went wrong", the message under it tells you exactly what failed.
