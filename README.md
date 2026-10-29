# OVO Fragrance House: storefront (React + TypeScript + Vite)

## Update the live GitHub site (no redoing anything)
1. Unzip this update and copy everything inside the `ovo-perfume-site` folder into the folder you pushed to GitHub from. Choose "replace" when asked. Your photos and `node_modules` are not touched.
2. In that folder run:  `npm run ship`
   (it saves the changes and pushes them to GitHub; GitHub rebuilds the website itself and your link updates within 2 minutes)
No git on that computer? Open your repository on github.com, click Add file, Upload files, drag the new files in, and commit.

## Brand logo
The logo files are in `public/images/brand/`: `ovo-logo.png` (full image, used on the home banner and About page),
`wordmark-dark.png` (header on white) and `wordmark-light.png` (footer on dark). Replace these files to change the logo.

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

## Products and their photos
The catalogue (names, sizes, prices, categories) is in `src/data.ts`.
Each product's own photo goes in `public/images/products/` named by its id, e.g. `gucci-intense-oud-edp-90-ml.jpg`.
The full list of file names is in `public/images/products/README.txt`.
Get photos from OVO's supplier or the brands, or photograph the bottles. Do not copy photos from other shops' websites.
Until a photo is added, the product shows a drawn bottle with the brand name.
Scent families and moments are quick guesses used for filtering; the owner should check them.
Reviews (`REVIEWS`) and the "Visit us" block (`VISIT`) stay hidden until real content is added in `src/data.ts`.
Policy pages in `src/pages/Policies.tsx` are drafts for the owner to confirm.
