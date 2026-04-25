/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3051",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.gymassistant.xyz",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
