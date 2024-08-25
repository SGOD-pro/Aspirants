/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'picsum.photos',
        'firebasestorage.googleapis.com',
        'lh3.googleusercontent.com', // Add this line
      ],
    },
  };

export default nextConfig;
