// TriggerCollectionFinalEffect.js
// Version: 0.1.0
// Event: OnAwake
// Description: Custom made script to trigger Collection Final VFX Effects

//@input Component.ScriptComponent quizGameController
/** @type {ScriptComponent} */
var quizGameController = script.quizGameController;

//@input Asset.ObjectPrefab resultPrefab
/** @type {ObjectPrefab} */
var resultPrefab = script.resultPrefab;

//@input SceneObject parentObject
/** @type {SceneObject} */
var parentObject = script.parentObject;


script.triggerEffect = function() {
    quizGameController.getResults().forEach(element => {
        
        if (!element.image) {
            return;
        }
        var resultObject = resultPrefab.instantiate(parentObject);
        var scriptComponent = resultObject.getComponent("Component.ScriptComponent");
        if (scriptComponent && scriptComponent.triggerVFX) {
            resultObject.getComponent("Component.ScriptComponent").triggerVFX(element.image);
        }
        
    });
};

script.resetEffect =function() {
    for (let index = 0; index < parentObject.getChildrenCount(); index++) {
        const element = parentObject.getChild(index);
        element.destroy();
        index--;
    }
};
