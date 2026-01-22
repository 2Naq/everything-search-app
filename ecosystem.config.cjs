module.exports = {
  apps: [
    {
      name: "everything-search-app",
      script: "server.cjs",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        VITE_EVERYTHING_URL: "http://localhost:80",
      },
    },
  ],
};
