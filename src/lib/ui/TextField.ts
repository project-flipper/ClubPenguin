export type InputType = 'text' | 'password' | 'email';

/* START OF COMPILED CODE */

import TextBox from "./TextBox";
/* START-USER-IMPORTS */
import { App } from "@clubpenguin/app/app";
/* END-USER-IMPORTS */

export default class TextField extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);

        // textBox
        const textBox = new TextBox(scene, 0, 0, "BurbankSmallMedium");
        textBox.tintTopLeft = 0;
        textBox.tintTopRight = 0;
        textBox.tintBottomLeft = 0;
        textBox.tintBottomRight = 0;
        textBox.text = "TextField";
        textBox.fontSize = -72;
        this.add(textBox);

        this.textBox = textBox;

        /* START-USER-CTR-CODE */

        this.textBox.advancedWordWrap = false;
        this.textBox.shouldSetMaxWidth = false;

        const graphic = scene.add.graphics({
            x: 0,
            y: 0
        });
        this.add(graphic);

        this.graphic = graphic;

        this.moveBelow<Phaser.GameObjects.GameObject>(graphic, textBox);

        const selection = scene.add.graphics({
            x: 0,
            y: 0
        });
        this.add(selection);

        this.selectionGraphic = selection;

        this.moveBelow<Phaser.GameObjects.GameObject>(textBox, selection);

        this.handleKeyUp = () => true;
        this.handleKeyDown = () => true;
        this.handleValueChange = () => { };

        let app = scene.game as App;
        let element = app.fixDomGO(scene.add.dom(0, 0, 'input', 'background: transparent; border: none; outline: none;'));
        element.addListener('keydown keyup input select focusin focusout');
        element.on('keyup', (event: KeyboardEvent) => {
            if (this.handleKeyUp(event)) {
                this.filter();
                this.render();
            }
            this.handleValueChange(this.value);
        });
        element.on('keydown', (event: KeyboardEvent) => {
            if (this.handleKeyDown(event)) {
                this.filter();
                this.render();
            }
            this.handleValueChange(this.value);
        });
        element.alpha = 0.01;
        element.setOrigin(0, 0);
        this.add(element);

        this.element = element;

        scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => this.html.blur());

        this.render();

        /* END-USER-CTR-CODE */

        // custom definition props
        this.inputType = "text";
        this.fieldWidth = 307;
        this.fieldHeight = 72;
        this.value = "";
        this.maxLength = 0;
        this.disabled = false;
        this.readOnly = false;
        this.horizontalAlign = 0;
        this.verticalAlign = 0;
        this.font = "BurbankSmallMedium";
        this.fontSize = -72;
        this.fontColor = "#000000";
        this.placeholder = "";
        this.selectionColor = "#000000";
        this.backgroundIsFilled = true;
        this.backgroundColor = "#ffffff";
        this.backgroundIsStroked = true;
        this.backgroundStrokeWidth = 0;
        this.backgroundStrokeColor = "#000000";
        this.leftMargin = 4.5;
        this.topMargin = 4.5;
        this.autocomplete = "off";
    }

    private textBox: TextBox;
    public passwordCharacter: string = "*";

    /* START-USER-CODE */

    public handleKeyUp: (event: KeyboardEvent) => boolean;
    public handleKeyDown: (event: KeyboardEvent) => boolean;
    public handleValueChange: (value: string) => void;

    public filterRegex: RegExp;

    filter(): void {
        if (this.filterRegex) this.html.value = this.html.value.replace(this.filterRegex, '');
    }

    private graphic: Phaser.GameObjects.Graphics;
    private selectionGraphic: Phaser.GameObjects.Graphics;
    private element: Phaser.GameObjects.DOMElement;

    private get html(): HTMLInputElement {
        return this.element.node as HTMLInputElement;
    }

    get readOnly(): boolean {
        return this.html.readOnly;
    }

    set readOnly(value: boolean) {
        this.html.readOnly = value;
        this.render();
    }

    private _disabled: boolean;
    private _locked: boolean;

    private _setDisabled(): void {
        this.html.disabled = this._disabled || this._locked;
    }

    get locked(): boolean {
        return this._locked;
    }

    set locked(value: boolean) {
        this._locked = value;
        this._setDisabled();
        this.element.setX(value ? -9999 : 0);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
        this._setDisabled();
        this.render();
    }

    get inputType(): InputType {
        return this.html.type as InputType;
    }

    set inputType(value: InputType) {
        this.html.type = value;
        this.render();
    }

    get autocomplete(): string {
        return this.html.autocomplete;
    }

    set autocomplete(value: string) {
        this.html.autocomplete = value as AutoFill;
    }

    get value(): string {
        return this.html.value;
    }

    set value(value: string) {
        this.html.value = value;
        this.render();
    }

    get maxLength(): number {
        return this.html.maxLength;
    }

    set maxLength(value: number) {
        this.html.maxLength = value;
        this.render();
    }

    get placeholder(): string {
        return this.html.placeholder;
    }

    set placeholder(value: string) {
        this.html.placeholder = value;
        this.render();
    }

    private _width: number;
    private _height: number;
    private _isFilled: boolean;
    private _isStroked: boolean;
    private _backgroundColor: number;
    private _backgroundStrokeWidth: number;
    private _backgroundStrokeColor: number;

    get horizontalAlign(): number {
        return this.textBox.horizontalAlign;
    }

    set horizontalAlign(value: number) {
        this.textBox.horizontalAlign = value;
    }

    get verticalAlign(): number {
        return this.textBox.verticalAlign;
    }

    set verticalAlign(value: number) {
        this.textBox.verticalAlign = value;
    }

    public selectionColor: string;
    public selectionInvertsText: boolean;

    get fieldWidth(): number {
        return this._width;
    }

    set fieldWidth(value: number) {
        this._width = value;
        this.textBox.boxWidth = value - this.leftMargin * 2;
        this.html.style['width'] = `${value}px`;
    }

    get fieldHeight(): number {
        return this._height;
    }

    set fieldHeight(value: number) {
        this._height = value;
        this.textBox.boxHeight = value - this.topMargin * 2;
        this.html.style['height'] = `${value}px`;
    }

    get leftMargin(): number {
        return this.textBox.x;
    }

    set leftMargin(value: number) {
        this.textBox.boxX = value;
        this.textBox.boxWidth = this._width - value * 2;
    }

    get topMargin(): number {
        return this.textBox.boxY;
    }

    set topMargin(value: number) {
        this.textBox.boxY = value;
        this.textBox.boxHeight = this._height - value * 2;
    }

    get font(): string {
        return this.textBox.font;
    }

    set font(value: string) {
        this.textBox.setFont(value);
    }

    get fontSize(): number {
        return this.textBox.fontSize;
    }

    set fontSize(value: number) {
        this.textBox.setFontSize(value);
    }

    get fontColor(): number {
        return this.textBox.tintTopLeft;
    }

    set fontColor(value: string | number) {
        this.textBox.setTintFill(typeof value == 'string' ? parseInt(value.substring(1), 16) : value);
    }

    get backgroundIsFilled(): boolean {
        return this._isFilled;
    }

    set backgroundIsFilled(value: boolean) {
        this._isFilled = value;
    }

    get backgroundColor(): number {
        return this._backgroundColor;
    }

    set backgroundColor(value: string | number) {
        this._backgroundColor = typeof value == 'string' ? parseInt(value.substring(1), 16) : value;
    }

    get backgroundIsStroked(): boolean {
        return this._isStroked;
    }

    set backgroundIsStroked(value: boolean) {
        this._isStroked = value;
    }

    get backgroundStrokeWidth(): number {
        return this._backgroundStrokeWidth;
    }

    set backgroundStrokeWidth(value: number) {
        this._backgroundStrokeWidth = value;
    }

    get backgroundStrokeColor(): number {
        return this._backgroundStrokeColor;
    }

    set backgroundStrokeColor(value: string | number) {
        this._backgroundStrokeColor = typeof value == 'string' ? parseInt(value.substring(1), 16) : value;
    }

    draw(): void {
        let graphics = this.graphic;
        graphics.clear();
        graphics.lineStyle(this._backgroundStrokeWidth, this._backgroundStrokeColor);
        graphics.fillStyle(this._backgroundColor);
        if (this._isFilled) graphics.fillRect(0, 0, this._width, this._height);
        if (this._isStroked) graphics.strokeRect(0, 0, this._width, this._height);
    }

    render(): void {
        let value = this.inputType == 'password' ? this.passwordCharacter.repeat(this.html.value.length) : this.html.value;
        value = this.placeholder && !value ? this.placeholder : value;
        value = value.length > this.maxLength ? value.slice(value.length - this.maxLength) : value;
        this.textBox.text = value;
    }

    setup(): void {
        this.draw();
        this.render();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
