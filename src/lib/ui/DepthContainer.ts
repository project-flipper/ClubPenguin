import Phaser from "phaser";

declare module 'phaser' {
    namespace GameObjects {
        interface Container {
            renderWebGL(renderer: Phaser.Renderer.WebGL.WebGLRenderer, container: Phaser.GameObjects.Container, camera: Phaser.Cameras.Scene2D.Camera, parentMatrix: Phaser.GameObjects.Components.TransformMatrix): void;
            renderCanvas(renderer: Phaser.Renderer.WebGL.WebGLRenderer, container: Phaser.GameObjects.Container, camera: Phaser.Cameras.Scene2D.Camera, parentMatrix: Phaser.GameObjects.Components.TransformMatrix): void;
        }
    }
}

export default class DepthContainer extends Phaser.GameObjects.Container {
    sortChildrenFlag: boolean;

    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y);

        this.displayList = new Phaser.GameObjects.DisplayList(scene);
        this.sortChildrenFlag = false;
        this.list = this.displayList.list;

        if (children) {
            this.add(children);
        }

        scene.sys.queueDepthSort();
    }

    /**
     * Force a sort of the display list on the next call to depthSort.
     */
    queueDepthSort() {
        this.sortChildrenFlag = true;
    }

    /**
     * Immediately sorts the display list if the flag is set.
     */
    depthSort() {
        if (this.sortChildrenFlag) {
            Phaser.Utils.Array.StableSort(this.list, this.sortByDepth);

            this.sortChildrenFlag = false;
        }
    }

    /**
     * Compare the depth of two Game Objects.
     * 
     * @param {Phaser.GameObjects.GameObject} childA - The first Game Object.
     * @param {Phaser.GameObjects.GameObject} childB - The second Game Object.
     *
     * @return {number} The difference between the depths of each Game Object.
     */
    sortByDepth(childA: any, childB: any): number {
        return childA._depth - childB._depth;
    }

    renderWebGL(renderer: Phaser.Renderer.WebGL.WebGLRenderer, container: DepthContainer, camera: Phaser.Cameras.Scene2D.Camera, parentMatrix: Phaser.GameObjects.Components.TransformMatrix): void {
        if (container.list.length != 0) {
            this.depthSort();
        }
        super.renderWebGL(renderer, container, camera, parentMatrix);
    }

    renderCanvas(renderer: Phaser.Renderer.WebGL.WebGLRenderer, container: DepthContainer, camera: Phaser.Cameras.Scene2D.Camera, parentMatrix: Phaser.GameObjects.Components.TransformMatrix): void {
        var children = container.list;
        var childCount = children.length;

        if (childCount === 0) {
            return;
        }

        var transformMatrix = container.localTransform;

        if (parentMatrix) {
            transformMatrix.loadIdentity();
            transformMatrix.multiply(parentMatrix);
            transformMatrix.translate(container.x, container.y);
            transformMatrix.rotate(container.rotation);
            transformMatrix.scale(container.scaleX, container.scaleY);
        } else {
            transformMatrix.applyITRS(container.x, container.y, container.rotation, container.scaleX, container.scaleY);
        }

        container.depthSort();

        renderer.pipelines.preBatch(container);

        var containerHasBlendMode = (container.blendMode !== -1);

        if (!containerHasBlendMode) {
            //  If Container is SKIP_TEST then set blend mode to be Normal
            renderer.setBlendMode(0);
        }

        var alpha = container.alpha;

        var scrollFactorX = container.scrollFactorX;
        var scrollFactorY = container.scrollFactorY;

        for (var i = 0; i < childCount; i++) {
            var child = children[i] as any;

            if (!child.willRender(camera)) {
                continue;
            }

            var childAlphaTopLeft;
            var childAlphaTopRight;
            var childAlphaBottomLeft;
            var childAlphaBottomRight;

            if (child.alphaTopLeft !== undefined) {
                childAlphaTopLeft = child.alphaTopLeft;
                childAlphaTopRight = child.alphaTopRight;
                childAlphaBottomLeft = child.alphaBottomLeft;
                childAlphaBottomRight = child.alphaBottomRight;
            } else {
                var childAlpha = child.alpha;

                childAlphaTopLeft = childAlpha;
                childAlphaTopRight = childAlpha;
                childAlphaBottomLeft = childAlpha;
                childAlphaBottomRight = childAlpha;
            }

            var childScrollFactorX = child.scrollFactorX;
            var childScrollFactorY = child.scrollFactorY;

            if (!containerHasBlendMode && child.blendMode !== renderer.currentBlendMode) {
                //  If Container doesn't have its own blend mode, then a child can have one
                renderer.setBlendMode(child.blendMode);
            }

            var mask = child.mask;

            if (mask) {
                mask.preRenderWebGL(renderer, child, camera);
            }

            var type = child.type;

            if (type !== renderer.currentType) {
                renderer.newType = true;
                renderer.currentType = type;
            }

            renderer.nextTypeMatch = (i < childCount - 1) ? (children[i + 1].type === renderer.currentType) : false;

            //  Set parent values
            child.setScrollFactor(childScrollFactorX * scrollFactorX, childScrollFactorY * scrollFactorY);

            child.setAlpha(childAlphaTopLeft * alpha, childAlphaTopRight * alpha, childAlphaBottomLeft * alpha, childAlphaBottomRight * alpha);

            //  Render
            child.renderWebGL(renderer, child, camera, transformMatrix, container);

            //  Restore original values

            child.setAlpha(childAlphaTopLeft, childAlphaTopRight, childAlphaBottomLeft, childAlphaBottomRight);

            child.setScrollFactor(childScrollFactorX, childScrollFactorY);

            if (mask) {
                mask.postRenderWebGL(renderer, camera);
            }

            renderer.newType = false;
        }

        renderer.pipelines.postBatch(container);
    }
}

