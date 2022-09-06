const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const webpack = reqiure('webpack')

module.exports = (env, argv) => {
    const prod = argv.mode === 'production'

    return {
        mode: prod ? 'production' : 'development'
    }
}