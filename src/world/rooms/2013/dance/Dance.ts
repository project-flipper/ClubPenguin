
// You can write more code here

/* START OF COMPILED CODE */

import ButtonComponent from "../../../../lib/ui/components/ButtonComponent";
import DepthEnabled from "../../../../lib/ui/components/DepthEnabled";
import RoomTrigger from "../../../../lib/ui/components/RoomTrigger";
import Trigger from "../../../../lib/ui/components/Trigger";
/* START-USER-IMPORTS */
import Phaser from "phaser";

import { App } from "@clubpenguin/app/app";
import { Engine, Room } from "@clubpenguin/world/engine/engine";
import Interface from "@clubpenguin/world/interface/Interface";
import { Locale } from "@clubpenguin/app/locale";
import World from "@clubpenguin/world/World";
/* END-USER-IMPORTS */

export default class Dance extends Phaser.Scene implements Room {

    constructor() {
        super("Dance");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    preload(): void {

        this.load.pack("dance-pack", "assets/world/rooms/2013/dance/dance-pack.json");
    }

    editorCreate(): void {

        // stairs
        const stairs = this.add.image(1417.275, 197.325, "dance", "dance/stairs0001");
        stairs.setOrigin(0, 0);

        // dancefloor
        const dancefloor = this.add.sprite(293.0625, 548.6625, "dance", "dance/dancefloor0001");
        dancefloor.setOrigin(0, 0);

        // doorbehind
        const doorbehind = this.add.image(121.95, 235.6875, "dance", "dance/doorbehind");
        doorbehind.setOrigin(0, 0);

        // door
        const door = this.add.sprite(260.7625, 634.275, "dance", "dance/dooropen0001");
        door.setOrigin(1, 1);

        // dance_base
        const dance_base = this.add.image(-140, -135, "dance", "dance/base");
        dance_base.setOrigin(0, 0);

        // dance_djbase
        const dance_djbase = this.add.image(781.5375, 469.125, "dance", "dance/djbase");
        dance_djbase.setOrigin(0.49411765, 0.69893491);

        // mixdisplay
        const mixdisplay = this.add.image(758.3625, 384.075, "dance", "dance/mixdisplay");
        mixdisplay.setOrigin(0, 0);
        mixdisplay.visible = false;

        // mixwave
        const mixwave = this.add.sprite(723.0375, 389.8125, "dance", "dance/mixwave0001");
        mixwave.setOrigin(0, 0);
        mixwave.visible = false;

        // mixheadphonesback
        const mixheadphonesback = this.add.sprite(586, 284, "dance", "dance/mixheadphonesback0001");
        mixheadphonesback.setOrigin(0, 0);

        // mix
        const mix = this.add.image(585.9, 278.325, "dance", "dance/mix0001");
        mix.setOrigin(0, 0);

        // mixheadphonesfront
        const mixheadphonesfront = this.add.sprite(612, 283, "dance", "dance/mixheadphonesfront0001");
        mixheadphonesfront.setOrigin(0, 0);
        mixheadphonesfront.visible = false;

        // mixspeaker
        const mixspeaker = this.add.sprite(902.125, 299.675, "dance", "dance/mixspeaker0001");
        mixspeaker.setOrigin(0, 0);
        mixspeaker.visible = false;

        // mixlights
        const mixlights = this.add.sprite(677.7, 287.325, "dance", "dance/mixlights0001");
        mixlights.setOrigin(0, 0);
        mixlights.visible = false;

        // mixequalizer
        const mixequalizer = this.add.sprite(655.7625, 352.4625, "dance", "dance/mixequalizer0001");
        mixequalizer.setOrigin(0, 0);
        mixequalizer.visible = false;

        // mixdisksbase
        const mixdisksbase = this.add.sprite(694.575, 359.2125, "dance", "dance/mixdisksbase0001");
        mixdisksbase.setOrigin(0, 0);
        mixdisksbase.visible = false;

        // mixdisks
        const mixdisks = this.add.sprite(699.8625, 360.5625, "dance", "dance/mixdisks0001");
        mixdisks.setOrigin(0, 0);
        mixdisks.visible = false;

        // mixdiskreader
        const mixdiskreader = this.add.image(681.3, 364.95, "dance", "dance/mixdiskreader");
        mixdiskreader.setOrigin(0, 0);
        mixdiskreader.visible = false;

        // mixvolume
        const mixvolume = this.add.sprite(768.4875, 357.3, "dance", "dance/mixvolume0001");
        mixvolume.setOrigin(0, 0);
        mixvolume.visible = false;

        // mixsecondlights
        const mixsecondlights = this.add.sprite(764.2125, 358.2, "dance", "dance/mixsecondlights0001");
        mixsecondlights.setOrigin(0, 0);
        mixsecondlights.visible = false;

        // dance_railing2
        const dance_railing2 = this.add.image(179.4375, 649.35, "dance", "dance/railing2");
        dance_railing2.setOrigin(0.47930434782608694, 0.6607947019867549);

        // dance_couch
        const dance_couch = this.add.image(130.725, 682.5375, "dance", "dance/couch");
        dance_couch.setOrigin(0.49399441, 0.12313063);

        // speaker1
        const speaker1 = this.add.sprite(303.525, 24.4125, "dance", "dance/speaker10001");
        speaker1.setOrigin(0, 0);

        // speaker2
        const speaker2 = this.add.sprite(389.5875, 91.4625, "dance", "dance/speaker20001");
        speaker2.setOrigin(0, 0);

        // speaker3
        const speaker3 = this.add.sprite(1201.6125, 19.575, "dance", "dance/speaker30001");
        speaker3.setOrigin(0, 0);

        // boilerspeaker
        const boilerspeaker = this.add.image(1028.025, 247.05, "dance", "dance/boilerspeaker0001");
        boilerspeaker.setOrigin(0, 0);

        // puffle
        const puffle = this.add.sprite(1176.6375, 247.275, "dance", "dance/puffle0001");
        puffle.setOrigin(0.453474, 0.782609);

        // pufflehitbox
        const pufflehitbox = this.add.image(1176.6375, 247.275, "dance", "dance/pufflehitbox0004");
        pufflehitbox.alpha = 0.01;
        pufflehitbox.alphaTopLeft = 0.01;
        pufflehitbox.alphaTopRight = 0.01;
        pufflehitbox.alphaBottomLeft = 0.01;
        pufflehitbox.alphaBottomRight = 0.01;

        // boilerspeakercone
        const boilerspeakercone = this.add.sprite(1118.1375, 293.85, "dance", "dance/boilerspeakercone0001");
        boilerspeakercone.setOrigin(0, 0);

        // boilerButton
        const boilerButton = this.add.image(1028.025, 247.05, "dance", "dance/boilerspeaker0004");
        boilerButton.setOrigin(0, 0);
        boilerButton.alpha = 0.01;
        boilerButton.alphaTopLeft = 0.01;
        boilerButton.alphaTopRight = 0.01;
        boilerButton.alphaBottomLeft = 0.01;
        boilerButton.alphaBottomRight = 0.01;

        // contesthitbox
        const contesthitbox = this.add.image(1205.1, 141.1875, "dance", "dance/contesthitbox");
        contesthitbox.setOrigin(0, 0);
        contesthitbox.alpha = 0.01;
        contesthitbox.alphaTopLeft = 0.01;
        contesthitbox.alphaTopRight = 0.01;
        contesthitbox.alphaBottomLeft = 0.01;
        contesthitbox.alphaBottomRight = 0.01;

        // contest
        const contest = this.add.image(1204.1, 140.1875, "dance", "dance/contest0001_0001");
        contest.setOrigin(0, 0);

        // signuptable
        const signuptable = this.add.image(1294.2125, 476.125, "dance", "dance/signup_table");

        // pencilWrite
        const pencilWrite = this.add.sprite(1307, 461, "dance", "dance/pencilstill");
        pencilWrite.setOrigin(0.85297, 0.64478);

        // dance_stairscover
        const dance_stairscover = this.add.image(1210.05, -29.5875, "dance", "dance/stairscover");
        dance_stairscover.setOrigin(0, 0);

        // neon
        const neon = this.add.sprite(1228.725, 60.6375, "dance", "dance/neon0001");
        neon.setOrigin(0, 0);

        // djleft
        const djleft = this.add.sprite(522.45, 109.8, "dance", "dance/dj_left0001");
        djleft.setOrigin(0, 0);

        // djright
        const djright = this.add.sprite(935.1, 105.3, "dance", "dance/dj_right0001");
        djright.setOrigin(0, 0);

        // disks
        const disks = this.add.image(363.2625, 455.5125, "dance", "dance/disks0001");
        disks.setOrigin(0.53205405, 0.74149635);

        // notice
        const notice = this.add.sprite(325.125, 319.275, "dance", "dance/notice0001");
        notice.setOrigin(0, 0);
        notice.visible = false;

        // diskbox
        const diskbox = this.add.image(319.95, 365.075, "dance", "dance/diskbox");
        diskbox.setOrigin(0, 0);
        diskbox.visible = false;

        // dance_railing1
        const dance_railing1 = this.add.image(313.425, 480.0375, "dance", "dance/railing1");
        dance_railing1.setOrigin(0.47867346938775507, 0.4714285714285714);

        // disksButton
        const disksButton = this.add.image(363.2625, 455.5125, "dance", "dance/disks0004");
        disksButton.setOrigin(0.53205405, 0.74149635);
        disksButton.alpha = 0.01;
        disksButton.alphaTopLeft = 0.01;
        disksButton.alphaTopRight = 0.01;
        disksButton.alphaBottomLeft = 0.01;
        disksButton.alphaBottomRight = 0.01;

        // dance_railing
        const dance_railing = this.add.image(1324.9125, 537.975, "dance", "dance/railing");
        dance_railing.setOrigin(0.48131148, 0.38683673);

        // dance_chair2cushion
        const dance_chair2cushion = this.add.image(1509.975, 905.0625, "dance", "dance/chair2cushion");
        dance_chair2cushion.setOrigin(0.37190083, 0.07377049);

        // dance_chair2
        const dance_chair2 = this.add.image(1466.8875, 981.225, "dance", "dance/chair2");
        dance_chair2.setOrigin(0.41284404, 0.58112583);

        // dance_chair1
        const dance_chair1 = this.add.image(1628.55, 769.5, "dance", "dance/chair1");
        dance_chair1.setOrigin(0.4815286624203821, 0.45416149068322986);

        // dance_table
        const dance_table = this.add.image(1607.2875, 868.5, "dance", "dance/table");
        dance_table.setOrigin(0.48541096, 0.38370968);

        // dance_foregroundtop
        const dance_foregroundtop = this.add.image(-168.4125, 29.3625, "dance", "dance/foregroundtop");
        dance_foregroundtop.setOrigin(0, 0);

        // dance_foregroundbottom
        const dance_foregroundbottom = this.add.image(-45.675, 837.7875, "dance", "dance/foregroundbottom");
        dance_foregroundbottom.setOrigin(0, 0);

        // dance_foregroundside
        const dance_foregroundside = this.add.image(-230.5125, 810.3375, "dance", "dance/foregroundside");
        dance_foregroundside.setOrigin(0, 0);

        // dance_town_trigger
        const dance_town_trigger = this.add.image(228.2625, 555.6375, "dance", "dance/town_trigger");
        dance_town_trigger.visible = false;

        // dance_lounge_trigger
        const dance_lounge_trigger = this.add.image(1518.6375, 540, "dance", "dance/lounge_trigger");
        dance_lounge_trigger.visible = false;

        // dance_boiler_trigger
        const dance_boiler_trigger = this.add.image(1158.8625, 409.6125, "dance", "dance/boiler_trigger");
        dance_boiler_trigger.visible = false;

        // dancing_trigger
        const dancing_trigger = this.add.image(1277.325, 476.1, "dance", "dance/dancing_trigger");
        dancing_trigger.visible = false;

        // mix_trigger
        const mix_trigger = this.add.image(781.875, 393.75, "dance", "dance/mix_trigger");
        mix_trigger.visible = false;

        // dj3k
        const dj3k = this.add.image(585.9, 278.325, "dance", "dance/mix_button");
        dj3k.setOrigin(0, 0);
        dj3k.alpha = 0.01;
        dj3k.alphaTopLeft = 0.01;
        dj3k.alphaTopRight = 0.01;
        dj3k.alphaBottomLeft = 0.01;
        dj3k.alphaBottomRight = 0.01;

        // catalog
        const catalog = this.add.image(1620, 1002.375, "dance", "dance/catalog0001");

        // block
        const block = this.add.image(0, 0, "dance", "dance/block");
        block.setOrigin(0, 0);
        block.visible = false;

        // lists
        const triggers = [dance_town_trigger, dance_lounge_trigger, dance_boiler_trigger, mix_trigger, dancing_trigger];

        // stairs (components)
        const stairsButtonComponent = new ButtonComponent(stairs);
        stairsButtonComponent.upTexture = {"key":"dance","frame":"dance/stairs0001"};
        stairsButtonComponent.overTexture = {"key":"dance","frame":"dance/stairs0002"};
        stairsButtonComponent.handCursor = true;
        stairsButtonComponent.pixelPerfect = true;

        // dancefloor (components)
        const dancefloorDepthEnabled = new DepthEnabled(dancefloor);
        dancefloorDepthEnabled.automaticSort = false;
        dancefloorDepthEnabled.depth = -1;

        // doorbehind (components)
        const doorbehindButtonComponent = new ButtonComponent(doorbehind);
        doorbehindButtonComponent.handCursor = true;
        doorbehindButtonComponent.pixelPerfect = true;

        // dance_djbase (components)
        new DepthEnabled(dance_djbase);

        // mixdisplay (components)
        const mixdisplayDepthEnabled = new DepthEnabled(mixdisplay);
        mixdisplayDepthEnabled.automaticSort = false;
        mixdisplayDepthEnabled.depth = 488.3625;

        // mixwave (components)
        const mixwaveDepthEnabled = new DepthEnabled(mixwave);
        mixwaveDepthEnabled.automaticSort = false;
        mixwaveDepthEnabled.depth = 488.3625;

        // mixheadphonesback (components)
        const mixheadphonesbackDepthEnabled = new DepthEnabled(mixheadphonesback);
        mixheadphonesbackDepthEnabled.automaticSort = false;
        mixheadphonesbackDepthEnabled.depth = 488.3625;

        // mix (components)
        const mixDepthEnabled = new DepthEnabled(mix);
        mixDepthEnabled.automaticSort = false;
        mixDepthEnabled.depth = 488.3625;

        // mixheadphonesfront (components)
        const mixheadphonesfrontDepthEnabled = new DepthEnabled(mixheadphonesfront);
        mixheadphonesfrontDepthEnabled.automaticSort = false;
        mixheadphonesfrontDepthEnabled.depth = 488.3625;

        // mixspeaker (components)
        const mixspeakerDepthEnabled = new DepthEnabled(mixspeaker);
        mixspeakerDepthEnabled.automaticSort = false;
        mixspeakerDepthEnabled.depth = 488.3625;

        // mixlights (components)
        const mixlightsDepthEnabled = new DepthEnabled(mixlights);
        mixlightsDepthEnabled.automaticSort = false;
        mixlightsDepthEnabled.depth = 488.3625;

        // mixequalizer (components)
        const mixequalizerDepthEnabled = new DepthEnabled(mixequalizer);
        mixequalizerDepthEnabled.automaticSort = false;
        mixequalizerDepthEnabled.depth = 488.3625;

        // mixdisksbase (components)
        const mixdisksbaseDepthEnabled = new DepthEnabled(mixdisksbase);
        mixdisksbaseDepthEnabled.automaticSort = false;
        mixdisksbaseDepthEnabled.depth = 488.3625;

        // mixdisks (components)
        const mixdisksDepthEnabled = new DepthEnabled(mixdisks);
        mixdisksDepthEnabled.automaticSort = false;
        mixdisksDepthEnabled.depth = 488.3625;

        // mixdiskreader (components)
        const mixdiskreaderDepthEnabled = new DepthEnabled(mixdiskreader);
        mixdiskreaderDepthEnabled.automaticSort = false;
        mixdiskreaderDepthEnabled.depth = 488.3625;

        // mixvolume (components)
        const mixvolumeDepthEnabled = new DepthEnabled(mixvolume);
        mixvolumeDepthEnabled.automaticSort = false;
        mixvolumeDepthEnabled.depth = 488.3625;

        // mixsecondlights (components)
        const mixsecondlightsDepthEnabled = new DepthEnabled(mixsecondlights);
        mixsecondlightsDepthEnabled.automaticSort = false;
        mixsecondlightsDepthEnabled.depth = 488.3625;

        // dance_railing2 (components)
        new DepthEnabled(dance_railing2);

        // dance_couch (components)
        new DepthEnabled(dance_couch);

        // boilerspeaker (components)
        const boilerspeakerDepthEnabled = new DepthEnabled(boilerspeaker);
        boilerspeakerDepthEnabled.automaticSort = false;
        boilerspeakerDepthEnabled.depth = 355.6125;

        // puffle (components)
        const puffleDepthEnabled = new DepthEnabled(puffle);
        puffleDepthEnabled.automaticSort = false;
        puffleDepthEnabled.depth = 355.7;

        // pufflehitbox (components)
        const pufflehitboxButtonComponent = new ButtonComponent(pufflehitbox);
        pufflehitboxButtonComponent.pixelPerfect = true;

        // boilerspeakercone (components)
        const boilerspeakerconeDepthEnabled = new DepthEnabled(boilerspeakercone);
        boilerspeakerconeDepthEnabled.automaticSort = false;
        boilerspeakerconeDepthEnabled.depth = 355.6125;

        // boilerButton (components)
        const boilerButtonButtonComponent = new ButtonComponent(boilerButton);
        boilerButtonButtonComponent.handCursor = true;
        boilerButtonButtonComponent.pixelPerfect = true;

        // contesthitbox (components)
        const contesthitboxButtonComponent = new ButtonComponent(contesthitbox);
        contesthitboxButtonComponent.handCursor = true;
        contesthitboxButtonComponent.pixelPerfect = true;

        // contest (components)
        const contestDepthEnabled = new DepthEnabled(contest);
        contestDepthEnabled.automaticSort = false;
        contestDepthEnabled.depth = 360;

        // signuptable (components)
        const signuptableDepthEnabled = new DepthEnabled(signuptable);
        signuptableDepthEnabled.automaticSort = false;
        signuptableDepthEnabled.depth = 360.2;

        // pencilWrite (components)
        const pencilWriteDepthEnabled = new DepthEnabled(pencilWrite);
        pencilWriteDepthEnabled.automaticSort = false;
        pencilWriteDepthEnabled.depth = 360.4;

        // dance_stairscover (components)
        const dance_stairscoverDepthEnabled = new DepthEnabled(dance_stairscover);
        dance_stairscoverDepthEnabled.automaticSort = false;
        dance_stairscoverDepthEnabled.depth = 365;

        // neon (components)
        const neonDepthEnabled = new DepthEnabled(neon);
        neonDepthEnabled.automaticSort = false;
        neonDepthEnabled.depth = 366;

        // disks (components)
        new DepthEnabled(disks);

        // notice (components)
        const noticeDepthEnabled = new DepthEnabled(notice);
        noticeDepthEnabled.automaticSort = false;
        noticeDepthEnabled.depth = 455.7;

        // diskbox (components)
        const diskboxDepthEnabled = new DepthEnabled(diskbox);
        diskboxDepthEnabled.automaticSort = false;
        diskboxDepthEnabled.depth = 455.8;

        // dance_railing1 (components)
        new DepthEnabled(dance_railing1);

        // disksButton (components)
        const disksButtonButtonComponent = new ButtonComponent(disksButton);
        disksButtonButtonComponent.handCursor = true;
        disksButtonButtonComponent.pixelPerfect = true;

        // dance_railing (components)
        new DepthEnabled(dance_railing);

        // dance_chair2cushion (components)
        new DepthEnabled(dance_chair2cushion);

        // dance_chair2 (components)
        new DepthEnabled(dance_chair2);

        // dance_chair1 (components)
        new DepthEnabled(dance_chair1);

        // dance_table (components)
        new DepthEnabled(dance_table);

        // dance_foregroundtop (components)
        const dance_foregroundtopDepthEnabled = new DepthEnabled(dance_foregroundtop);
        dance_foregroundtopDepthEnabled.automaticSort = false;
        dance_foregroundtopDepthEnabled.depth = 1107.6;

        // dance_foregroundbottom (components)
        const dance_foregroundbottomDepthEnabled = new DepthEnabled(dance_foregroundbottom);
        dance_foregroundbottomDepthEnabled.automaticSort = false;
        dance_foregroundbottomDepthEnabled.depth = 1107.6;

        // dance_foregroundside (components)
        const dance_foregroundsideDepthEnabled = new DepthEnabled(dance_foregroundside);
        dance_foregroundsideDepthEnabled.depth = 1108;

        // dance_town_trigger (components)
        const dance_town_triggerRoomTrigger = new RoomTrigger(dance_town_trigger);
        dance_town_triggerRoomTrigger.destination = 100;
        dance_town_triggerRoomTrigger.playerX = 956.25;
        dance_town_triggerRoomTrigger.playerY = 562.5;

        // dance_lounge_trigger (components)
        const dance_lounge_triggerRoomTrigger = new RoomTrigger(dance_lounge_trigger);
        dance_lounge_triggerRoomTrigger.destination = 121;
        dance_lounge_triggerRoomTrigger.playerX = 1271.25;
        dance_lounge_triggerRoomTrigger.playerY = 686.25;

        // dance_boiler_trigger (components)
        const dance_boiler_triggerRoomTrigger = new RoomTrigger(dance_boiler_trigger);
        dance_boiler_triggerRoomTrigger.destination = 804;
        dance_boiler_triggerRoomTrigger.playerX = 1260;
        dance_boiler_triggerRoomTrigger.playerY = 720;

        // dancing_trigger (components)
        new Trigger(dancing_trigger);

        // mix_trigger (components)
        new Trigger(mix_trigger);

        // dj3k (components)
        const dj3kButtonComponent = new ButtonComponent(dj3k);
        dj3kButtonComponent.handCursor = true;
        dj3kButtonComponent.pixelPerfect = true;

        // catalog (components)
        const catalogButtonComponent = new ButtonComponent(catalog);
        catalogButtonComponent.upTexture = {"key":"dance","frame":"dance/catalog0001"};
        catalogButtonComponent.overTexture = {"key":"dance","frame":"dance/catalog0002"};
        catalogButtonComponent.handCursor = true;
        catalogButtonComponent.pixelPerfect = true;
        const catalogDepthEnabled = new DepthEnabled(catalog);
        catalogDepthEnabled.automaticSort = false;
        catalogDepthEnabled.depth = 1108;

        this.stairs = stairs;
        this.dancefloor = dancefloor;
        this.doorbehind = doorbehind;
        this.door = door;
        this.mixdisplay = mixdisplay;
        this.mixwave = mixwave;
        this.mixheadphonesback = mixheadphonesback;
        this.mix = mix;
        this.mixheadphonesfront = mixheadphonesfront;
        this.mixspeaker = mixspeaker;
        this.mixlights = mixlights;
        this.mixequalizer = mixequalizer;
        this.mixdisksbase = mixdisksbase;
        this.mixdisks = mixdisks;
        this.mixdiskreader = mixdiskreader;
        this.mixvolume = mixvolume;
        this.mixsecondlights = mixsecondlights;
        this.speaker1 = speaker1;
        this.speaker2 = speaker2;
        this.speaker3 = speaker3;
        this.boilerspeaker = boilerspeaker;
        this.puffle = puffle;
        this.pufflehitbox = pufflehitbox;
        this.boilerspeakercone = boilerspeakercone;
        this.boilerButton = boilerButton;
        this.contesthitbox = contesthitbox;
        this.contest = contest;
        this.signuptable = signuptable;
        this.pencilWrite = pencilWrite;
        this.neon = neon;
        this.djleft = djleft;
        this.djright = djright;
        this.disks = disks;
        this.notice = notice;
        this.diskbox = diskbox;
        this.disksButton = disksButton;
        this.dancing_trigger = dancing_trigger;
        this.mix_trigger = mix_trigger;
        this.dj3k = dj3k;
        this.catalog = catalog;
        this.block = block;
        this.triggers = triggers;

        this.events.emit("scene-awake");
    }

    public stairs!: Phaser.GameObjects.Image;
    public dancefloor!: Phaser.GameObjects.Sprite;
    public doorbehind!: Phaser.GameObjects.Image;
    public door!: Phaser.GameObjects.Sprite;
    public mixdisplay!: Phaser.GameObjects.Image;
    public mixwave!: Phaser.GameObjects.Sprite;
    public mixheadphonesback!: Phaser.GameObjects.Sprite;
    public mix!: Phaser.GameObjects.Image;
    public mixheadphonesfront!: Phaser.GameObjects.Sprite;
    public mixspeaker!: Phaser.GameObjects.Sprite;
    public mixlights!: Phaser.GameObjects.Sprite;
    public mixequalizer!: Phaser.GameObjects.Sprite;
    public mixdisksbase!: Phaser.GameObjects.Sprite;
    public mixdisks!: Phaser.GameObjects.Sprite;
    public mixdiskreader!: Phaser.GameObjects.Image;
    public mixvolume!: Phaser.GameObjects.Sprite;
    public mixsecondlights!: Phaser.GameObjects.Sprite;
    public speaker1!: Phaser.GameObjects.Sprite;
    public speaker2!: Phaser.GameObjects.Sprite;
    public speaker3!: Phaser.GameObjects.Sprite;
    public boilerspeaker!: Phaser.GameObjects.Image;
    public puffle!: Phaser.GameObjects.Sprite;
    public pufflehitbox!: Phaser.GameObjects.Image;
    public boilerspeakercone!: Phaser.GameObjects.Sprite;
    public boilerButton!: Phaser.GameObjects.Image;
    public contesthitbox!: Phaser.GameObjects.Image;
    public contest!: Phaser.GameObjects.Image;
    public signuptable!: Phaser.GameObjects.Image;
    public pencilWrite!: Phaser.GameObjects.Sprite;
    public neon!: Phaser.GameObjects.Sprite;
    public djleft!: Phaser.GameObjects.Sprite;
    public djright!: Phaser.GameObjects.Sprite;
    public disks!: Phaser.GameObjects.Image;
    public notice!: Phaser.GameObjects.Sprite;
    public diskbox!: Phaser.GameObjects.Image;
    public disksButton!: Phaser.GameObjects.Image;
    public dancing_trigger!: Phaser.GameObjects.Image;
    public mix_trigger!: Phaser.GameObjects.Image;
    public dj3k!: Phaser.GameObjects.Image;
    public catalog!: Phaser.GameObjects.Image;
    public block!: Phaser.GameObjects.Image;
    public triggers!: Phaser.GameObjects.Image[];

    /* START-USER-CODE */

    declare game: App;

    init(data: any): void {
        this.scene.moveBelow('Interface');

        if (data.oninit) data.oninit(this);
    }

    get world(): World {
        return (this.scene.get('World') as World);
    }

    get engine(): Engine {
        return this.world.engine;
    }

    get interface(): Interface {
        return (this.scene.get('Interface') as Interface);
    }

    create(data: any) {

        this.editorCreate();

        this.dancefloor.play('dance-dancefloor-animation');
        this.speaker1.play('dance-speaker1-animation');
        this.speaker2.play('dance-speaker2-animation');
        this.speaker3.play('dance-speaker3-animation');
        this.boilerspeakercone.play('dance-boilerspeakercone-animation');
        this.neon.play('dance-neon-animation');
        this.djleft.play('dance-djleft-animation');
        this.djright.play('dance-djright-animation');

        this.doorbehind.on('over', () => {
            this.sound.play('dance_door');
            this.door.play('dance-dooropen-animation');
        });
        this.doorbehind.on('out', () => {
            this.door.anims.stop();
            this.door.setFrame('dance/dooropen0001');
        });
        this.doorbehind.on('release', () => this.world.move(247.5, 551.25));

        this.stairs.on('over', () => this.sound.play('dance_lighton'));
        this.stairs.on('out', () => this.sound.play('dance_lightoff'));
        this.stairs.on('release', () => this.world.move(1518.75, 573.75));

        this.disksButton.on('over', () => {
            this.diskbox.visible = true;
            this.notice.visible = true;
            this.notice.play('dance-notice-animation');
            this.disks.setFrame('dance/disks0002')
        });
        this.disksButton.on('out', () => {
            this.diskbox.visible = false;
            this.notice.visible = false;
            this.disks.setFrame('dance/disks0001')
        });

        this.boilerButton.on('over', () => {
            this.sound.play('dance_secretopen');
            this.boilerspeakercone.visible = false;
            this.boilerspeaker.setFrame('dance/boilerspeaker0002');
        });
        this.boilerButton.on('out', () => {
            this.sound.play('dance_secretclose');
            this.boilerspeakercone.visible = true;
            this.boilerspeaker.setFrame('dance/boilerspeaker0001');
        });
        this.boilerButton.on('release', () => this.world.move(1136.25, 427.5));

        this.contesthitbox.on('release', () => this.world.move(1226.25, 495));

        this.dj3k.on('over', () => {
            this.mix.setFrame('dance/mix0002');

            this.mixdisplay.visible = true;
            this.mixwave.visible = true;
            this.mixwave.play('dance-mixwave-start-animation').chain('dance-mixwave-loop-animation');
            this.mixheadphonesback.visible = true;
            this.mixheadphonesback.play('dance-mixheadphonesback-animation');
            this.mixheadphonesfront.visible = true;
            this.mixheadphonesfront.play('dance-mixheadphonesfront-animation');
            this.mixspeaker.visible = true;
            this.mixspeaker.play('dance-mixspeaker-animation');
            this.mixlights.visible = true;
            this.mixlights.play('dance-mixlights-start-animation').chain('dance-mixlights-loop-animation');
            this.mixequalizer.visible = true;
            this.mixequalizer.play('dance-mixequalizer-start-animation').chain('dance-mixequalizer-loop-animation');
            this.mixdisksbase.visible = true;
            this.mixdisksbase.play('dance-mixdisksbase-animation');
            this.mixdisks.visible = true;
            this.mixdisks.play('dance-mixdisks-animation');
            this.mixdiskreader.visible = true;
            this.mixvolume.visible = true;
            this.mixvolume.play('dance-mixvolume-animation');
            this.mixsecondlights.visible = true;
            this.mixsecondlights.play('dance-mixsecondlights-animation');

            this.interface.showLocalizedHint({ x: 787.5, y: 360 }, 'mixmaster_hint');
        });
        this.dj3k.on('out', () => {
            this.mix.setFrame('dance/mix0001');

            this.mixdisplay.visible = false;
            this.mixwave.chain().stop();
            this.mixwave.visible = false;
            this.mixheadphonesback.stop();
            this.mixheadphonesback.visible = false;
            this.mixheadphonesfront.stop();
            this.mixheadphonesfront.visible = false;
            this.mixspeaker.stop();
            this.mixspeaker.visible = false;
            this.mixlights.chain().stop();
            this.mixlights.visible = false;
            this.mixequalizer.chain().stop();
            this.mixequalizer.visible = false;
            this.mixdisksbase.stop();
            this.mixdisksbase.visible = false;
            this.mixdisks.stop();
            this.mixdisks.visible = false;
            this.mixdiskreader.visible = false;
            this.mixvolume.stop();
            this.mixvolume.visible = false;
            this.mixsecondlights.stop();
            this.mixsecondlights.visible = false;

            this.interface.hideHint();
        });
        this.dj3k.on('release', () => this.world.move(787.5, 371.25));

        this.pufflehitbox.on('over', () => {
            this.puffle.anims.chain();
            this.puffle.play('dance-pufflejump-animation').chain('dance-puffleidle-animation');
        });

        this.puffle.play('dance-puffleidle-animation');

        Trigger.getComponent(this.mix_trigger).execute = (engine, player) => {
            if (engine.player != player) return;
            this.interface.promptQuestion.showLocalized('mixmaster_prompt', () => {
                this.world.startGame('mixmaster', {});
            }, () => { });
        }

        Trigger.getComponent(this.dancing_trigger).execute = (engine, player) => {
            if (engine.player != player) return;
            this.interface.promptQuestion.showLocalized('dancing_prompt', () => {
                this.world.startGame('dancing', {});
            }, () => { });
        }

        this.game.locale.register(this.localize, this);

        if (data.onready) data.onready(this);
    }

    localize(locale: Locale): void {
        if (this.contest.frame.name.endsWith('1')) this.contest.setFrame(`dance/contest${locale.frame}_0001`);
        else this.contest.setFrame(`dance/contest${locale.frame}_0002`);

        this.contesthitbox.off('over');
        this.contesthitbox.off('out');

        this.contesthitbox.on('over', () => {
            this.contest.setFrame(`dance/contest${locale.frame}_0002`);
            this.pencilWrite.play('dance-pencilwrite-animation');
            this.interface.showLocalizedHint({ x: 1323, y: 231.75 }, 'dancing_hint');
        });
        this.contesthitbox.on('out', () => {
            this.contest.setFrame(`dance/contest${locale.frame}_0001`);
            this.pencilWrite.anims.stop();
            this.pencilWrite.setFrame('dance/pencilstill');
            this.interface.hideHint();
        });
    }

    unload(engine: Engine): void {
        this.game.locale.unregister(this.localize);
        engine.app.unloadAssetPack('dance-pack');
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
