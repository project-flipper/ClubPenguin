const path = require('path');

const { DefinePlugin, ProvidePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

function getNowFormat() {
    let now = new Date();
    return `${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDay() + 1}${now.getUTCHours()}${now.getUTCMinutes()}${now.getUTCSeconds()}`
}

function getterFactory(env) {
    return function getter(attr, fallback) {
        return attr in env ? env[attr] : fallback;
    }
}

/** @type {(env: any) => import("webpack").Configuration} */
module.exports = env => {
    let get = getterFactory(env);
    let now = getNowFormat();
    let home = get('links.home', 'https://www.clubpenguin.com');
    let play = get('links.play', 'https://play.clubpenguin.com');
    let community = get('links.community', 'https://community.clubpenguin.com');
    let support = get('links.support', 'https://support.clubpenguin.com');
    let secured = get('links.secured', 'https://secured.clubpenguin.com');
    let environment = {
        apiPath: get('apiPath'),
        mediaPath: get('mediaPath', '/media'),
        crossOrigin: get('crossOrigin'),
        cacheVersion: get('cacheVersion', now),
        contentVersion: get('contentVersion', now),
        minigameVersion: get('minigameVersion', now),
        environmentType: get('environmentType', env.development ? 'dev' : 'prod'),
        links: {
            home,
            play,
            community,
            support,
            secured,
            affiliates: get('links.affiliates', 'https://signup.cj.com/member/brandedPublisherSignUp.do?air_refmerchantid=3297551'),
            blog: get('links.blog', `${community}/blog`),
            help: get('links.help', `${support}/help`),
            parents: get('links.parents', `${home}/parents`),
            membership: get('links.membership', `${home}/membership`),
            exit: get('links.exit', `${home}/exit`),
            company: get('links.company', `${home}/company`),
            terms: get('links.terms', `${home}/terms`),
            privacy: get('links.privacy', `${home}/privacy`),
            contact: get('links.contact', `${support}/help/contact`),
            sitemap: get('links.sitemap', `${home}/sitemap`),
            forgotPassword: get('links.forgotPassword', `${secured}/penguin/forgot-password`),
            createAccount: get('links.createAccount', `${play}#/create`),
            guide: get('links.guide', `${home}/parents/club_penguin_guide`),
            playerSafety: get('links.playerSafety', `${home}/parents/player_safety`),
            toys: get('links.toys', `${home}/toys`),
        },
        recaptchaSiteKey: get('recaptchaSiteKey')
    };

    console.log(environment);

    return {
        mode: env.development ? 'development' : 'production',
        target: 'web',
        // TODO: Remove or replace with hidden-source-map on production (but not supply files)
        devtool: env.sourceMap ? env.sourceMap : env.development ? 'source-map' : false,

        entry: {
            app: {
                import: './src/club_penguin.ts',
                library: {
                    name: 'CP',
                    type: 'umd',
                    umdNamedDefine: true
                }
            },
            play: './play/index.tsx'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist/'),
            environment: {
                arrowFunction: false
            },
            assetModuleFilename: 'assets/[hash][ext][query]',
            clean: true,
            publicPath: env.playLink ? `${env.playLink}/` : '/'
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
                                        corejs: { version: '3.31', proposals: true }
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
                                ],
                                [
                                    '@babel/plugin-syntax-decorators',
                                    {
                                        'version': '2023-11'
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
            alias: {
                '@clubpenguin': path.resolve(__dirname, 'src/'),
                '@play': path.resolve(__dirname, 'play/')
            },
            extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json']
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
        performance: {
            hints: false
        },
        devServer: {
            static: [
                {
                    directory: path.resolve(__dirname, 'media'),
                    publicPath: '/media/',
                    watch: false
                },
                {
                    directory: path.resolve(__dirname, 'play/assets'),
                    publicPath: '/'
                }
            ],
            devMiddleware: {
                writeToDisk: true
            }
        },
        watchOptions: {
            ignored: ['media/', 'play/assets/', 'node_modules/'],
            aggregateTimeout: 200
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new ProvidePlugin({
                Phaser: 'phaser',
                '$': 'jquery',
                'jQuery': 'jquery'
            }),
            new DefinePlugin({
                '__webpack_options__': JSON.stringify({
                    EXPOSE_DEBUG: env.development,
                    RECAPTCHA_SITE_KEY: env.recaptchaSiteKey,
                    LOG_LEVEL: env.logLevel ? parseInt(env.logLevel) : (env.development ? 0 : 3),
                    FPS_LIMIT: env.fpsLimit ? parseInt(env.fpsLimit) : 24
                }),
                '__experiments__': JSON.stringify({}),
                '__environment__': JSON.stringify(environment)
            }),
            new HtmlWebpackPlugin({
                template: './play/index.html',
                filename: 'index.html',
                inject: 'body',
                templateParameters: environment,
                publicPath: env.playLink || 'auto'
            }),
            new CopyPlugin({
                patterns: [
                    { from: '**/*', context: 'play/assets' }
                ]
            })
        ]
    };
};
