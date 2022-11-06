/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    rewrites: async () => [
        {
            source: "/public/bad-website.html",
            destination: "/pages/api/bad-website.js"
        }
    ]
}

module.exports = nextConfig
