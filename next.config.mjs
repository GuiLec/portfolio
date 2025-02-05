/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/athle",
      },
    ];
  },
};

export default nextConfig;
