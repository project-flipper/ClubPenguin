import Phaser from "phaser";
import type { Locale } from "../../app/locale";
import type Startscreen from "../Startscreen";
import type { App } from "../../app/app";
import BRBBillboard from "./BRBBillboard";

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
