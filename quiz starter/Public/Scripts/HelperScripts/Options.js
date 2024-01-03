// -----JS CODE-----
// Options.js
// Version: 0.1.0
// Event: OnAwake
// Description: helper functions for quiz options
const objHelpers = require("SceneObjectHelpersModule");
const minX = -1000;
const maxX = 1000;

class Options {
    constructor(options,parent,optionType,onPressUpfunctions,optionPrefab) {
        this.options = options;
        this.parent = parent;
        this.optionType = optionType;
        this.onPressUpfunctions = onPressUpfunctions;
        this.optionPrefab = optionPrefab;
    }

    addNewOption() {  
        var optionObject = this.optionPrefab.instantiate(this.parent);
        var co = this.getValidOptionComponent(optionObject);
        if (co.newOption) {
            var option = co.newOption(this.optionType,null);  
            this.options.push(option);
        }
    
    }

    removeOption(index) {
        var option = this.options[index];
        option.destroy();
        option = null;
        this.options.pop(); 
    }

    syncOptionCount(value, currentCount) {
        if (currentCount < value) {
            for (var addIndex = currentCount; addIndex < value; addIndex++) {
                this.addNewOption();
            }
        } else {
            for (var removeIndex = currentCount-1; removeIndex > value-1; removeIndex--) {
                this.removeOption(removeIndex);
            }    
        }
    }

    setUpOption(questionData, optionType) {
        for (var index = 0; index < this.options.length; index++) {
            if (optionType!==global.OptionType.IMAGE) {
                this.options[index].setText(questionData.options[index]);
            }
            if (optionType!==global.OptionType.TEXT) {
                this.options[index].setTexture(questionData.images[index]); 
            } 
            if (this.options[index].pressUpFunction!==null) {
                this.options[index].removePressUpFunction(this.onPressUpfunctions[index]); 
            } 
            this.options[index].setPressUpFunction(this.onPressUpfunctions[index]); 
        }
    }

    getValidOptionComponent(so) {
        
        if (objHelpers.getComponentsRecursive(so,"ScriptComponent").filter(sc => sc.newOption!==undefined).length>0) {
            return objHelpers.getComponentsRecursive(so,"ScriptComponent").filter(sc => sc.newOption!==undefined)[0];
        } else {
            return null;
        }
    }

    showAllOptions() {
        for (var index = 0; index < this.options.length; index++) {       
            this.options[index].show();
        }
    }

    hideAllOptions() {
        for (var index = 0; index < this.options.length; index++) {       
            this.options[index].hide();
        }       
    }

    hideAllOptionsExceptIndex(value) {
        for (var index = 0; index < this.options.length; index++) {  
            if (value!==index) {
                this.options[index].hide();
            }          
        }       
    }

    getLeftOption() {
       
        var min = maxX;
        var minIndex = 0;
        for (var index = 0; index < this.options.length; index++) {   
            var screenTransform = this.options[index].so.getComponent("Component.ScreenTransform");
            if (screenTransform) {
                var x = screenTransform.position.x;
                if (min>x) {
                    min =x;
                    minIndex = index;
                }
            }

        }  

        return this.options[minIndex];
    }
   
    getRightOption() {
        var max = minX;
        var maxIndex = 0;
        for (var index = 0; index < this.options.length; index++) {  
            var screenTransform = this.options[index].so.getComponent("Component.ScreenTransform");         
            if (screenTransform) { 
                var x = screenTransform.position.x;
                if (x>max) {
                    max = x;
                    maxIndex = index;
                }
            }
        } 
        return this.options[maxIndex];
    }

}


global.newOptions = function newOptions(options, parent,optionType,onPressUpfunctions,optionPrefab) {
    return new Options(options, parent,optionType,onPressUpfunctions,optionPrefab);
};