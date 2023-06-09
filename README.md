![0618-Marketing-Evergreen-Homepage-Billboard-Igloos (2)](https://github.com/clubpenguin-html5/ClubPenguin/assets/44991848/0b711f05-86ce-46fc-a987-59511f69e267)

# Index

1. [About](#about)
2. [Installation](#installation)
    - [Options](#options)
4. [Modifications](#modifications)
5. [Demo](#demo)
6. [Contributing](#contributing)

# About
Following Flash Player's discontinuation, this project aims to bring Club Penguin back into the web. This is achieved by employing newer technologies that allow it to remain as accessible as ever, in your browser.
A key component is [Phaser](https://github.com/photonstorm/phaser), providing a game framework for HTML5 standards. The codebase of this project has been built from the ground up for performance using TypeScript, while maintaining high-fidelity to the Flash counterpart visually.

It should be noted that the project only aims to stay close to the source material visually, meaning that communication to the back-end servers is not cross-compatible with the Flash client. Instead, we employ a [dedicated server](https://github.com/clubpenguin-html5/Island) with our own protocol using a Rest API and a WebSocket throughout.

# Installation
Clone this repository using `git`:
```
git clone --recurse-submodules git@github.com:clubpenguin-html5/ClubPenguin.git
```
Don't forget the `--recurse-submodules` flag as it will also clone the [play page](https://github.com/clubpenguin-html5/play) needed to load the game.
> NOTE: This repository contains only the assets needed for the play page. The actual play page is generated on-the-go by Webpack as to allow passing options to the game.

Next, install the mediaserver. If you plan on running a [webpack DevServer](https://webpack.js.org/configuration/dev-server/) using the provided configuration, then the mediaserver must be available as a directory called `static` in the project root. Otherwise, you may install it anywhere **as long as the game can access it** and is defined in [options](#options).

Finally, build the game source:
a. To output a build, run `npm run build`. This will output the game files to a directory called `dist` in the project root.
b. To run a DevServer instead, run `npm run serve` instead. This option is best for development, but keep in mind **it will run under a production environment if no options are given**.

### Options
Both `npm run build` and `npm run serve` run `webpack` under the hood, so you may pass options to it. It is encouraged to customize your builds as the default options may not apply to your environment.
To pass environment options to a build command, you must use a separator `--` to forward arguments to `webpack`, and use the `--env` argument afterwards to define an option.
A build command with options may look like this:
```
webpack serve --env development --env mediaPath="http://localhost" --env homeLink="http://localhost" --env playLink="http://localhost"
```
Note that `development` is a boolean option, so there is no need to provide a value for it unlike string options. The absence of this option would mean `false`.

Below is a list of valid options.

---

- `--env development`: Marks this build as a `development` build, disabling any post-processing for optimization and thus greatly reducing build times.
> If this option is present, then the game instance will be made available in the playpage as `CP.app`. Otherwise, this property will be undefined.
- `--env apiPath=string`: Sets the base API URL for communication. It is recommended that you provide an absolute URL for this option.
- `--env mediaPath=string` (default: `"/"`): Sets the base URL for the mediaserver. It is recommended that you provide an absolute URL for this option.
- `--env crossOrigin=string` (optional): Sets the CORS rule for file fetching. Must be one of `anonymous` or `use-credentials`. Best left untouched if you are not handling cross-origin requests.
- `--env cacheVersion=string` (optional): Sets the base cache version. This is used by the game to get around file caching on mediaserver asset requests.
- `--env clientVersion=string` (optional): Sets the cache version for client files. If not provided, then it defaults to the value of `cacheVersion`.
- `--env contentVersion=string` (optional): Sets the cache version for content files. If not provided, then it defaults to the value of `cacheVersion`.
- `--env minigameVersion=string` (optional): Sets the cache version for minigame files. If not provided, then it defaults to the value of `cacheVersion`.
- `--env environmentType=string` (optional): Sets the environment type hint for the game. If not provided, then it will infer the value based on the build type: `prod` for production and `dev` for development.
- `--env homeLink=string` (default: `""`): Sets the URL to the home page. This will affect the play page navigation. Example: `https://clubpenguin.com`. **Do not include a slash at the end.**
- `--env playLink=string` (default: `""`): Sets the URL to the English play page. This affects resource loading and navigation of the play page. Example: `https://play.clubpenguin.com`. This assumes other languages are available as nested pages (e.g. `https://play.clubpenguin.com/es` for Spanish). **Do not include a slash at the end.**

# Modifications
You may have noticed `.scene` files (amongst others) that are left unused in the source. These files are editable using [Phaser Editor 2D](https://phasereditor2d.com/), and the editor will compile TypeScript files upon change. It is adviced you only modify TypeScript files in the project that **are not compiled by the editor**, and in case they are, **make sure you are editing a section that is not compiled**.
To ensure whether a section is compiled, look for block comments in the desired TypeScript file that look like this: `/* START-USER-CODE */`. This indicates the start of a section that will not be overwritten by the editor, and likewise a comment like `/* END-USER-CODE */` indicates the end of it.

Phaser Editor 2D will also need to read asset files from the mediaserver, so you will need to make it available inside of the project root as a directory. For the editor to recognize the mediaserver as an extension of the project root (needed for asset loading), you must include an empty file called `projectroot` (without an extension) inside of the mediaserver root. This will hint the editor that the mediaserver is used for asset loading, and you will be able to edit freely the scenes.
For more info. on this, read [Setting the root folder for the asset files](https://help-v3.phasereditor2d.com/asset-pack-editor/public-root.html).

If you wish to fork this project, please give credits where credit is due. Thank you.

# Contributing
Thank you for your interest! 😉. You may contribute to bug reports and fixes by submitting issues and pull requests through this repository. Together we will let Club Penguin's legacy live on.

# Demo
A live public build of the project will be made available soon.

# Support
Catch us on our Discord server [here!](https://discord.gg/CfBct5NUjv) or join through this code: `CfBct5NUjv`.

Please be mindful of the information shared here, as it may contain the answer to your query.

We ask that you are knowledgeable in at least the basics of TypeScript and Phaser before attempting to modify the project, as the techniques employed in this project may not be beginner-friendly.
If you wish to just play the game, then you may be interested in visiting our [own demonstration of the project](#demo).

#### Made with 💙 by the Club Penguin HTML5 team.

