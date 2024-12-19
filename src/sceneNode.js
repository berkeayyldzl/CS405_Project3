/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

//Berke Ayyildizli 31018 - 18.12.24

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
         /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        const currentModelMatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());//this retrieves the transform. matrix
        const currentModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());//contains the model and camera view trans. on its own
        const currentMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());//model-wiev-projection matrix
        const currentNormalMatrix = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());//to transform normal vectors
    
        
        if (this.meshDrawer) {
            this.meshDrawer.draw(currentMvp, currentModelView, currentNormalMatrix, currentModelMatrix);
        }
    
        for (let child of this.children) { //this is for drawing all the children of a node in a recursive way
            child.draw(currentMvp, currentModelView, currentNormalMatrix, currentModelMatrix);
        }
    }
    

    

}