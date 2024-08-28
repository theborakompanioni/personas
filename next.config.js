/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // must be done when using `output := 'export'`
    images: { unoptimized: true },

    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,

    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
