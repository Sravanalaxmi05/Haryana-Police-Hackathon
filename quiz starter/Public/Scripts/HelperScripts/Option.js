// -----JS CODE-----
// Option.js
// Version: 0.1.0
// Event: OnAwake
// Description: Define Option Button contains UI button and image
//@input Asset.Font textFont
/** @type {Font} */
var textFont = script.textFont;

//@input int textSize =20
/** @type {number} */
var textSize = script.textSize;

//@input vec3 textPositionOffset
/** @type {vec3} */
var textPositionOffset = script.textPositionOffset;

var so = script.getSceneObject();
var button = so.getChild(0);
const objHelpers = require("SceneObjectHelpersModule");

class Option {
    constructor(optionType, texture) {
        this.so = so;
        this.optionType = optionType;
        this.texture = texture;
        this.uiButton = button.getFirstComponent("Component.ScriptComponent");
        this.text = "";
        this.buttonText = this.uiButton.getTextComponent();
        this.buttonTextSceneObject  = this.buttonText.getSceneObject();
        this.buttonTextScreenTransform =  this.buttonTextSceneObject.getComponent("Component.ScreenTransform");
        this.buttonBackground = button.getChild(0);
        this.foregroundImage = objHelpers.getComponentsRecursive(so,"Component.Image")[1];
        this.pressUpFunction = null;
        this.position = this.buttonTextScreenTransform.position;
        this.hide();
    }

    setTextVisual() {
        if (this.optionType!==global.OptionType.IMAGE) {
            if (this.buttonText) {
                this.buttonText.text = this.text;
                this.buttonText.size = textSize;
                if (textFont) {
                    this.buttonText.font =textFont;
                }               
                this.buttonTextScreenTransform.position = this.position.add(textPositionOffset);
            }
        } else {
            this.buttonText.text = "";
        }
    }
    setPressUpFunction(func) {
        this.pressUpFunction = func;
        this.uiButton.onPressUp.add(func);
    }
    removePressUpFunction(func) {
        this.pressUpFunction = null;
        this.uiButton.onPressUp.remove(func);
    }

    setText(text) {
        this.text = text;
    }
    setTexture(tex) {
        this.texture = tex;
        this.setImageTexture(this.texture);
    }

    setImageTexture(tex) {
        this.foregroundImage.mainPass.baseTex = tex;
        this.uiButton.normalTexture = tex;
        this.uiButton.pressedTexture = tex;
        this.uiButton.disabledTexture = tex;
    }
    
    hide() {
        for (let index = 0; index < this.so.getChildrenCount(); index++) {
            this.so.getChild(index).enabled = false; 
        }
    }

    show() {
        this.setTextVisual();
        if (this.optionType!==global.OptionType.TEXT && this.texture) {            
            this.setImageTexture(this.texture);
        } else {
            this.foregroundImage.enabled = false;
        }

        for (let index = 0; index < this.so.getChildrenCount(); index++) {
            this.so.getChild(index).enabled = true; 
        }
    }

    destroy() {
        this.so.destroy();
    }
}
   

script.newOption = function newOption(optionType, texture) {
    return new Option(optionType, texture);
};


