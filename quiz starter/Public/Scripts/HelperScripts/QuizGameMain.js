// -----JS CODE-----
// QuizGameMain.js
// Version: 0.1.0
// Event: OnAwake
// Description: Quiz Game Controller

//@input float questionInterval = 1
/** @type {number} */
var questionInterval = script.questionInterval;

//@ui {"widget":"separator"}

//@ui {"widget":"group_start", "label":"Screen: Question" }

//@input SceneObject quizScreen
/** @type {SceneObject} */
var quizScreen = script.quizScreen;

//@input Component.Text questionText
/** @type {Text} */
var questionText = script.questionText;

//@ui {"widget":"separator"}

//@input string optionInput {"widget":"combobox", "values":[{"label":"Horizontal", "value":"Horizontal"}, {"label":"Vertical", "value":"Vertical"}, {"label":"Custom Layout", "value":"Custom"}]}
/** @type {string} */
var optionInput = script.optionInput;
//@input SceneObject optionParentHorizontal {"showIf":"optionInput", "showIfValue":"Horizontal"}
//@input SceneObject optionParentVertical {"showIf":"optionInput", "showIfValue":"Vertical"}
//@input SceneObject optionParentCustom {"showIf":"optionInput", "showIfValue":"Custom"}

//@input Asset.ObjectPrefab optionPrefabHorizontal {"showIf":"optionInput", "showIfValue":"Horizontal"}
//@input Asset.ObjectPrefab optionPrefabVertical {"showIf":"optionInput", "showIfValue":"Vertical"}
/** @type {ObjectPrefab} */ 
var optionPrefab = optionInput=== "Horizontal"? script.optionPrefabHorizontal : script.optionPrefabVertical;
//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}

//@ui {"widget":"group_start", "label":"Screen: Score" }
//@input SceneObject resultScreen
/** @type {SceneObject} */
var resultScreen = script.resultScreen;

//@input string resultType {"widget":"combobox", "values":[{"label":"Score", "value":"SCORE"}, {"label":"Category", "value":"CATEGORY"}, {"label":"Collection", "value":"COLLECTION"}]}
/** @type {string} */
var resultType = script.resultType;

//@input Component.Text scoreText {"showIf":"resultType", "showIfValue":"SCORE"}
/** @type {Text} */
var scoreText = script.scoreText;

//@input string correctString = "Correct" {"showIf":"resultType", "showIfValue":"SCORE"}
/** @type {string} */
var correctString = script.correctString;

//@input string wrongString = "Wrong" {"showIf":"resultType", "showIfValue":"SCORE"}
/** @type {string} */
var wrongString = script.wrongString;

//@ui {"widget":"separator"}

//@ui {"widget":"group_start", "label":"Effects","showIf":"resultType", "showIfValue":"SCORE" }

//@input SceneObject[] correctEffects
/** @type {SceneObject[]} */
var correctEffects = script.correctEffects;

//@input SceneObject[] incorrectEffects
/** @type {SceneObject[]} */
var incorrectEffects = script.incorrectEffects;

//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Effects","showIf":"resultType", "showIfValue":"COLLECTION" }

//@input SceneObject[] collectionEffects
/** @type {SceneObject[]} */
var collectionEffects = script.collectionEffects;

//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Effects","showIf":"resultType", "showIfValue":"CATEGORY" }

//@input SceneObject[] categoryEffects
/** @type {SceneObject[]} */
var categoryEffects = script.categoryEffects;

//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}

//@input bool replay
/** @type {boolean} */
var replay = script.replay;

//@input SceneObject replayButton {"showIf":"replay"}
/** @type {SceneObject} */
var replayButton = script.replayButton;

//@ui {"widget":"group_end"}

global.touchSystem.touchBlocking = true;

global.QuizState = {
    START: "START",
    ANSWERING:"ANSWERING",
    ANSWERINGDONE:"ANSWERINGDONE",
    DONE: "DONE",   
};

global.ResultType = {
    SCORE: "SCORE",
    CATEGORY: "CATEGORY",   
    COLLECTION: "COLLECTION"
};

const objHelpers = require("./Module/SceneObjectHelpersModule");

// Screens
var screens = [
    quizScreen,
    resultScreen
];

/** @type {Questions} */
var questionsData = global.questions;

/** @type {QuestionData[]} */
var questions;

/** @type {global.OptionType} */
var questionsOptionType;

/** @type {QuestionData} */
var questionData;

//Options

/** @type {SceneObject} */
var optionParent;

/** @type {Function[]} */
var onPressUpfunctions;

/** @type {Option[]} */
var options;

// Reactive values
var activeScreen = makeReactiveValue(quizScreen);
var questionIndex = makeReactiveValue(0);
var question = makeReactiveValue("");
var hasAnswered = makeReactiveValue(false);
var quizState = makeReactiveValue(global.QuizState.START);
var results = makeReactiveValue([]);

/** @type {number} */
var score;

/** @type {number} */
var correctOptionIndex = 0;

/** @type {number} */
var selectedOptionIndex = 0;

/** @type {number} */
var buttonDelayTime = 0.2;

if (!questionsCheck() || !inputCheck()||!optionsCheck()) {
    return;
} else {
    addBindings();
}

script.getResults = function() {
    return results.get();
};

script.pressPlayAgain = function pressPlayAgain() {
    resetGame(); 
};

script.leftPress = function leftPress() {
    if (quizState.get()===global.QuizState.ANSWERING || quizState.get()===global.QuizState.DONE) {
        return;
    }
    options.getLeftOption().uiButton.pressDown();
    delay(function() {
        options.getLeftOption().uiButton.pressUp();
    },buttonDelayTime);  
};

script.rightPress = function rightPress() { 
    if (quizState.get()===global.QuizState.ANSWERING || quizState.get()===global.QuizState.DONE) {
        return;
    }
    options.getRightOption().uiButton.pressDown(); 
    delay(function() {
        options.getRightOption().uiButton.pressUp();
    },buttonDelayTime);   
};

script.onReset = function onReset() {
    if (quizState.get()===global.QuizState.DONE) {
        return;
    }    
};

// Input Checks
function optionsCheck() {
    optionParent = getOptionParent();
    onPressUpfunctions = initializePressUpFunctions();
    options = initializeOptions(); 
    return optionParent&&onPressUpfunctions&&options? true : false;
}

function questionsCheck() {
    if (!questionsData) {
        return false;
    }
    questions = questionsData.questions;
    questionsOptionType = questionsData.optionType;
    return true;
}

function inputCheck() {
    if (!quizScreen) {
        print("Erorr: Please attach Quiz Screen.");
        return false;
    }
    if (!questionText) {
        print("Erorr: Please attach Question Text");
        return false;
    }
    if (!optionInput) {
        print("Erorr: Please choose Option Input");
        return false;
    }

    if (optionInput==="Horizontal"&&!script.optionParentHorizontal) {
        print("Erorr: Please attach Option Parent Horizontal");
        return false;
    }
    if (optionInput==="Vertical"&&!script.optionParentVertical) {
        print("Erorr: Please attach Option Parent Vertical");
        return false;
    }

    if (!optionPrefab && !script.optionParentCustom) {
        print("Erorr: Please attach Option Prefab");
        return false;
    }
    if (!resultScreen) {
        print("Erorr: Please attach Result Screen");
        return false;
    }
    if (!resultType) {
        print("Erorr: Please choose Result Type");
        return false;
    }
    if (resultType===global.ResultType.SCORE && !scoreText) {
        print("Erorr: Please attach Score Text");
        return false;
    }
    if (replay && !replayButton) {
        print("Erorr: Please attach Replay Button");
        return false;
    }
    return true;
}

function addBindings() {
    //Score Bindings
    if (resultType === global.ResultType.SCORE) { 
        score = makeReactiveValue(0);
        score.on(function(value) {
            scoreText?scoreText.text = value + "/" + questions.length:null;
        });
    }

    // Question bindings
    question.on(function(value) {
        questionText.text = "" + value;
    });

    // Question bindings
    questionIndex.on(function(value) {

        if (value < 0) {
            return;
        }
        questionData = questions[value];
        question.set(questionData.question);
        options.syncOptionCount(questionData.optionCount,options.options.length);
        options.setUpOption(questionData,questionsOptionType);           
        hasAnswered.set(false);
        correctOptionIndex = parseInt(questions[questionIndex.get()].answer);
        options.showAllOptions();
    });

    // Screen bindings
    activeScreen.on(function(value) {
        setState(screens, value);
    }); 

    // Answer bindings
    hasAnswered.on(function(value) {  
        if (value) {
            if (quizState.get()!==global.QuizState.ANSWERING) {
                quizState.set(global.QuizState.ANSWERING);
                options.hideAllOptionsExceptIndex(selectedOptionIndex);
                resultHandler();
                // Progress to the next screen
                delay(function() {
                    var nextQuestionIndex = questionIndex.get() + 1;
                    // Has answered all questions?
                    if (nextQuestionIndex >= questions.length) {
                        
                        options.hideAllOptions();
                        // Show the result screen
                        activeScreen.set(resultScreen);
                        if (replay) {
                            delay(function showReplayButton() {
                                replayButton.enabled = true;
                            });
                        }                                
                        finalEffectHandler();
                        quizState.set(global.QuizState.DONE);
                    } else {
                        // Show the next question
                        questionIndex.set(nextQuestionIndex);
                        quizState.set(global.QuizState.ANSWERINGDONE);
                    }
                }, questionInterval);
            }
        } else {            
            resetQuestionScreen();
        }
    });
}



//Effect
function resultScoreEffect() {
    var wasCorrect = selectedOptionIndex === correctOptionIndex;
    if (wasCorrect) {
        question.set(correctString);
        enableSceneObjects(correctEffects,true);           
        score.set(score.get() + 1);
    } else {
        question.set(wrongString);
        enableSceneObjects(incorrectEffects,true);
    }
}

//Result
function resultHandler() {

    switch (questionsOptionType) {
        case global.OptionType.IMAGE:
            results.get().push({"image":questionData.images[selectedOptionIndex], "selection":selectedOptionIndex});
            break;
        case global.OptionType.TEXT:     
            results.get().push({"text":questionData.options[selectedOptionIndex], "selection":selectedOptionIndex });
            break;
        case global.OptionType.IMAGE_TEXT:
            results.get().push({"text":questionData.options[selectedOptionIndex],
                "image":questionData.images[selectedOptionIndex], "selection":selectedOptionIndex });
            break;
        default:
            print("Error: Questions Option Type is not valid.");
    }

    switch (resultType) {
        case global.ResultType.SCORE:
            resultScoreEffect();
            break;
        case global.ResultType.COLLECTION:
            break;
        case global.ResultType.CATEGORY:
            break;
        default:
            print("Error: Result Type is not valid");
    }
}

function finalEffectHandler() {
    switch (resultType) {
        case global.ResultType.SCORE:
            if (score.get() === questions.length) {
                enableSceneObjects(correctEffects,true);
                enableSceneObjects(incorrectEffects,false);
            } else {
                enableSceneObjects(correctEffects,false);
                enableSceneObjects(incorrectEffects,true);
            }
            break;
        case global.ResultType.COLLECTION:
            enableSceneObjects(collectionEffects,true);
            break;
        case global.ResultType.CATEGORY:
            enableSceneObjects(categoryEffects,true); 
            break;
        default:
            print("Error: Result Type is not valid");
    }
}

// Reset Game
function resetGame() {
    if (resultType===global.ResultType.SCORE) {
        score.set(0); 
    } 
    quizState.set(global.QuizState.START);
    results.set([]); 
    hasAnswered.set(false); 
    questionIndex.set(0); 
    activeScreen.set(quizScreen);
}

// Reset question screen state
function resetQuestionScreen() {
    switch (resultType) {
        case global.ResultType.SCORE:

            enableSceneObjects(correctEffects,false);
            enableSceneObjects(incorrectEffects,false);
            break;
        case global.ResultType.COLLECTION:
            enableSceneObjects(collectionEffects,false);   
            break;
        case global.ResultType.CATEGORY:
            enableSceneObjects(categoryEffects,false);          
            break;
        default:
            print("Error: Result Type is not valid");
    }  

}

function enableSceneObjects(arr, enabled) {
    arr.forEach(function(sceneObject) {
        if (sceneObject) {
            sceneObject.enabled = enabled;
        }             
    }); 
}

// Option functions
function initializePressUpFunctions() {
    var onPressUpfunctions =[];
    var maxOptionCount = questionsData.getMaxOptionCount();
    for (var index = 0; index < maxOptionCount; index++) {
        const element = function() {
            selectedOptionIndex = onPressUpfunctions.indexOf(element);
            hasAnswered.set(true);
        };
        onPressUpfunctions.push(element);
    }
    return onPressUpfunctions;
}

function getValidOptionCount(so) { 
    return objHelpers.getComponentsRecursive(so,"ScriptComponent").filter(sc => sc.newOption!==undefined).length;
}

function getValidOptionComponent(so) {
    if (objHelpers.getComponentsRecursive(so,"ScriptComponent").filter(sc => sc.newOption!==undefined).length>0) {
        return objHelpers.getComponentsRecursive(so,"ScriptComponent").filter(sc => sc.newOption!==undefined)[0];
    } else {
        return null;
    }
}

function getOptionParent() {
    switch (optionInput) {
        case "Horizontal":
            return script.optionParentHorizontal;
        case "Vertical":
            return script.optionParentVertical;  
        case "Custom":
            return script.optionParentCustom; 
        default:
            print("Error: invaild option input.");
    }
}

function initializeOptions() {
    var initialOptions = [];
    if (getValidOptionCount(optionParent)> 0) { 
        for (var index = 0  ;index < optionParent.getChildrenCount(); index++) { 
            if (getValidOptionComponent(optionParent.getChild(index))===null) {
                continue;
            } 
            var co = getValidOptionComponent(optionParent.getChild(index));
            var option = co.newOption(questionsOptionType,null);  
            initialOptions.push(option);              
        }
    }
    if (global.newOptions) {
        return global.newOptions(initialOptions,optionParent,questions.optionType,onPressUpfunctions,optionPrefab); 
    } else {
        print("Error: Please add Options Script");
        return null;
    }  
}


/**
* Have a function execute after the current event (UpdateEvent, LateUpdateEvent) but before the next event, or optionally for a duration
* @param {Function} fn Object to search
* @param {float} optionalDurationSeconds Component type name to search for
*/
function delay(fn, optionalDurationSeconds) {
    if (typeof optionalDurationSeconds === "undefined") {
        optionalDurationSeconds = 0;
    }
    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function() {
        script.removeEvent(delayedEvent);
        fn();
    });
    delayedEvent.reset(optionalDurationSeconds);
}

/**
|UI| Enables a specific scene object in an array of scene objects whilst disabling the rest. Handy for tutorials or other UI sequences where only one scene object is enabled at a time. See code comment for an example.
E.g.
   const welcomeState = script.welcomeSceneObject;
   const helpState = script.helpSceneObject;
   const states = [welcomeState, helpState];
   var currentState = setState(states, welcomeState);

   // later
   currentState = setState(helpState, helpState);

   // Or conditional
   if (currentState === welcomeState) {
       currentState = setState(helpState, helpState);
   }

   // To turn all off
   var currentState = setState(states, null);
*/
function setState(allStates, desiredState) {
    allStates.forEach(function(state) {
        state.enabled = state === desiredState;
    });
    return desiredState;
}


/**
* |UI| Make reactive value
*/
function makeReactiveValue(initialValue) {
    var value = initialValue;
    var fns = [];

    return {
        get: function() {
            return value;
        },
        set: function(v) {
            value = v;
            fns.forEach(function(fn) {
                fn(value); 
            });
        },
        on: function(fn) {
            if (typeof fn === "function") {
                fns.push(fn);
            }
            fn(value);
        },
        off: function(fn) {
            var index = fns.indexOf(fn);
            if (index !== -1) {
                fns.splice(index, 1);
            }
        }
    };
}
