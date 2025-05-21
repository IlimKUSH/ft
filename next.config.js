/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'reqres.in',
                port: '',
                pathname: '/img/**',
            },
        ],
    },
}

module.exports = nextConfig; 