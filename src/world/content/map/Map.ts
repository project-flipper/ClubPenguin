
export enum MapCategory {
    NO_CATEGORY,
    GAMES,
    PLACES,
    SHOP,
    PETS,
    PET_GAMES
};

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InputBlocker from "../../../lib/ui/components/InputBlocker";
import ButtonComponent from "../../../lib/ui/components/ButtonComponent";
import Navigation from "./prefabs/Navigation";
/* START-USER-IMPORTS */
import { App } from "../../../app/app";
import Engine from "../../engine/Engine";
import Interface, { Content } from "../../interface/Interface";
import { Locale } from "../../../app/locale";
/* END-USER-IMPORTS */

export default class Map extends Phaser.Scene implements Content {

    constructor() {
        super("Map");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("map-pack", "assets/world/content/map/map-pack.json");
    }

    editorCreate(): void {

        // map_base
        const map_base = this.add.image(-3.6, -0.675, "map", "map/base");
        map_base.setOrigin(0, 0);

        // island
        const island = this.add.layer();

        // dojoext
        const dojoext = this.add.image(958.05, 199.8, "map", "map/dojo0001");
        dojoext.setOrigin(0, 0);
        island.add(dojoext);

        // map_island
        const map_island = this.add.image(44.775, 311.2875, "map", "map/island");
        map_island.setOrigin(0, 0);
        island.add(map_island);

        // map_igloosBase
        const map_igloosBase = this.add.image(549.5625, 763.9875, "map", "map/igloosBase");
        map_igloosBase.setOrigin(0, 0);
        island.add(map_igloosBase);

        // mtn
        const mtn = this.add.image(87.45, 235.2125, "map", "map/mtn0001");
        mtn.setOrigin(0, 0);
        island.add(mtn);

        // map_snow4
        const map_snow4 = this.add.image(456.975, 428.85, "map", "map/snow4");
        map_snow4.setOrigin(0, 0);
        island.add(map_snow4);

        // village
        const village = this.add.image(251.0124, 469.075, "map", "map/village0001");
        village.setOrigin(0, 0);
        island.add(village);

        // map_snow
        const map_snow = this.add.image(67.05, 506.8125, "map", "map/snow");
        map_snow.setOrigin(0, 0);
        island.add(map_snow);

        // map_snow3
        const map_snow3 = this.add.image(451.2375, 438.8625, "map", "map/snow3");
        map_snow3.setOrigin(0, 0);
        island.add(map_snow3);

        // dock
        const dock = this.add.image(71.9125, 811.0125, "map", "map/dock0001");
        dock.setOrigin(0, 0);
        island.add(dock);

        // beach
        const beach = this.add.image(-83.175, 563.8, "map", "map/beach0001");
        beach.setOrigin(0, 0);
        island.add(beach);

        // igloos
        const igloos = this.add.image(472.275, 739.575, "map", "map/igloos0001");
        igloos.setOrigin(0, 0);
        island.add(igloos);

        // shack
        const shack = this.add.image(1188.9625, 460.1625, "map", "map/shack0001");
        shack.setOrigin(0, 0);
        island.add(shack);

        // berg
        const berg = this.add.image(1527.6374, 431.2, "map", "map/berg");
        berg.setOrigin(0, 0);
        island.add(berg);

        // town
        const town = this.add.image(254.5625, 544.225, "map", "map/town0001");
        town.setOrigin(0, 0);
        island.add(town);

        // map_tree
        const map_tree = this.add.image(1192.8875, 540.9875, "map", "map/tree");
        map_tree.setOrigin(0, 0);
        island.add(map_tree);

        // plaza
        const plaza = this.add.image(975, 425, "map", "map/plaza0001");
        plaza.setOrigin(0, 0);
        island.add(plaza);

        // forest
        const forest = this.add.image(1253, 610, "map", "map/forest0001");
        forest.setOrigin(0, 0);
        island.add(forest);

        // cove
        const cove = this.add.image(1524, 590, "map", "map/cove0001");
        cove.setOrigin(0, 0);
        island.add(cove);

        // forts
        const forts = this.add.image(675, 526, "map", "map/forts0001");
        forts.setOrigin(0, 0);
        island.add(forts);

        // rink
        const rink = this.add.image(609.3125, 329.45, "map", "map/rink0001");
        rink.setOrigin(0, 0);
        island.add(rink);

        // map_trees
        const map_trees = this.add.image(590.625, 490.05, "map", "map/trees");
        map_trees.setOrigin(0, 0);
        island.add(map_trees);

        // tint
        const tint = this.add.rectangle(0, 0, 1710, 1080);
        tint.setOrigin(0, 0);
        tint.visible = false;
        tint.isFilled = true;
        tint.fillAlpha = 0.4;

        // places
        const places = this.add.layer();
        places.visible = false;

        // sshack
        const sshack = this.add.image(1189, 459, "map", "map/sshack0001");
        sshack.setOrigin(0, 0);
        places.add(sshack);

        // sbeach
        const sbeach = this.add.image(-84, 565, "map", "map/sbeach0001");
        sbeach.setOrigin(0, 0);
        places.add(sbeach);

        // scove
        const scove = this.add.image(1526, 684, "map", "map/scove0001");
        scove.setOrigin(0, 0);
        places.add(scove);

        // sdock
        const sdock = this.add.image(73, 812, "map", "map/sdock0001");
        sdock.setOrigin(0, 0);
        places.add(sdock);

        // sdojoext
        const sdojoext = this.add.image(958, 199, "map", "map/sdojo0001");
        sdojoext.setOrigin(0, 0);
        places.add(sdojoext);

        // sforest
        const sforest = this.add.image(1252, 610, "map", "map/sforest0001");
        sforest.setOrigin(0, 0);
        places.add(sforest);

        // sforts
        const sforts = this.add.image(673, 527, "map", "map/sforts0001");
        sforts.setOrigin(0, 0);
        places.add(sforts);

        // sigloos
        const sigloos = this.add.image(474, 740, "map", "map/sigloos0001");
        sigloos.setOrigin(0, 0);
        places.add(sigloos);

        // smtn
        const smtn = this.add.image(200, 265, "map", "map/smtn0001");
        smtn.setOrigin(0, 0);
        places.add(smtn);

        // splaza
        const splaza = this.add.image(975, 425, "map", "map/splaza0001");
        splaza.setOrigin(0, 0);
        places.add(splaza);

        // srink
        const srink = this.add.image(609, 331, "map", "map/srink0001");
        srink.setOrigin(0, 0);
        places.add(srink);

        // stown
        const stown = this.add.image(255.5, 544, "map", "map/stown0001");
        stown.setOrigin(0, 0);
        places.add(stown);

        // svillage
        const svillage = this.add.image(251, 469, "map", "map/svillage0001");
        svillage.setOrigin(0, 0);
        places.add(svillage);

        // sberg
        const sberg = this.add.image(1558, 436, "map", "map/sberg");
        sberg.setOrigin(0, 0);
        places.add(sberg);

        // games
        const games = this.add.layer();
        games.visible = false;

        // aqua
        const aqua = this.add.image(1540.125, 435.375, "map", "map/aqua0001");
        games.add(aqua);

        // arcade
        const arcade = this.add.image(643.3875, 528.75, "map", "map/arcade0001");
        games.add(arcade);

        // bean
        const bean = this.add.image(486, 634.5, "map", "map/bean0001");
        games.add(bean);

        // cardjitsu
        const cardjitsu = this.add.image(1026, 279, "map", "map/cardjitsu0001");
        games.add(cardjitsu);

        // cart
        const cart = this.add.image(1357.875, 457.875, "map", "map/cart0001");
        games.add(cart);

        // dance
        const dance = this.add.image(792, 600.75, "map", "map/dance0001");
        games.add(dance);

        // dj
        const dj = this.add.image(653.625, 686.25, "map", "map/dj0001");
        games.add(dj);

        // fish
        const fish = this.add.image(403.875, 491.625, "map", "map/fish0001");
        games.add(fish);

        // escape
        const escape = this.add.image(1048.1625, 754.2, "map", "map/escape0001");
        games.add(escape);

        // sledrace
        const sledrace = this.add.image(333, 312.75, "map", "map/sledrace0001");
        games.add(sledrace);

        // jetpack
        const jetpack = this.add.image(169.875, 601.875, "map", "map/jetpack0001");
        games.add(jetpack);

        // launch
        const launch = this.add.image(973.125, 625.5, "map", "map/launch0001");
        games.add(launch);

        // pizza
        const pizza = this.add.image(1310.625, 625.5, "map", "map/pizza0001");
        games.add(pizza);

        // roundup
        const roundup = this.add.image(1143, 625.5, "map", "map/roundup0001");
        games.add(roundup);

        // rescue
        const rescue = this.add.image(1191.375, 466.875, "map", "map/rescue0001");
        games.add(rescue);

        // smoothie
        const smoothie = this.add.image(517.05, 783.7875, "map", "map/smoothie0001");
        games.add(smoothie);

        // hydro
        const hydro = this.add.image(303.75, 865.125, "map", "map/hydro0001");
        games.add(hydro);

        // waves
        const waves = this.add.image(1528.875, 702, "map", "map/waves0001");
        games.add(waves);

        // shop
        const shop = this.add.layer();
        shop.visible = false;

        // cardcat
        const cardcat = this.add.image(1023.6375, 321.3, "map", "map/cardcat0001");
        shop.add(cardcat);

        // clothescat
        const clothescat = this.add.image(751.5, 652.5, "map", "map/clothescat0001");
        shop.add(clothescat);

        // dancecat
        const dancecat = this.add.image(585, 652.5, "map", "map/dancecat0001");
        shop.add(dancecat);

        // fishcat
        const fishcat = this.add.image(433.125, 523.575, "map", "map/fishcat0001");
        shop.add(fishcat);

        // sledcat
        const sledcat = this.add.image(371.25, 366.75, "map", "map/sledcat0001");
        shop.add(sledcat);

        // hydrocat
        const hydrocat = this.add.image(374.625, 844.875, "map", "map/hydrocat0001");
        shop.add(hydrocat);

        // instcat
        const instcat = this.add.image(190.575, 705.375, "map", "map/instcat0001");
        shop.add(instcat);

        // pufflecat
        const pufflecat = this.add.image(1005.75, 594, "map", "map/pufflecat0001");
        shop.add(pufflecat);

        // sportscat
        const sportscat = this.add.image(781.425, 469.575, "map", "map/sportscat0001");
        shop.add(sportscat);

        // stagecat
        const stagecat = this.add.image(1170, 598.5, "map", "map/stagecat0001");
        shop.add(stagecat);

        // wavescat
        const wavescat = this.add.image(1525.5, 733.5, "map", "map/wavescat0001");
        shop.add(wavescat);

        // pets
        const pets = this.add.layer();
        pets.visible = false;

        // pescape
        const pescape = this.add.image(999, 761.4, "map", "map/pescape0001");
        pets.add(pescape);

        // pigloo
        const pigloo = this.add.image(724.275, 835.2, "map", "map/pigloo0001");
        pets.add(pigloo);

        // ppuffle
        const ppuffle = this.add.image(1048.5, 620.8875, "map", "map/ppuffle0001");
        pets.add(ppuffle);

        // plaunch
        const plaunch = this.add.image(901.125, 648.225, "map", "map/plaunch0001");
        pets.add(plaunch);

        // prainbow
        const prainbow = this.add.image(1198.0125, 619.425, "map", "map/prainbow0001");
        pets.add(prainbow);

        // pshop
        const pshop = this.add.image(1150.65, 753.1875, "map", "map/pshop0001");
        pets.add(pshop);

        // proundup
        const proundup = this.add.image(950.9625, 498.2625, "map", "map/proundup0001");
        pets.add(proundup);

        // pet_games
        const pet_games = this.add.layer();
        pet_games.visible = false;

        // paqua
        const paqua = this.add.image(1530, 440.1, "map", "map/paqua0001");
        pet_games.add(paqua);

        // parcade
        const parcade = this.add.image(647.6625, 552.15, "map", "map/parcade0001");
        pet_games.add(parcade);

        // pcart
        const pcart = this.add.image(1363.95, 434.25, "map", "map/pcart0001");
        pet_games.add(pcart);

        // pdance
        const pdance = this.add.image(727.65, 686.8125, "map", "map/pdance0001");
        pet_games.add(pdance);

        // pdj
        const pdj = this.add.image(557.8875, 693.9, "map", "map/pdj0001");
        pet_games.add(pdj);

        // prescue
        const prescue = this.add.image(1200.825, 471.2625, "map", "map/prescue0001");
        pet_games.add(prescue);

        // pjetpack
        const pjetpack = this.add.image(175.5, 609.6375, "map", "map/pjetpack0001");
        pet_games.add(pjetpack);

        // pwaves
        const pwaves = this.add.image(1522.125, 708.75, "map", "map/pwaves0001");
        pet_games.add(pwaves);

        // border
        const border = this.add.image(855.1125, 539.8875, "map", "map/nav0002");

        // navigation
        const navigation = new Navigation(this, 1.4625, 4.275);
        this.add.existing(navigation);
        navigation.scaleX = 0.85;
        navigation.scaleY = 0.85;

        // close
        const close = this.add.image(1665, 47.25, "map", "map/close0001");

        // borderLine
        const borderLine = this.add.rectangle(0, 0, 1710, 1080);
        borderLine.setOrigin(0, 0);
        borderLine.visible = false;
        borderLine.isStroked = true;
        borderLine.strokeColor = 3355443;
        borderLine.lineWidth = 0.225;

        // map_base (components)
        new InputBlocker(map_base);

        // dojoext (components)
        const dojoextButtonComponent = new ButtonComponent(dojoext);
        dojoextButtonComponent.upTexture = { "key": "map", "frame": "map/dojo0001" };
        dojoextButtonComponent.overTexture = { "key": "map", "frame": "map/dojo0002" };
        dojoextButtonComponent.handCursor = true;
        dojoextButtonComponent.pixelPerfect = true;

        // mtn (components)
        const mtnButtonComponent = new ButtonComponent(mtn);
        mtnButtonComponent.upTexture = { "key": "map", "frame": "map/mtn0001" };
        mtnButtonComponent.overTexture = { "key": "map", "frame": "map/mtn0002" };
        mtnButtonComponent.handCursor = true;
        mtnButtonComponent.pixelPerfect = true;

        // village (components)
        const villageButtonComponent = new ButtonComponent(village);
        villageButtonComponent.upTexture = { "key": "map", "frame": "map/village0001" };
        villageButtonComponent.overTexture = { "key": "map", "frame": "map/village0002" };
        villageButtonComponent.handCursor = true;
        villageButtonComponent.pixelPerfect = true;

        // dock (components)
        const dockButtonComponent = new ButtonComponent(dock);
        dockButtonComponent.upTexture = { "key": "map", "frame": "map/dock0001" };
        dockButtonComponent.overTexture = { "key": "map", "frame": "map/dock0002" };
        dockButtonComponent.handCursor = true;
        dockButtonComponent.pixelPerfect = true;

        // beach (components)
        const beachButtonComponent = new ButtonComponent(beach);
        beachButtonComponent.upTexture = { "key": "map", "frame": "map/beach0001" };
        beachButtonComponent.overTexture = { "key": "map", "frame": "map/beach0002" };
        beachButtonComponent.handCursor = true;
        beachButtonComponent.pixelPerfect = true;

        // igloos (components)
        const igloosButtonComponent = new ButtonComponent(igloos);
        igloosButtonComponent.upTexture = { "key": "map", "frame": "map/igloos0001" };
        igloosButtonComponent.overTexture = { "key": "map", "frame": "map/igloos0002" };
        igloosButtonComponent.handCursor = true;
        igloosButtonComponent.pixelPerfect = true;

        // shack (components)
        const shackButtonComponent = new ButtonComponent(shack);
        shackButtonComponent.upTexture = { "key": "map", "frame": "map/shack0001" };
        shackButtonComponent.overTexture = { "key": "map", "frame": "map/shack0002" };
        shackButtonComponent.handCursor = true;
        shackButtonComponent.pixelPerfect = true;

        // berg (components)
        const bergButtonComponent = new ButtonComponent(berg);
        bergButtonComponent.handCursor = true;
        bergButtonComponent.pixelPerfect = true;

        // town (components)
        const townButtonComponent = new ButtonComponent(town);
        townButtonComponent.upTexture = { "key": "map", "frame": "map/town0001" };
        townButtonComponent.overTexture = { "key": "map", "frame": "map/town0002" };
        townButtonComponent.handCursor = true;
        townButtonComponent.pixelPerfect = true;

        // plaza (components)
        const plazaButtonComponent = new ButtonComponent(plaza);
        plazaButtonComponent.upTexture = { "key": "map", "frame": "map/plaza0001" };
        plazaButtonComponent.overTexture = { "key": "map", "frame": "map/plaza0002" };
        plazaButtonComponent.handCursor = true;
        plazaButtonComponent.pixelPerfect = true;

        // forest (components)
        const forestButtonComponent = new ButtonComponent(forest);
        forestButtonComponent.upTexture = { "key": "map", "frame": "map/forest0001" };
        forestButtonComponent.overTexture = { "key": "map", "frame": "map/forest0002" };
        forestButtonComponent.handCursor = true;
        forestButtonComponent.pixelPerfect = true;

        // cove (components)
        const coveButtonComponent = new ButtonComponent(cove);
        coveButtonComponent.upTexture = { "key": "map", "frame": "map/cove0001" };
        coveButtonComponent.overTexture = { "key": "map", "frame": "map/cove0002" };
        coveButtonComponent.handCursor = true;
        coveButtonComponent.pixelPerfect = true;

        // forts (components)
        const fortsButtonComponent = new ButtonComponent(forts);
        fortsButtonComponent.upTexture = { "key": "map", "frame": "map/forts0001" };
        fortsButtonComponent.overTexture = { "key": "map", "frame": "map/forts0002" };
        fortsButtonComponent.handCursor = true;
        fortsButtonComponent.pixelPerfect = true;

        // rink (components)
        const rinkButtonComponent = new ButtonComponent(rink);
        rinkButtonComponent.upTexture = { "key": "map", "frame": "map/rink0001" };
        rinkButtonComponent.overTexture = { "key": "map", "frame": "map/rink0002" };
        rinkButtonComponent.handCursor = true;
        rinkButtonComponent.pixelPerfect = true;

        // tint (components)
        new InputBlocker(tint);

        // sshack (components)
        const sshackButtonComponent = new ButtonComponent(sshack);
        sshackButtonComponent.upTexture = { "key": "map", "frame": "map/sshack0001" };
        sshackButtonComponent.overTexture = { "key": "map", "frame": "map/sshack0002" };
        sshackButtonComponent.handCursor = true;
        sshackButtonComponent.pixelPerfect = true;

        // sbeach (components)
        const sbeachButtonComponent = new ButtonComponent(sbeach);
        sbeachButtonComponent.upTexture = { "key": "map", "frame": "map/sbeach0001" };
        sbeachButtonComponent.overTexture = { "key": "map", "frame": "map/sbeach0002" };
        sbeachButtonComponent.handCursor = true;
        sbeachButtonComponent.pixelPerfect = true;

        // scove (components)
        const scoveButtonComponent = new ButtonComponent(scove);
        scoveButtonComponent.upTexture = { "key": "map", "frame": "map/scove0001" };
        scoveButtonComponent.overTexture = { "key": "map", "frame": "map/scove0002" };
        scoveButtonComponent.handCursor = true;
        scoveButtonComponent.pixelPerfect = true;

        // sdock (components)
        const sdockButtonComponent = new ButtonComponent(sdock);
        sdockButtonComponent.upTexture = { "key": "map", "frame": "map/sdock0001" };
        sdockButtonComponent.overTexture = { "key": "map", "frame": "map/sdock0002" };
        sdockButtonComponent.handCursor = true;
        sdockButtonComponent.pixelPerfect = true;

        // sdojoext (components)
        const sdojoextButtonComponent = new ButtonComponent(sdojoext);
        sdojoextButtonComponent.upTexture = { "key": "map", "frame": "map/sdojo0001" };
        sdojoextButtonComponent.overTexture = { "key": "map", "frame": "map/sdojo0002" };
        sdojoextButtonComponent.handCursor = true;
        sdojoextButtonComponent.pixelPerfect = true;

        // sforest (components)
        const sforestButtonComponent = new ButtonComponent(sforest);
        sforestButtonComponent.upTexture = { "key": "map", "frame": "map/sforest0001" };
        sforestButtonComponent.overTexture = { "key": "map", "frame": "map/sforest0002" };
        sforestButtonComponent.handCursor = true;
        sforestButtonComponent.pixelPerfect = true;

        // sforts (components)
        const sfortsButtonComponent = new ButtonComponent(sforts);
        sfortsButtonComponent.upTexture = { "key": "map", "frame": "map/sforts0001" };
        sfortsButtonComponent.overTexture = { "key": "map", "frame": "map/sforts0002" };
        sfortsButtonComponent.handCursor = true;
        sfortsButtonComponent.pixelPerfect = true;

        // sigloos (components)
        const sigloosButtonComponent = new ButtonComponent(sigloos);
        sigloosButtonComponent.upTexture = { "key": "map", "frame": "map/sigloos0001" };
        sigloosButtonComponent.overTexture = { "key": "map", "frame": "map/sigloos0002" };
        sigloosButtonComponent.handCursor = true;
        sigloosButtonComponent.pixelPerfect = true;

        // smtn (components)
        const smtnButtonComponent = new ButtonComponent(smtn);
        smtnButtonComponent.upTexture = { "key": "map", "frame": "map/smtn0001" };
        smtnButtonComponent.overTexture = { "key": "map", "frame": "map/smtn0002" };
        smtnButtonComponent.handCursor = true;
        smtnButtonComponent.pixelPerfect = true;

        // splaza (components)
        const splazaButtonComponent = new ButtonComponent(splaza);
        splazaButtonComponent.upTexture = { "key": "map", "frame": "map/splaza0001" };
        splazaButtonComponent.overTexture = { "key": "map", "frame": "map/splaza0002" };
        splazaButtonComponent.handCursor = true;
        splazaButtonComponent.pixelPerfect = true;

        // srink (components)
        const srinkButtonComponent = new ButtonComponent(srink);
        srinkButtonComponent.upTexture = { "key": "map", "frame": "map/srink0001" };
        srinkButtonComponent.overTexture = { "key": "map", "frame": "map/srink0002" };
        srinkButtonComponent.handCursor = true;
        srinkButtonComponent.pixelPerfect = true;

        // stown (components)
        const stownButtonComponent = new ButtonComponent(stown);
        stownButtonComponent.upTexture = { "key": "map", "frame": "map/stown0001" };
        stownButtonComponent.overTexture = { "key": "map", "frame": "map/stown0002" };
        stownButtonComponent.handCursor = true;
        stownButtonComponent.pixelPerfect = true;

        // svillage (components)
        const svillageButtonComponent = new ButtonComponent(svillage);
        svillageButtonComponent.upTexture = { "key": "map", "frame": "map/svillage0001" };
        svillageButtonComponent.overTexture = { "key": "map", "frame": "map/svillage0002" };
        svillageButtonComponent.handCursor = true;
        svillageButtonComponent.pixelPerfect = true;

        // sberg (components)
        const sbergButtonComponent = new ButtonComponent(sberg);
        sbergButtonComponent.handCursor = true;
        sbergButtonComponent.pixelPerfect = true;

        // aqua (components)
        const aquaButtonComponent = new ButtonComponent(aqua);
        aquaButtonComponent.upTexture = { "key": "map", "frame": "map/aqua0001" };
        aquaButtonComponent.overTexture = { "key": "map", "frame": "map/aqua0002" };
        aquaButtonComponent.handCursor = true;
        aquaButtonComponent.pixelPerfect = true;

        // arcade (components)
        const arcadeButtonComponent = new ButtonComponent(arcade);
        arcadeButtonComponent.upTexture = { "key": "map", "frame": "map/arcade0001" };
        arcadeButtonComponent.overTexture = { "key": "map", "frame": "map/arcade0002" };
        arcadeButtonComponent.handCursor = true;
        arcadeButtonComponent.pixelPerfect = true;

        // bean (components)
        const beanButtonComponent = new ButtonComponent(bean);
        beanButtonComponent.upTexture = { "key": "map", "frame": "map/bean0001" };
        beanButtonComponent.overTexture = { "key": "map", "frame": "map/bean0002" };
        beanButtonComponent.handCursor = true;
        beanButtonComponent.pixelPerfect = true;

        // cardjitsu (components)
        const cardjitsuButtonComponent = new ButtonComponent(cardjitsu);
        cardjitsuButtonComponent.upTexture = { "key": "map", "frame": "map/cardjitsu0001" };
        cardjitsuButtonComponent.overTexture = { "key": "map", "frame": "map/cardjitsu0002" };
        cardjitsuButtonComponent.handCursor = true;
        cardjitsuButtonComponent.pixelPerfect = true;

        // cart (components)
        const cartButtonComponent = new ButtonComponent(cart);
        cartButtonComponent.upTexture = { "key": "map", "frame": "map/cart0001" };
        cartButtonComponent.overTexture = { "key": "map", "frame": "map/cart0002" };
        cartButtonComponent.handCursor = true;
        cartButtonComponent.pixelPerfect = true;

        // dance (components)
        const danceButtonComponent = new ButtonComponent(dance);
        danceButtonComponent.upTexture = { "key": "map", "frame": "map/dance0001" };
        danceButtonComponent.overTexture = { "key": "map", "frame": "map/dance0002" };
        danceButtonComponent.handCursor = true;
        danceButtonComponent.pixelPerfect = true;

        // dj (components)
        const djButtonComponent = new ButtonComponent(dj);
        djButtonComponent.upTexture = { "key": "map", "frame": "map/dj0001" };
        djButtonComponent.overTexture = { "key": "map", "frame": "map/dj0002" };
        djButtonComponent.handCursor = true;
        djButtonComponent.pixelPerfect = true;

        // fish (components)
        const fishButtonComponent = new ButtonComponent(fish);
        fishButtonComponent.upTexture = { "key": "map", "frame": "map/fish0001" };
        fishButtonComponent.overTexture = { "key": "map", "frame": "map/fish0002" };
        fishButtonComponent.handCursor = true;
        fishButtonComponent.pixelPerfect = true;

        // escape (components)
        const escapeButtonComponent = new ButtonComponent(escape);
        escapeButtonComponent.upTexture = { "key": "map", "frame": "map/escape0001" };
        escapeButtonComponent.overTexture = { "key": "map", "frame": "map/escape0002" };
        escapeButtonComponent.handCursor = true;
        escapeButtonComponent.pixelPerfect = true;

        // sledrace (components)
        const sledraceButtonComponent = new ButtonComponent(sledrace);
        sledraceButtonComponent.upTexture = { "key": "map", "frame": "map/sledrace0001" };
        sledraceButtonComponent.overTexture = { "key": "map", "frame": "map/sledrace0002" };
        sledraceButtonComponent.handCursor = true;
        sledraceButtonComponent.pixelPerfect = true;

        // jetpack (components)
        const jetpackButtonComponent = new ButtonComponent(jetpack);
        jetpackButtonComponent.upTexture = { "key": "map", "frame": "map/jetpack0001" };
        jetpackButtonComponent.overTexture = { "key": "map", "frame": "map/jetpack0002" };
        jetpackButtonComponent.handCursor = true;
        jetpackButtonComponent.pixelPerfect = true;

        // launch (components)
        const launchButtonComponent = new ButtonComponent(launch);
        launchButtonComponent.upTexture = { "key": "map", "frame": "map/launch0001" };
        launchButtonComponent.overTexture = { "key": "map", "frame": "map/launch0002" };
        launchButtonComponent.handCursor = true;
        launchButtonComponent.pixelPerfect = true;

        // pizza (components)
        const pizzaButtonComponent = new ButtonComponent(pizza);
        pizzaButtonComponent.upTexture = { "key": "map", "frame": "map/pizza0001" };
        pizzaButtonComponent.overTexture = { "key": "map", "frame": "map/pizza0002" };
        pizzaButtonComponent.handCursor = true;
        pizzaButtonComponent.pixelPerfect = true;

        // roundup (components)
        const roundupButtonComponent = new ButtonComponent(roundup);
        roundupButtonComponent.upTexture = { "key": "map", "frame": "map/roundup0001" };
        roundupButtonComponent.overTexture = { "key": "map", "frame": "map/roundup0002" };
        roundupButtonComponent.handCursor = true;
        roundupButtonComponent.pixelPerfect = true;

        // rescue (components)
        const rescueButtonComponent = new ButtonComponent(rescue);
        rescueButtonComponent.upTexture = { "key": "map", "frame": "map/rescue0001" };
        rescueButtonComponent.overTexture = { "key": "map", "frame": "map/rescue0002" };
        rescueButtonComponent.handCursor = true;
        rescueButtonComponent.pixelPerfect = true;

        // smoothie (components)
        const smoothieButtonComponent = new ButtonComponent(smoothie);
        smoothieButtonComponent.upTexture = { "key": "map", "frame": "map/smoothie0001" };
        smoothieButtonComponent.overTexture = { "key": "map", "frame": "map/smoothie0002" };
        smoothieButtonComponent.handCursor = true;
        smoothieButtonComponent.pixelPerfect = true;

        // hydro (components)
        const hydroButtonComponent = new ButtonComponent(hydro);
        hydroButtonComponent.upTexture = { "key": "map", "frame": "map/hydro0001" };
        hydroButtonComponent.overTexture = { "key": "map", "frame": "map/hydro0002" };
        hydroButtonComponent.handCursor = true;
        hydroButtonComponent.pixelPerfect = true;

        // waves (components)
        const wavesButtonComponent = new ButtonComponent(waves);
        wavesButtonComponent.upTexture = { "key": "map", "frame": "map/waves0001" };
        wavesButtonComponent.overTexture = { "key": "map", "frame": "map/waves0002" };
        wavesButtonComponent.handCursor = true;
        wavesButtonComponent.pixelPerfect = true;

        // cardcat (components)
        const cardcatButtonComponent = new ButtonComponent(cardcat);
        cardcatButtonComponent.upTexture = { "key": "map", "frame": "map/cardcat0001" };
        cardcatButtonComponent.overTexture = { "key": "map", "frame": "map/cardcat0002" };
        cardcatButtonComponent.handCursor = true;
        cardcatButtonComponent.pixelPerfect = true;

        // clothescat (components)
        const clothescatButtonComponent = new ButtonComponent(clothescat);
        clothescatButtonComponent.upTexture = { "key": "map", "frame": "map/clothescat0001" };
        clothescatButtonComponent.overTexture = { "key": "map", "frame": "map/clothescat0002" };
        clothescatButtonComponent.handCursor = true;
        clothescatButtonComponent.pixelPerfect = true;

        // dancecat (components)
        const dancecatButtonComponent = new ButtonComponent(dancecat);
        dancecatButtonComponent.upTexture = { "key": "map", "frame": "map/dancecat0001" };
        dancecatButtonComponent.overTexture = { "key": "map", "frame": "map/dancecat0002" };
        dancecatButtonComponent.handCursor = true;
        dancecatButtonComponent.pixelPerfect = true;

        // fishcat (components)
        const fishcatButtonComponent = new ButtonComponent(fishcat);
        fishcatButtonComponent.upTexture = { "key": "map", "frame": "map/fishcat0001" };
        fishcatButtonComponent.overTexture = { "key": "map", "frame": "map/fishcat0002" };
        fishcatButtonComponent.handCursor = true;
        fishcatButtonComponent.pixelPerfect = true;

        // sledcat (components)
        const sledcatButtonComponent = new ButtonComponent(sledcat);
        sledcatButtonComponent.upTexture = { "key": "map", "frame": "map/sledcat0001" };
        sledcatButtonComponent.overTexture = { "key": "map", "frame": "map/sledcat0002" };
        sledcatButtonComponent.handCursor = true;
        sledcatButtonComponent.pixelPerfect = true;

        // hydrocat (components)
        const hydrocatButtonComponent = new ButtonComponent(hydrocat);
        hydrocatButtonComponent.upTexture = { "key": "map", "frame": "map/hydrocat0001" };
        hydrocatButtonComponent.overTexture = { "key": "map", "frame": "map/hydrocat0002" };
        hydrocatButtonComponent.handCursor = true;
        hydrocatButtonComponent.pixelPerfect = true;

        // instcat (components)
        const instcatButtonComponent = new ButtonComponent(instcat);
        instcatButtonComponent.upTexture = { "key": "map", "frame": "map/instcat0001" };
        instcatButtonComponent.overTexture = { "key": "map", "frame": "map/instcat0002" };
        instcatButtonComponent.handCursor = true;
        instcatButtonComponent.pixelPerfect = true;

        // pufflecat (components)
        const pufflecatButtonComponent = new ButtonComponent(pufflecat);
        pufflecatButtonComponent.upTexture = { "key": "map", "frame": "map/pufflecat0001" };
        pufflecatButtonComponent.overTexture = { "key": "map", "frame": "map/pufflecat0002" };
        pufflecatButtonComponent.handCursor = true;
        pufflecatButtonComponent.pixelPerfect = true;

        // sportscat (components)
        const sportscatButtonComponent = new ButtonComponent(sportscat);
        sportscatButtonComponent.upTexture = { "key": "map", "frame": "map/sportscat0001" };
        sportscatButtonComponent.overTexture = { "key": "map", "frame": "map/sportscat0002" };
        sportscatButtonComponent.handCursor = true;
        sportscatButtonComponent.pixelPerfect = true;

        // stagecat (components)
        const stagecatButtonComponent = new ButtonComponent(stagecat);
        stagecatButtonComponent.upTexture = { "key": "map", "frame": "map/stagecat0001" };
        stagecatButtonComponent.overTexture = { "key": "map", "frame": "map/stagecat0002" };
        stagecatButtonComponent.handCursor = true;
        stagecatButtonComponent.pixelPerfect = true;

        // wavescat (components)
        const wavescatButtonComponent = new ButtonComponent(wavescat);
        wavescatButtonComponent.upTexture = { "key": "map", "frame": "map/wavescat0001" };
        wavescatButtonComponent.overTexture = { "key": "map", "frame": "map/wavescat0002" };
        wavescatButtonComponent.handCursor = true;
        wavescatButtonComponent.pixelPerfect = true;

        // pescape (components)
        const pescapeButtonComponent = new ButtonComponent(pescape);
        pescapeButtonComponent.upTexture = { "key": "map", "frame": "map/pescape0001" };
        pescapeButtonComponent.overTexture = { "key": "map", "frame": "map/pescape0002" };
        pescapeButtonComponent.handCursor = true;
        pescapeButtonComponent.pixelPerfect = true;

        // pigloo (components)
        const piglooButtonComponent = new ButtonComponent(pigloo);
        piglooButtonComponent.upTexture = { "key": "map", "frame": "map/pigloo0001" };
        piglooButtonComponent.overTexture = { "key": "map", "frame": "map/pigloo0002" };
        piglooButtonComponent.handCursor = true;
        piglooButtonComponent.pixelPerfect = true;

        // ppuffle (components)
        const ppuffleButtonComponent = new ButtonComponent(ppuffle);
        ppuffleButtonComponent.upTexture = { "key": "map", "frame": "map/ppuffle0001" };
        ppuffleButtonComponent.overTexture = { "key": "map", "frame": "map/ppuffle0002" };
        ppuffleButtonComponent.handCursor = true;
        ppuffleButtonComponent.pixelPerfect = true;

        // plaunch (components)
        const plaunchButtonComponent = new ButtonComponent(plaunch);
        plaunchButtonComponent.upTexture = { "key": "map", "frame": "map/plaunch0001" };
        plaunchButtonComponent.overTexture = { "key": "map", "frame": "map/plaunch0002" };
        plaunchButtonComponent.handCursor = true;
        plaunchButtonComponent.pixelPerfect = true;

        // prainbow (components)
        const prainbowButtonComponent = new ButtonComponent(prainbow);
        prainbowButtonComponent.upTexture = { "key": "map", "frame": "map/prainbow0001" };
        prainbowButtonComponent.overTexture = { "key": "map", "frame": "map/prainbow0002" };
        prainbowButtonComponent.handCursor = true;
        prainbowButtonComponent.pixelPerfect = true;

        // pshop (components)
        const pshopButtonComponent = new ButtonComponent(pshop);
        pshopButtonComponent.upTexture = { "key": "map", "frame": "map/pshop0001" };
        pshopButtonComponent.overTexture = { "key": "map", "frame": "map/pshop0002" };
        pshopButtonComponent.handCursor = true;
        pshopButtonComponent.pixelPerfect = true;

        // proundup (components)
        const proundupButtonComponent = new ButtonComponent(proundup);
        proundupButtonComponent.upTexture = { "key": "map", "frame": "map/proundup0001" };
        proundupButtonComponent.overTexture = { "key": "map", "frame": "map/proundup0002" };
        proundupButtonComponent.handCursor = true;
        proundupButtonComponent.pixelPerfect = true;

        // paqua (components)
        const paquaButtonComponent = new ButtonComponent(paqua);
        paquaButtonComponent.upTexture = { "key": "map", "frame": "map/paqua0001" };
        paquaButtonComponent.overTexture = { "key": "map", "frame": "map/paqua0002" };
        paquaButtonComponent.handCursor = true;
        paquaButtonComponent.pixelPerfect = true;

        // parcade (components)
        const parcadeButtonComponent = new ButtonComponent(parcade);
        parcadeButtonComponent.upTexture = { "key": "map", "frame": "map/parcade0001" };
        parcadeButtonComponent.overTexture = { "key": "map", "frame": "map/parcade0002" };
        parcadeButtonComponent.handCursor = true;
        parcadeButtonComponent.pixelPerfect = true;

        // pcart (components)
        const pcartButtonComponent = new ButtonComponent(pcart);
        pcartButtonComponent.upTexture = { "key": "map", "frame": "map/pcart0001" };
        pcartButtonComponent.overTexture = { "key": "map", "frame": "map/pcart0002" };
        pcartButtonComponent.handCursor = true;
        pcartButtonComponent.pixelPerfect = true;

        // pdance (components)
        const pdanceButtonComponent = new ButtonComponent(pdance);
        pdanceButtonComponent.upTexture = { "key": "map", "frame": "map/pdance0001" };
        pdanceButtonComponent.overTexture = { "key": "map", "frame": "map/pdance0002" };
        pdanceButtonComponent.handCursor = true;
        pdanceButtonComponent.pixelPerfect = true;

        // pdj (components)
        const pdjButtonComponent = new ButtonComponent(pdj);
        pdjButtonComponent.upTexture = { "key": "map", "frame": "map/pdj0001" };
        pdjButtonComponent.overTexture = { "key": "map", "frame": "map/pdj0002" };
        pdjButtonComponent.handCursor = true;
        pdjButtonComponent.pixelPerfect = true;

        // prescue (components)
        const prescueButtonComponent = new ButtonComponent(prescue);
        prescueButtonComponent.upTexture = { "key": "map", "frame": "map/prescue0001" };
        prescueButtonComponent.overTexture = { "key": "map", "frame": "map/prescue0002" };
        prescueButtonComponent.handCursor = true;
        prescueButtonComponent.pixelPerfect = true;

        // pjetpack (components)
        const pjetpackButtonComponent = new ButtonComponent(pjetpack);
        pjetpackButtonComponent.upTexture = { "key": "map", "frame": "map/pjetpack0001" };
        pjetpackButtonComponent.overTexture = { "key": "map", "frame": "map/pjetpack0002" };
        pjetpackButtonComponent.handCursor = true;
        pjetpackButtonComponent.pixelPerfect = true;

        // pwaves (components)
        const pwavesButtonComponent = new ButtonComponent(pwaves);
        pwavesButtonComponent.upTexture = { "key": "map", "frame": "map/pwaves0001" };
        pwavesButtonComponent.overTexture = { "key": "map", "frame": "map/pwaves0002" };
        pwavesButtonComponent.handCursor = true;
        pwavesButtonComponent.pixelPerfect = true;

        // close (components)
        const closeButtonComponent = new ButtonComponent(close);
        closeButtonComponent.upTexture = { "key": "map", "frame": "map/close0001" };
        closeButtonComponent.overTexture = { "key": "map", "frame": "map/close0002" };
        closeButtonComponent.downTexture = { "key": "map", "frame": "map/close0003" };
        closeButtonComponent.handCursor = true;
        closeButtonComponent.pixelPerfect = true;

        this.dojoext = dojoext;
        this.mtn = mtn;
        this.village = village;
        this.dock = dock;
        this.beach = beach;
        this.igloos = igloos;
        this.shack = shack;
        this.berg = berg;
        this.town = town;
        this.plaza = plaza;
        this.forest = forest;
        this.cove = cove;
        this.forts = forts;
        this.rink = rink;
        this.tint = tint;
        this.sshack = sshack;
        this.sbeach = sbeach;
        this.scove = scove;
        this.sdock = sdock;
        this.sdojoext = sdojoext;
        this.sforest = sforest;
        this.sforts = sforts;
        this.sigloos = sigloos;
        this.smtn = smtn;
        this.splaza = splaza;
        this.srink = srink;
        this.stown = stown;
        this.svillage = svillage;
        this.sberg = sberg;
        this.places = places;
        this.aqua = aqua;
        this.arcade = arcade;
        this.bean = bean;
        this.cardjitsu = cardjitsu;
        this.cart = cart;
        this.dance = dance;
        this.dj = dj;
        this.fish = fish;
        this.escape = escape;
        this.sledrace = sledrace;
        this.jetpack = jetpack;
        this.launch = launch;
        this.pizza = pizza;
        this.roundup = roundup;
        this.rescue = rescue;
        this.smoothie = smoothie;
        this.hydro = hydro;
        this.waves = waves;
        this.games = games;
        this.cardcat = cardcat;
        this.clothescat = clothescat;
        this.dancecat = dancecat;
        this.fishcat = fishcat;
        this.sledcat = sledcat;
        this.hydrocat = hydrocat;
        this.instcat = instcat;
        this.pufflecat = pufflecat;
        this.sportscat = sportscat;
        this.stagecat = stagecat;
        this.wavescat = wavescat;
        this.shop = shop;
        this.pescape = pescape;
        this.pigloo = pigloo;
        this.ppuffle = ppuffle;
        this.plaunch = plaunch;
        this.prainbow = prainbow;
        this.pshop = pshop;
        this.proundup = proundup;
        this.pets = pets;
        this.paqua = paqua;
        this.parcade = parcade;
        this.pcart = pcart;
        this.pdance = pdance;
        this.pdj = pdj;
        this.prescue = prescue;
        this.pjetpack = pjetpack;
        this.pwaves = pwaves;
        this.pet_games = pet_games;
        this.border = border;
        this.navigation = navigation;
        this.close = close;

        this.events.emit("scene-awake");
    }

    public dojoext!: Phaser.GameObjects.Image;
    public mtn!: Phaser.GameObjects.Image;
    public village!: Phaser.GameObjects.Image;
    public dock!: Phaser.GameObjects.Image;
    public beach!: Phaser.GameObjects.Image;
    public igloos!: Phaser.GameObjects.Image;
    public shack!: Phaser.GameObjects.Image;
    public berg!: Phaser.GameObjects.Image;
    public town!: Phaser.GameObjects.Image;
    public plaza!: Phaser.GameObjects.Image;
    public forest!: Phaser.GameObjects.Image;
    public cove!: Phaser.GameObjects.Image;
    public forts!: Phaser.GameObjects.Image;
    public rink!: Phaser.GameObjects.Image;
    public tint!: Phaser.GameObjects.Rectangle;
    public sshack!: Phaser.GameObjects.Image;
    public sbeach!: Phaser.GameObjects.Image;
    public scove!: Phaser.GameObjects.Image;
    public sdock!: Phaser.GameObjects.Image;
    public sdojoext!: Phaser.GameObjects.Image;
    public sforest!: Phaser.GameObjects.Image;
    public sforts!: Phaser.GameObjects.Image;
    public sigloos!: Phaser.GameObjects.Image;
    public smtn!: Phaser.GameObjects.Image;
    public splaza!: Phaser.GameObjects.Image;
    public srink!: Phaser.GameObjects.Image;
    public stown!: Phaser.GameObjects.Image;
    public svillage!: Phaser.GameObjects.Image;
    public sberg!: Phaser.GameObjects.Image;
    public places!: Phaser.GameObjects.Layer;
    public aqua!: Phaser.GameObjects.Image;
    public arcade!: Phaser.GameObjects.Image;
    public bean!: Phaser.GameObjects.Image;
    public cardjitsu!: Phaser.GameObjects.Image;
    public cart!: Phaser.GameObjects.Image;
    public dance!: Phaser.GameObjects.Image;
    public dj!: Phaser.GameObjects.Image;
    public fish!: Phaser.GameObjects.Image;
    public escape!: Phaser.GameObjects.Image;
    public sledrace!: Phaser.GameObjects.Image;
    public jetpack!: Phaser.GameObjects.Image;
    public launch!: Phaser.GameObjects.Image;
    public pizza!: Phaser.GameObjects.Image;
    public roundup!: Phaser.GameObjects.Image;
    public rescue!: Phaser.GameObjects.Image;
    public smoothie!: Phaser.GameObjects.Image;
    public hydro!: Phaser.GameObjects.Image;
    public waves!: Phaser.GameObjects.Image;
    public games!: Phaser.GameObjects.Layer;
    public cardcat!: Phaser.GameObjects.Image;
    public clothescat!: Phaser.GameObjects.Image;
    public dancecat!: Phaser.GameObjects.Image;
    public fishcat!: Phaser.GameObjects.Image;
    public sledcat!: Phaser.GameObjects.Image;
    public hydrocat!: Phaser.GameObjects.Image;
    public instcat!: Phaser.GameObjects.Image;
    public pufflecat!: Phaser.GameObjects.Image;
    public sportscat!: Phaser.GameObjects.Image;
    public stagecat!: Phaser.GameObjects.Image;
    public wavescat!: Phaser.GameObjects.Image;
    public shop!: Phaser.GameObjects.Layer;
    public pescape!: Phaser.GameObjects.Image;
    public pigloo!: Phaser.GameObjects.Image;
    public ppuffle!: Phaser.GameObjects.Image;
    public plaunch!: Phaser.GameObjects.Image;
    public prainbow!: Phaser.GameObjects.Image;
    public pshop!: Phaser.GameObjects.Image;
    public proundup!: Phaser.GameObjects.Image;
    public pets!: Phaser.GameObjects.Layer;
    public paqua!: Phaser.GameObjects.Image;
    public parcade!: Phaser.GameObjects.Image;
    public pcart!: Phaser.GameObjects.Image;
    public pdance!: Phaser.GameObjects.Image;
    public pdj!: Phaser.GameObjects.Image;
    public prescue!: Phaser.GameObjects.Image;
    public pjetpack!: Phaser.GameObjects.Image;
    public pwaves!: Phaser.GameObjects.Image;
    public pet_games!: Phaser.GameObjects.Layer;
    public border!: Phaser.GameObjects.Image;
    public navigation!: Navigation;
    public close!: Phaser.GameObjects.Image;

    /* START-USER-CODE */

    declare game: App;

    public hidesInterface = true;

    init(data: any): void {
        this.scene.moveBelow('Interface');

        if (data.oninit) data.oninit(this);
    }

    get engine(): Engine {
        return (this.scene.get('Engine') as Engine);
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    private _category = MapCategory.NO_CATEGORY;

    get category(): MapCategory {
        return this._category;
    }

    showCategory(category: MapCategory) {
        switch (category) {
            case MapCategory.GAMES:
                this.tint.visible = true;
                this.games.visible = true;
                this.places.visible = false;
                this.shop.visible = false;
                this.pets.visible = false;
                this.pet_games.visible = false;
                break;
            case MapCategory.PLACES:
                this.tint.visible = true;
                this.games.visible = false;
                this.places.visible = true;
                this.shop.visible = false;
                this.pets.visible = false;
                this.pet_games.visible = false;
                break;
            case MapCategory.SHOP:
                this.tint.visible = true;
                this.games.visible = false;
                this.places.visible = false;
                this.shop.visible = true;
                this.pets.visible = false;
                this.pet_games.visible = false;
                break;
            case MapCategory.PETS:
                this.tint.visible = true;
                this.games.visible = false;
                this.places.visible = false;
                this.shop.visible = false;
                this.pets.visible = true;
                this.pet_games.visible = false;
                break;
            case MapCategory.PET_GAMES:
                this.tint.visible = true;
                this.games.visible = false;
                this.places.visible = false;
                this.shop.visible = false;
                this.pets.visible = true;
                this.pet_games.visible = true;
                break;
            default:
                this.tint.visible = false;
                this.games.visible = false;
                this.places.visible = false;
                this.shop.visible = false;
                this.pets.visible = false;
                this.pet_games.visible = false;
                break;
        }

        this._category = category;
    }

    create(data: any) {

        this.editorCreate();

        this.close.on('release', () => this.interface.safeCloseContent());

        /* BASE MAP */

        this.setupButton(this.town, { x: 640.9125, y: 654.525 }, 'town', '100');
        this.setupButton(this.village, { x: 415.35, y: 517.725 }, 'ski_village', '200');
        this.setupButton(this.mtn, { x: 366.525, y: 410.5125 }, 'ski_hill', '230');
        this.setupButton(this.plaza, { x: 1122.975, y: 617.0625 }, 'plaza', '300');
        this.setupButton(this.dojoext, { x: 1022.4, y: 310.1625 }, 'dojo', '321');
        this.setupButton(this.beach, { x: 150.4125, y: 696.7125 }, 'beach', '400');
        this.setupButton(this.dock, { x: 337.1625, y: 889.425 }, 'dock', '800');
        this.setupButton(this.forts, { x: 866.8125, y: 587.1375 }, 'forts', '801');
        this.setupButton(this.rink, { x: 734.0625, y: 494.55 }, 'ice_rink', '802');
        this.setupButton(this.berg, undefined, undefined, '805');
        this.setupButton(this.shack, { x: 1377.7875, y: 536.175 }, 'mine_shack', '807');
        this.setupButton(this.forest, { x: 1330.425, y: 710.4375 }, 'forest', '809');
        this.setupButton(this.cove, { x: 1572.75, y: 735.4125 }, 'cove', '810');
        this.setupButton(this.igloos, { x: 664.3125, y: 836.6625 }, 'open_igloos', undefined);
        this.igloos.on('release', this.openIglooList, this);

        /* PLACES */

        this.setupButton(this.stown, { x: 640.9125, y: 654.525 }, 'town', '100');
        this.setupButton(this.svillage, { x: 415.35, y: 517.725 }, 'ski_village', '200');
        this.setupButton(this.smtn, { x: 366.525, y: 410.5125 }, 'ski_hill', '230');
        this.setupButton(this.splaza, { x: 1122.975, y: 617.0625 }, 'plaza', '300');
        this.setupButton(this.sdojoext, { x: 1022.4, y: 310.1625 }, 'dojo', '321');
        this.setupButton(this.sbeach, { x: 150.4125, y: 696.7125 }, 'beach', '400');
        this.setupButton(this.sdock, { x: 337.1625, y: 889.425 }, 'dock', '800');
        this.setupButton(this.sforts, { x: 866.8125, y: 587.1375 }, 'forts', '801');
        this.setupButton(this.srink, { x: 734.0625, y: 494.55 }, 'ice_rink', '802');
        this.setupButton(this.sberg, undefined, undefined, '805');
        this.setupButton(this.sshack, { x: 1377.7875, y: 536.175 }, 'mine_shack', '807');
        this.setupButton(this.sforest, { x: 1330.425, y: 710.4375 }, 'forest', '809');
        this.setupButton(this.scove, { x: 1572.75, y: 735.4125 }, 'cove', '810');
        this.setupButton(this.sigloos, { x: 664.3125, y: 836.6625 }, 'open_igloos', undefined);
        this.sigloos.on('release', this.openIglooList, this);

        /* GAMES */

        this.setupButton(this.waves, this.waves, 'catchin_waves', '810');
        this.setupButton(this.hydro, this.hydro, 'hydro_hopper', '800');
        this.setupButton(this.smoothie, this.smoothie, 'smoothie_smash', '110');
        this.setupButton(this.rescue, this.rescue, 'puffle_rescue', '808');
        this.setupButton(this.roundup, this.roundup, 'puffle_round_up', '310');
        this.setupButton(this.pizza, this.pizza, 'pizzatron_3000', '330');
        this.setupButton(this.launch, this.launch, 'puffle_launch', '310');
        this.setupButton(this.jetpack, this.jetpack, 'jet_pack_adventure', '411');
        this.setupButton(this.sledrace, this.sledrace, 'sled_racing', '230');
        this.setupButton(this.escape, this.escape, 'pufflescape', '310');
        this.setupButton(this.fish, this.fish, 'ice_fishing', '220');
        this.setupButton(this.dj, this.dj, 'dj3k', '120');
        this.setupButton(this.dance, this.dance, 'dance_contest', '120');
        this.setupButton(this.cart, this.cart, 'cart_surfer', '808');
        this.setupButton(this.cardjitsu, this.cardjitsu, 'card_jitsu', '320');
        this.setupButton(this.bean, this.bean, 'bean_counters', '110');
        this.setupButton(this.arcade, this.arcade, 'arcade', '121');
        this.setupButton(this.aqua, this.aqua, 'aqua_grabber', '805');

        /* SHOP */

        this.setupButton(this.wavescat, this.wavescat, 'surf_upgrade', '810');
        this.setupButton(this.stagecat, this.stagecat, 'costume_trunk', '340');
        this.setupButton(this.sportscat, this.sportscat, 'snow_and_sports', '802');
        this.setupButton(this.pufflecat, this.pufflecat, 'pet_furniture', '310');
        this.setupButton(this.instcat, this.instcat, 'music_catalogue', '410');
        this.setupButton(this.hydrocat, this.hydrocat, 'tubing_upgrade', '800');
        this.setupButton(this.sledcat, this.sledcat, 'sled_upgrade', '230');
        this.setupButton(this.fishcat, this.fishcat, 'fishing_upgrade', '220');
        this.setupButton(this.dancecat, this.dancecat, 'dj3k_upgrade', '120');
        this.setupButton(this.clothescat, this.clothescat, 'penguin_style', '130');
        this.setupButton(this.cardcat, this.cardcat, 'martial_arts', '320');

        /* PET */

        this.setupButton(this.proundup, this.proundup, 'puffle_round_up', '310');
        this.setupButton(this.pshop, this.pshop, 'pet_furniture', '310');
        this.setupButton(this.prainbow, this.prainbow, 'hotel_lobby', '430');
        this.setupButton(this.plaunch, this.plaunch, 'puffle_launch', '310');
        this.setupButton(this.ppuffle, this.ppuffle, 'puffle_adoption', '310');
        this.setupButton(this.pescape, this.pescape, 'pufflescape', '310');
        this.setupButton(this.pigloo, this.pigloo, 'igloo', undefined);
        this.pigloo.on('release', this.goToMyIgloo, this);

        /* PET GAMES */

        this.setupButton(this.pjetpack, this.pjetpack, 'jet_pack_adventure', '310');
        this.setupButton(this.prescue, this.prescue, 'puffle_rescue', '310');
        this.setupButton(this.pdj, this.pdj, 'dj3k', '120');
        this.setupButton(this.pdance, this.pdance, 'dance_contest', '120');
        this.setupButton(this.pcart, this.pcart, 'cart_surfer', '808');
        this.setupButton(this.parcade, this.parcade, 'arcade', '121');
        this.setupButton(this.paqua, this.paqua, 'aqua_grabber', '805');
        this.setupButton(this.pwaves, this.pwaves, 'catchin_waves', '810');

        this.game.locale.register(this.localize, this);

        let shouldTransition = false;
        if (data.onready) data.onready(this);
        if (shouldTransition) this.transitionLayout();

    }

    transitionLayout(): void {
        this.navigation.bg.visible = true;
        this.border.setFrame('map/nav0001');
        this.tweens.add({
            targets: this.navigation,
            x: { from: 535.5, to: 1.4625 },
            y: { from: 403.5375, to: 4.275 },
            scale: { from: 1, to: 0.85 },
            duration: 500,
            onComplete: () => {
                this.navigation.bg.visible = false;
                this.border.setFrame('map/nav0002');
            }
        });
    }

    localize(locale: Locale): void {
        this.navigation.gamesLabel.text = locale.localize('map_games_string');
        this.navigation.placesLabel.text = locale.localize('map_places_string');
        this.navigation.shopLabel.text = locale.localize('map_shop_string');
        this.navigation.petsLabel.text = locale.localize('map_pets_string');

        if (this.category == MapCategory.PET_GAMES) {
            this.navigation.petsHintLabel.text = locale.localize('w.map.puffle.play.games');
            this.navigation.petsButtonLabel.text = locale.localize('w.map.hide.games');
        } else {
            this.navigation.petsHintLabel.text = locale.localize('w.map.walk.puffle');
            this.navigation.petsButtonLabel.text = locale.localize('w.map.show.games');
        }
    }

    unload(interface_: Interface): void {
        this.game.locale.unregister(this.localize);
        interface_.game.unloadAssetPack('map-pack');
    }

    setupButton(button: Phaser.GameObjects.Image, at: Phaser.Types.Math.Vector2Like, hint: string, roomId: string): void {
        if (hint) {
            button.on('over', () => this.interface.showLocalizedHint(at, `w.map.${hint}`, 0, 63));
            button.on('out', () => this.interface.hideHint());
        }
        if (roomId) button.on('release', () => {
            if (this.engine.currentRoomId.toString() != roomId) this.engine.joinRoom(this.game.gameConfig.rooms[roomId]);
            else this.interface.safeCloseContent();
            this.interface.hideHint();
        });
    }

    goToMyIgloo(): void {
        // TODO: go to player igloo
        this.interface.safeCloseContent();
        this.interface.hideHint();
    }

    openIglooList(): void {
        // TODO: show open igloo list
        this.interface.safeCloseContent();
        this.interface.hideHint();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
