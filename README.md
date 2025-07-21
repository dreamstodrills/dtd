
# Dreams To Drills

## GitHub Pages Deployment
1. Create a new GitHub repo.
2. Upload all files/folders from this zip.
3. Go to Settings → Pages, choose branch `main` and root (`/`).
4. Save and your site will be live.

### Custom Domain:
- Add your domain under GitHub Pages settings.
- Update DNS records to point to GitHub (A records and CNAME).
    - Add a CNAME record:
        •	Name: www
        •	Type: CNAME
        •	Value: the host you’re using:
        •	For GitHub Pages: <your-username>.github.io
    - Add an A record pointing to:
    	    •	GitHub Pages: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
            You need to log in to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains, etc.), then:
	            1.	Navigate to DNS or DNS Management.
	            2.	Find the section for “A Records” or “Records” (sometimes under “Zone File Settings”).
	            3.	Add or update an A record pointing your domain to your hosting provider’s IP address.

## File Structure
```
dreamstodrills/
├── index.html
├── about.html
├── portfolio.html
├── services.html
├── contact.html
├── styles.css
├── README.md
└── assets/
   └── images/
        ├── logo-placeholder.png
        ├── hero-placeholder.jpg
        └── headshot-placeholder.jpg
    └── scripts/
        slider.js
```

## Editing Tips
- Replace `/assets/images/logo-placeholder.png` with your logo.
- Use Unsplash or licensed images in `/assets/images`.
- Edit text in HTML files directly or using any code editor.
- Update brand colors and fonts in `styles.css`.

## À La Carte Services
Includes: color consult, space planning, renderings, sourcing, and more.
