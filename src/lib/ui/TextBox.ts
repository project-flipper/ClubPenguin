/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TextBox extends Phaser.GameObjects.BitmapText {

    constructor(scene: Phaser.Scene, x?: number, y?: number, font?: string) {
        super(scene, x ?? 0, y ?? 0, font ?? "BurbankSmallBold");

        this.text = "TextBox";
        this.fontSize = -72;

        /* START-USER-CTR-CODE */

        this.__baseX = this.x;
        this.__baseY = this.y;

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
    private __verticalAlign: number;

    private __baseX: number;
    private __baseY: number;

    private _advancedWordWrap = true;
    public shouldSetMaxWidth = true;

    public splitRegExp = /(?:\r\n|\r|\n)/;

    get advancedWordWrap(): boolean {
        return this._advancedWordWrap;
    }

    set advancedWordWrap(value: boolean) {
        this._advancedWordWrap = value;
        if (value) {
            super.setText(this.wrapText(this.text));
            this.repositionText();
        }
    }

    setText(value: string | string[]): this {
        value = Array.isArray(value) ? value.join('\n') : value;

        if (this.shouldSetMaxWidth) this.maxWidth = this.boxWidth;
        super.setText(this.advancedWordWrap ? this.wrapText(value) : value);

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

        if (this.shouldSetMaxWidth) this.maxWidth = val;
        if (this.advancedWordWrap) super.setText(this.wrapText(this.text));

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

    get horizontalAlign(): number {
        return this.align;
    }

    set horizontalAlign(val: number) {
        this.align = val;

        this.repositionText();
    }

    setLeftHorizontalAlign(): this {
        this.setLeftAlign();

        return this.repositionText();
    }

    setCenterHorizontalAlign(): this {
        this.setCenterAlign();

        return this.repositionText();
    }

    setRightHorizontalAlign(): this {
        this.setRightAlign();

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
            align = this.align,
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

    measureText(text: string): {  width: number, height: number } {
        let textWidth = 0;
        let textHeight = 0;
        for (let char of text) {
            let charData = this.fontData.chars[char.charCodeAt(0)];
            let scalingFactor = (this.fontSize / this.fontData.size);
            textWidth += Math.abs(charData.width * scalingFactor);
            textHeight += Math.abs(charData.height * scalingFactor);
        }
        return { width: textWidth, height: textHeight };
    }

    wrapText(text: string): string {
        return text;
        let output = '';

        let lines = text.replace(/ +/gi, ' ').split(this.splitRegExp);

        let linesCount = lines.length;

        for (let i = 0; i < linesCount; i++) {
            let line = lines[i];
            let out = '';

            // Trim whitespace
            line = line.replace(/^ *|\s*$/gi, '');

            // If entire line is less than wordWrapWidth append the entire line and exit early
            let lineWidth = this.measureText(line).width;

            if (lineWidth < this.boxWidth) {
                output += line + '\n';
                continue;
            }

            // Otherwise, calculate new lines
            let currentLineWidth = this.boxWidth;

            // Split into words
            let words = line.split(' ');

            for (let j = 0; j < words.length; j++) {
                let word = words[j];
                let wordWithSpace = word + ' ';
                let wordWidth = this.measureText(wordWithSpace).width;

                if (wordWidth > currentLineWidth) {
                    // Break word
                    if (j == 0) {
                        // Shave off letters from word until it's small enough
                        let newWord = wordWithSpace;

                        while (newWord.length) {
                            newWord = newWord.slice(0, -1);
                            wordWidth = this.measureText(newWord).width;

                            if (wordWidth <= currentLineWidth) {
                                break;
                            }
                        }

                        // If wordWrapWidth is too small for even a single letter, shame user
                        // failure with a fatal error
                        if (!newWord.length) {
                            throw new Error('wordWrapWidth < a single character');
                        }

                        // Replace current word in array with remainder
                        let secondPart = word.substr(newWord.length);

                        words[j] = secondPart;

                        // Append first piece to output
                        out += newWord;
                    }

                    // If existing word length is 0, don't include it
                    let offset = (words[j].length) ? j : j + 1;

                    // Collapse rest of sentence and remove any trailing white space
                    let remainder = words.slice(offset).join(' ').replace(/[ \n]*$/gi, '');

                    // Prepend remainder to next line
                    lines.splice(i + 1, 0, remainder);

                    linesCount = lines.length;

                    break; // Processing on this line

                    // Append word with space to output
                } else {
                    out += wordWithSpace;
                    currentLineWidth -= wordWidth;
                }
            }

            // Append processed line to output
            output += out.replace(/[ \n]*$/gi, '') + '\n';
        }

        // Trim the end of the string
        output = output.replace(/[\s|\n]*$/gi, '');

        return output;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
