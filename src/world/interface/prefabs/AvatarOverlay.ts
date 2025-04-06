
// You can write more code here

/* START OF COMPILED CODE */

import TextBox from "../../../lib/ui/TextBox";
import Balloon from "./Balloon";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AvatarOverlay extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // nickname
        const nickname = new TextBox(scene, -148.5, 25.425, "BurbankSmallMedium");
        nickname.setOrigin(0, 0);
        nickname.tintFill = true;
        nickname.tintTopLeft = 0;
        nickname.tintTopRight = 0;
        nickname.tintBottomLeft = 0;
        nickname.tintBottomRight = 0;
        nickname.text = "Nickname";
        nickname.fontSize = 27;
        nickname.align = 1;
        this.add(nickname);

        // balloon
        const balloon = new Balloon(scene, 0, 0);
        balloon.visible = false;
        this.add(balloon);

        // nickname (prefab fields)
        nickname.boxWidth = 303.75;
        nickname.boxHeight = 43.2;
        nickname.horizontalAlign = 1;
        nickname.verticalAlign = 1;

        this.nickname = nickname;
        this.balloon = balloon;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public nickname: TextBox;
    public balloon: Balloon;

    /* START-USER-CODE */

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
