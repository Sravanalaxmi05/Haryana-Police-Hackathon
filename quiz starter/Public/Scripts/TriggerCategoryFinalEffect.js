// TriggerCollectionFinalEffect.js
// Version: 0.1.0
// Event: OnAwake
// Description: Custom made script to trigger Collection Final VFX Effects

//@input Component.ScriptComponent quizGameController
/** @type {ScriptComponent} */
var quizGameController = script.quizGameController;

//@input Component.ScriptComponent vFXTrigger {"label":"VFX Trigger"}
/** @type {ScriptComponent} */
var vFXTrigger = script.vFXTrigger;

//@ui {"widget":"separator"}

//@ui {"label":"Please add textures based on the Category Order"}
//@ui {"label":"from Quiz Data. "}
//@ui {"widget":"separator"}
//@input Asset.Texture[] categoryTexutures
/** @type {Texture[]} */
var categoryTexutures = script.categoryTexutures;

/** @type {Questions} */
var questionsData = global.questions;

/** @type {QuestionData[]} */
var questions = questionsData.questions; 

script.triggerEffect = function() {
    if (categoryTexutures.length!== questionsData.getCategoryCount()) {
        print("Error: Mismatch category textures count and category data count.");
        return;
    }
    var catgoryObj = [];

    questionsData.getCategoryOrder().forEach(element=>{
        catgoryObj.push({"category":element,"count": 0});
    });

    for (let index = 0; index < quizGameController.getResults().length; index++) {
        var element = quizGameController.getResults()[index].selection;
        if (element < questions[index].category.length) {
            var categoryString = questions[index].category[element];
            var category = catgoryObj.find(x => x.category === categoryString);
            category.count= category.count+1;
        }
    }

    var finalCategory = catgoryObj.reduce((max, category) => max.count > category.count ? max : category);
    var finalIndex = catgoryObj.indexOf(finalCategory);
    vFXTrigger.triggerVFX(categoryTexutures[finalIndex]);
};

