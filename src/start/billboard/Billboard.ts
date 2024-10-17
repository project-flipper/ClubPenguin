import { App } from "@clubpenguin/app/app";
import { Locale } from "@clubpenguin/app/locale";
import BRBBillboard from "@clubpenguin/start/billboard/BRBBillboard";
import Startscreen from "@clubpenguin/start/Startscreen";

export interface BaseBillboard extends Phaser.GameObjects.Container {
    localize(locale: Locale): void;

    unload(game: App): void;
}

export interface BaseBillboardCls {
    new(scene: Phaser.Scene, x?: number, y?: number): BaseBillboard;

    preload(load: Phaser.Loader.LoaderPlugin): void;
}

export default function getBillboard(start: Startscreen): BaseBillboardCls {
    return BRBBillboard;
}
