/** @type {import('next').NextConfig} */
const nextConfig = {
  // add a rewrite of / into /athle
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
