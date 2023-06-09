const path = require('path');

const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {(env: any) => import("webpack").Configuration} */
module.exports = env => {
    let environment = {
        language: 'en',
        apiPath: env.apiPath,
        mediaPath: env.mediaPath ? env.mediaPath : '/',
        crossOrigin: env.crossOrigin,
        cacheVersion: env.cacheVersion,
        clientVersion: env.clientVersion ? env.clientVersion : env.cacheVersion,
        contentVersion: env.contentVersion ? env.contentVersion : env.cacheVersion,
        minigameVersion: env.minigameVersion ? env.minigameVersion : env.cacheVersion,
        environmentType: env.environmentType ? env.environmentType : env.development ? 'dev' : 'prod',
        links: {
            home: env.homeLink,
            play: env.playLink,
            localPlay: env.playLink,
        }
    };

    console.log(env);

    let playPages = [
        new HtmlWebpackPlugin({
            template: './index.template.html',
            filename: 'index.html',
            inject: 'body',
            templateParameters: environment
        })
    ];

    for (let lang of ['de', 'es', 'fr', 'pt', 'ru']) {
        playPages.push(new HtmlWebpackPlugin({
            template: `./index.${lang}.template.html`,
            filename: `${lang}/index.html`,
            inject: 'body',
            templateParameters: {
                ...environment,
                links: {
                    ...environment,
                    home: `${env.playLink}/${lang}`,
                    localPlay: `${env.playLink}/${lang}`
                },
                language: lang
            }
        }));
    }

    return {
        mode: env.development ? 'development' : 'production',
        target: 'web',
        // TODO: Remove or replace with hidden-source-map on production (but not supply files)
        devtool: env.sourceMap ? env.sourceMap : env.development ? 'source-map' : false,

        entry: {
            app: {
                import: `./src/club_penguin.ts`,
                library: {
                    name: 'CP',
                    type: 'umd',
                    umdNamedDefine: true
                }
            }
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist/'),
            environment: {
                arrowFunction: false
            },
            assetModuleFilename: 'assets/[hash][ext][query]',
            clean: true,
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.m?js$/i,
                    resolve: {
                        fullySpecified: false,
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff2?|mp3|wav)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(ts|m?js)x?$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            exclude: [
                                /node_modules[\\/]core-js/,
                                /node_modules[\\/]webpack[\\/]buildin/
                            ],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: { version: 3, proposals: true }
                                    }
                                ]
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-transform-runtime',
                                    {
                                        useESModules: true,
                                        corejs: { version: 3, proposals: true }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            sourceType: 'unambiguous'
                        }
                    }
                },
                {
                    test: /\.tsx?$/i,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.mjs', '.js', '.json']
        },

        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.(ts|m?js)x?$/i,
                    parallel: true,
                    terserOptions: {
                        ecma: 5,
                        format: {
                            comments: false
                        }
                    }
                })
            ],
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            static: [
                {
                    directory: path.resolve(__dirname, 'media'),
                    publicPath: '/'
                },
                {
                    directory: path.resolve(__dirname, 'play'),
                    publicPath: '/'
                }
            ]
        },
        watchOptions: {
            ignored: ['media/', 'play/', 'node_modules/'],
            aggregateTimeout: 200
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new DefinePlugin({
                '__webpack_options__': JSON.stringify({
                    EXPOSE_APP: env.development
                })
            }),
            ...playPages,
            new CopyPlugin({
                patterns: [
                    { from: '**/*', context: 'play' }
                ]
            })
        ]
    };
};
