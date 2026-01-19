module.exports = {
  apps: [
    {
      name: "everything-search-app",
      // Windows requires npm.cmd, while Linux/Mac uses npm
      script: process.platform === "win32" ? "npm.cmd" : "npm",
      args: "run preview",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
