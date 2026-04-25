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
                protocol: "http",
                hostname: "192.168.0.103",
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
