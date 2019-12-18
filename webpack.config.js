module.exports = {
    output: {
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js/'),
            '~': path.resolve(__dirname, 'node_modules/'),
        }
    }
}
