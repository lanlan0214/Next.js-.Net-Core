// next.config.mjs
export const images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'encrypted-tbn0.gstatic.com',
    },
    {
      protocol: 'https',
      hostname: 'encrypted-tbn2.gstatic.com',
    },
    
  ],
};

const nextConfig = {
  images,
};

export default nextConfig;
