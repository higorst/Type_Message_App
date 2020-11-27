module.exports = {
    apps: [
        {
            name: "API",
            script: "src/server.ts",
            autorestart: true,
            exec_mode: "cluster",
            instances: "max",
            watch: false,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};