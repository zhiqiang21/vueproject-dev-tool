module.exports = {
    plugins: [
        require('autoprefixer')({
            'browsers': [
                'last 2 versions',
                '> 1%',
                'iOS >= 7',
                'not ie > 0',
                'not ie_mob  > 0',
                'not dead'
            ]
        })
    ]
};