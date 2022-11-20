const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
// const webpack = require("webpack");

module.exports = (env, argv) => {
    const prod = argv.mode === "production";

    return {
        mode: prod ? "production" : "development", // 개발모드
        devtool: prod ? "hidden-source-map" : "eval", // 모드에 따른 sourceMap 확인 여부 (product 모드에서만 sourceMap 확인 가능)
        entry: "./src/index.tsx", // 시작점 경로를 지정하는 옵션, 해당 파일부터 필요한 모듈 로딩 및 하나의 파일로 묶기
        output: {
            // webpack 번들링 결과물 경로 및 이름
            path: path.join(__dirname, "/dist"),
            filename: "[name].js",
        },
        devServer: {
            // 개발서버 설정
            port: 3000, // 포트
            hot: true, // 실시간 반영
            historyApiFallback: true,
        },
        resolve: {
            // 번들링 가능한 확장자?
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        // loader 설정
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "ts-loader"],
                    exclude: /node_modules/,
                },
            ],
        },
        // 부가기능 플러그인
        plugins: [
            // new webpack.ProvidePlugin({
            //     React: "react",
            // }),
            new HtmlWebpackPlugin({
                // HTML 파일에 번들링 된 자바스크립트 파일을 삽입해주고 빌드시 HTML 파일로 아웃풋에 생성됨
                template: "./public/index.html",
                minify:
                    process.env.NODE_ENV === "production"
                        ? {
                              collapseWhitespace: true, // 빈칸 제거
                              removeComments: true, // 주석 제거
                          }
                        : false,
            }),
            new CleanWebpackPlugin(), // 번들링시 이전 번들링 결과물 제거
        ],
    };
};
