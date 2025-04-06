import $ from "jquery";

export class DisneyClubPenguin {
    static MARGIN: number = 6;
    static GAME_WIDTH: number = 1710;
    static GAME_HEIGHT: number = 1080;
    static GAME_ASPECT_RATIO: number = 1710 / 1080;
    static BUDDY_ICON_POSITION_X: number = 1293.75;
    static BUDDY_ICON_POSITION_Y: number = 1001.25;

    static getNotifyPosition(): { left: number; top: number } {
        const gameSection = $("#D_F_GameSection");
        const gameSectionWidth = gameSection.width()!;
        const gameSectionHeight = gameSection.height()!;
        let width = 0;
        let height = 0;

        if (gameSectionWidth / gameSectionHeight > this.GAME_ASPECT_RATIO) {
            height = (width = gameSectionHeight) * this.GAME_ASPECT_RATIO;
        } else {
            width = (height = gameSectionWidth) / this.GAME_ASPECT_RATIO;
        }

        const buddyIconPositionY = (width * this.BUDDY_ICON_POSITION_Y) / this.GAME_HEIGHT;
        const buddyIconPositionX = (height * this.BUDDY_ICON_POSITION_X) / this.GAME_WIDTH;

        const offset = gameSection.offset()!;
        return {
            left: offset.left + (gameSectionWidth - width) / 2 + buddyIconPositionX,
            top: offset.top + (gameSectionHeight - height) / 2 + buddyIconPositionY
        };
    }
}
