module.exports = {
    '^/crinnovation/.*': {
        // target: 'http://192.168.10.33:9818',
        // target: 'http://192.168.10.56:9818',
        // target: 'http://101.32.47.12:9818',
        target: 'https://aisem.cresmartech.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crinnovation/, '/crinnovation'),
    },
}