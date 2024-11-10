
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CanvasTextBox extends Phaser.GameObjects.Text {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0, "", {});

        this.text = "CanvasTextBox";
        this.setStyle({ "fontSize": "20px" });

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */

        // custom definition props
        this.boxWidth = 0;
        this.boxHeight = 0;
        this.horizontalAlign = 0;
        this.verticalAlign = 0;
    }

    /* START-USER-CODE */

    private __boxWidth: number;
    private __boxHeight: number;
    private __horizontalAlign: number;
    private __verticalAlign: number;

    private __baseX: number;
    private __baseY: number;

    setText(value: string | string[]): this {
        value = Array.isArray(value) ? value.join('\n') : value;

        super.setText(value);

        return this.repositionText();
    }

    setPosition(x?: number, y?: number): this {
        super.setPosition(x, y);

        this.__baseX = x;
        this.__baseY = y;

        return this.repositionText();
    }

    setX(value?: number): this {
        super.setX(value);

        this.__baseX = value;

        return this.repositionText();
    }

    setY(value?: number): this {
        super.setY(value);

        this.__baseY = value;

        return this.repositionText();
    }

    get boxX(): number {
        return this.__baseX;
    }

    set boxX(value: number) {
        this.setX(value);
    }

    get boxY(): number {
        return this.__baseX;
    }

    set boxY(value: number) {
        this.setY(value);
    }

    setBoxWidth(val: number): this {
        this.__boxWidth = val;

        return this.repositionText();
    }

    get boxWidth(): number {
        return this.__boxWidth;
    }

    set boxWidth(val: number) {
        this.setBoxWidth(val);
    }

    setBoxHeight(val: number): this {
        this.__boxHeight = val;

        return this.repositionText();
    }

    get boxHeight(): number {
        return this.__boxHeight;
    }

    set boxHeight(val: number) {
        this.setBoxHeight(val);
    }

    setAlign(align?: string): this {
        super.setAlign(align);

        this.__horizontalAlign = align == 'center' ? 1 : align == 'right' ? 2 : 0;

        return this.repositionText();
    }

    get horizontalAlign(): number {
        return this.__horizontalAlign;
    }

    set horizontalAlign(val: number) {
        this.setAlign(val == 1 ? 'center' : val == 2 ? 'right' : 'left');

        this.repositionText();
    }

    setLeftHorizontalAlign(): this {
        this.horizontalAlign = 0;

        return this.repositionText();
    }

    setCenterHorizontalAlign(): this {
        this.horizontalAlign = 1;

        return this.repositionText();
    }

    setRightHorizontalAlign(): this {
        this.horizontalAlign = 2;

        return this.repositionText();
    }

    get verticalAlign(): number {
        return this.__verticalAlign;
    }

    set verticalAlign(val: number) {
        this.__verticalAlign = val;

        this.repositionText();
    }

    setLeftVerticalAlign(): this {
        this.verticalAlign = 0;

        return this.repositionText();
    }

    setCenterVerticalAlign(): this {
        this.verticalAlign = 1;

        return this.repositionText();
    }

    setRightVerticalAlign(): this {
        this.verticalAlign = 2;

        return this.repositionText();
    }

    repositionText(): this {
        var width = this.boxWidth || this.width,
            height = this.boxHeight || this.height,
            align = this.horizontalAlign,
            verticalAlign = this.verticalAlign;

        var baseX = this.__baseX === undefined ? this.x : this.__baseX,
            baseY = this.__baseY === undefined ? this.y : this.__baseY;

        var x: number, y: number;
        switch (align) {
            case 1: // middle align
                x = baseX + width / 2 - this.width / 2;
                break;
            case 2: // right align
                x = baseX + width - this.width;
                break;
            default:
                x = baseX;
        }

        switch (verticalAlign) {
            case 1: //middle align
                y = baseY + height / 2 - this.height / 2;
                break;
            case 2: // right align
                y = baseY + height - this.height;
                break;
            default:
                y = baseY;
        }

        super.setPosition(x, y);
        this.emit('textrepositioned');

        return this;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
