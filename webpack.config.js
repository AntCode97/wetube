//여긴 바벨이 적용되지 않아서 옛날 자바스크립트를 써야함
//절대 경로를 이용하기 위해서 사용함
const path = require("path");

const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const MODE = process.env.WEBPACK_ENV;

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    //Entry -> 파일이 어디서 오는가
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,

    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {//웹팩이 Css 를 이해하게 해줌
                        loader: "css-loader"
                    },
                    {   //호환성 문제를 해결하는 애
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer',
                                        {   //여러 브라우저의 99.5퍼센트와 호환하게 만듬
                                            browsers: "cover 99.5%"
                                        },
                                    ]
                                ]
                            }
                        }
                    }
                    ,
                    {   //sass 파일을 이해하게 함 sass 파일을 -> css로 바꾸는 과정의 첫 시작
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },

    //Output -> 결과물을 어디에 넣을 것인가
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional       
            filename: 'styles.css'
        }),
    ]

};

module.exports = config;