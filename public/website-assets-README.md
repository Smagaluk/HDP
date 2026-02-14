# Website assets (symlink)

The `website-assets` folder is a **symlink** to your OneDrive branding folder:

`Heritage Development Partners - General/HDP Admin/Branding/Website`

Use these URLs in the site:

- **Logos:** `/website-assets/Logos/filename.png`
- **Project images:** `/website-assets/Project Images/filename.jpg`
- **Stock images:** `/website-assets/Stock Images/filename.jpg`

When you add or update images in that OneDrive folder, they appear on the site after refresh (no copy step needed).

**Production / deploy:** The symlink works for local dev only. Before building for production, copy the real folder into `public/website-assets` or run the sync script (see project root) so the build includes the files.
