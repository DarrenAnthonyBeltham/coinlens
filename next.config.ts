const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
      {
        protocol: "https",
        hostname: "**.cryptocompare.com",
        port: "",
        pathname: "/news/**",
      },
    ],
  },
};

export default nextConfig;