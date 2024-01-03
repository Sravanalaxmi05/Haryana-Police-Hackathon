// -----JS CODE-----
// QuizData.js
// Version: 0.1.0
// Event: OnAwake
// Description: Quiz Game Data

/*
@typedef QuestionType1
@property {string[]} options
@property {string} answer
@property {string[]} category 
*/

/*
@typedef QuestionType2
@property {Asset.Texture[]} images
@property {string} answer
@property {string[]} category
*/

/*
@typedef QuestionType3
@property {string[]} options
@property {Asset.Texture[]} images
@property {string} answer
@property {string[]} category
*/

/*
@typedef QuestionType4
@property {string} question
@property {string} answer
@property {string[]} category
*/

/*
@typedef QuestionType5
@property {string} question
@property {string[]} options
@property {string} answer
@property {string[]} category
*/

/*
@typedef QuestionType6
@property {string} question
@property {Asset.Texture[]} images
@property {string} answer
@property {string[]} category
*/

/*
@typedef QuestionType7
@property {string} question
@property {string[]} options
@property {Asset.Texture[]} images
@property {string} answer
@property {string[]} category
*/

//@input string quesitonType = "SINGLE_QUESTION" {"widget":"combobox", "values":[{"label":"Single Question", "value":"SINGLE_QUESTION"}, {"label":"True Or False", "value":"TRUE_OR_FALSE"}, {"label":"Multiple Options", "value":"MULTIPLE_OPTIONS"}, {"label":"JSON", "value":"JSON"}]}
/** @type {string} */
var quesitonType = script.quesitonType;

//@ui {"widget":"separator"}

//@ui {"showIf": "quesitonType", "showIfValue": "SINGLE_QUESTION", "label": "Single Question", "widget": "group_start"}
//@input string singleQuestion
/** @type {string} */
var singleQuestion = script.singleQuestion;
//@input string optionType1 = "TEXT" {"label":"Option Type","widget":"combobox", "values":[{"label":"Text", "value":"TEXT"}, {"label":"Image", "value":"IMAGE"}, {"label":"Image & Text", "value":"IMAGE_TEXT"}]}
/** @type {string} */
var optionType1 = script.optionType1;
//@ui {"widget":"separator"}
// @input QuestionType1[] questions1 {"label": "Question", "showIf":"optionType1", "showIfValue":"TEXT"}
/** @type {QuestionType1} */
var questions1 = script.questions1;
// @input QuestionType2[] questions2 {"label": "Question", "showIf":"optionType1", "showIfValue":"IMAGE"}
/** @type {QuestionType2} */
var questions2 = script.questions2;
// @input QuestionType3[] questions3 {"label": "Question", "showIf":"optionType1", "showIfValue":"IMAGE_TEXT"}
/** @type {QuestionType3} */
var questions3 = script.questions3;
//@ui {"showIf": "quesitonType", "showIfValue": "SINGLE_QUESTION",  "widget": "group_end"}

//@ui {"showIf": "quesitonType", "showIfValue": "TRUE_OR_FALSE", "label": "True Or False", "widget": "group_start"}
//@input string optionType2 = "TEXT" {"label":"Option Type", "widget":"combobox", "values":[{"label":"Text", "value":"TEXT"}, {"label":"Image", "value":"IMAGE"}, {"label":"Image & Text", "value":"IMAGE_TEXT"}]}
/** @type {string} */
var optionType2 = script.optionType2;
//@ui {"label": "Options", "showIf":"optionType2", "showIfValue":"TEXT", "widget": "group_start"}
//@input string trueOption1 {"label": "True Option"}
/** @type {string} */
var trueOption1 = script.trueOption1;
//@input string falseOption1 {"label": "False Option"}
/** @type {string} */
var falseOption1 = script.falseOption1;
//@ui {"showIf":"optionType2", "showIfValue":"TEXT",  "widget": "group_end"}

//@ui {"label": "Options", "showIf":"optionType2", "showIfValue":"IMAGE", "widget": "group_start"}
//@input Asset.Texture trueImageOption2 {"label": "True Option"}
/** @type {Texture} */
var trueImageOption2 = script.trueImageOption2;
//@input Asset.Texture falseImageOption2 {"label": "False Option"}
/** @type {Texture} */
var falseImageOption2 = script.falseImageOption2;
//@ui {"showIf":"optionType2", "showIfValue":"IMAGE",  "widget": "group_end"}

//@ui {"label": "Options", "showIf":"optionType2", "showIfValue":"IMAGE_TEXT", "widget": "group_start"}
//@input string trueOption3 {"label": "True Option"}
/** @type {string} */
var trueOption3 = script.trueOption3;
//@input Asset.Texture trueImageOption3 {"label": "True Option Image"}
/** @type {Texture} */
var trueImageOption3 = script.trueImageOption3;
//@ui {"widget":"separator"}
//@input string falseOption3 {"label": "False Option"}
/** @type {string} */
var falseOption3 = script.falseOption3;
//@input Asset.Texture falseImageOption3 {"label": "False Option Image"}
/** @type {Texture} */
var falseImageOption3 = script.falseImageOption3;
//@ui {"showIf":"optionType2", "showIfValue":"IMAGE_TEXT",  "widget": "group_end"}

//@ui {"widget":"separator"}
// @input QuestionType4[] questions4 {"label": "Question"}
/** @type {QuestionType4} */
var questions4 = script.questions4;
//@ui {"showIf": "quesitonType", "showIfValue": "TRUE_OR_FALSE",  "widget": "group_end"}

//@ui {"showIf": "quesitonType", "showIfValue": "MULTIPLE_OPTIONS", "label": "Mulptiple Options", "widget": "group_start"}
//@input string optionType3 = "TEXT" {"label":"Option Type", "widget":"combobox", "values":[{"label":"Text", "value":"TEXT"}, {"label":"Image", "value":"IMAGE"}, {"label":"Image & Text", "value":"IMAGE_TEXT"}]}
/** @type {string} */
var optionType3 = script.optionType3;
//@ui {"widget":"separator"}
// @input QuestionType5[] questions5 {"label": "Question", "showIf":"optionType3", "showIfValue":"TEXT"}
/** @type {QuestionType5} */
var questions5 = script.questions5;
// @input QuestionType6[] questions6 {"label": "Question", "showIf":"optionType3", "showIfValue":"IMAGE"}
/** @type {QuestionType6} */
var questions6 = script.questions6;
// @input QuestionType7[] questions7 {"label": "Question", "showIf":"optionType3", "showIfValue":"IMAGE_TEXT"}
/** @type {QuestionType7} */
var questions7 = script.questions7;

//@ui {"showIf": "quesitonType", "showIfValue": "MULTIPLE_OPTIONS",  "widget": "group_end"}

//@ui {"widget":"separator","showIf": "quesitonType", "showIfValue": "JSON"}
//@ui {"label": "Note: Only support text option!","showIf": "quesitonType", "showIfValue": "JSON"}

//@input string json {"showIf": "quesitonType", "showIfValue": "JSON", "label": "JSON"}
/** @type {string} */
var json = script.json;

//@ui {"widget":"separator"}
//@input bool categoryType 
/** @type {boolean} */

//@input string[] category {"label":"Category Order", "showIf": "categoryType"}
/** @type {string[]} */
var category = script.category;


global.QuizType = {
    SINGLEQUESTION: "SINGLE_QUESTION",
    TRUE_OR_FALSE: "TRUE_OR_FALSE",
    MULTIPLE_OPTIONS: "MULTIPLE_OPTIONS",
    JSON: "JSON"
};

global.OptionType = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",   
    IMAGE_TEXT: "IMAGE_TEXT"
};


class QuestionData {
    constructor(question, options, images, answer, score, category) {
        this.question = question;
        this.options = options;
        this.images = images;
        this.optionCount = this.getOptionCount();
        this.answer = answer;
        this.score = score;
        this.category = category;
    }
    getOptionCount() {
        var optionsLength = 0;
        var imagesLength = 0;
    
        if (this.options) {
            optionsLength = this.options.length;
        }
        if (this.images) {
            imagesLength = this.images.length;
        }
        return Math.max(optionsLength,imagesLength);
    }
    
    debugPrint() {
        print("Question: " + this.question);
        if (this.options) {
            this.options.forEach(optionElement => {
                print("Options: " + optionElement);
            });
        } else {
            print("Options: Empty"); 
        }
        if (this.images) {
            this.images.forEach(imageElement => {
                print("Images: " + imageElement.name);
            });  
        } else {
            print("Images: Empty"); 
        }
        print("Option Count: " + this.optionCount);
        print("Answer: " + this.answer);
        print("Score: " + this.score);
        print("Category: " + this.category);
    }
    
}

class Questions {
    constructor(questions, quizType, optionType) {
        this.questions = questions;
        this.quizType = quizType;
        this.optionType = optionType;
    }
    debugPrint() {
        print("Quiz Type: " + this.quizType);
        print("Option Type: " + this.optionType);
        this.questions.forEach(questionData => {
            questionData.debugPrint();
        });       
    }

    getMaxOptionCount() {
        return Math.max(...this.questions.map(el => el.optionCount));
    }

    getCategoryCount() {
        return Math.max(...this.questions.map(el => el.category.length));
    }

    getCategoryOrder() {
        return category;
    }

}

function initializeQuestions() {
    var results;
    switch (quesitonType) {
        case global.QuizType.SINGLEQUESTION:
            results = handleSingleQuestion();
            break;
        case global.QuizType.TRUE_OR_FALSE:
            results = handleTrueOrFalse();
            break;
        case global.QuizType.MULTIPLE_OPTIONS:
            results = handleMultipleOptions();
            break;
        case global.QuizType.JSON:
            // JSON questions
            try {
                results = autoFillData(JSON.parse(json), global.OptionType.TEXT);
            } catch (err) {
                print("Error: Question json is not a valid JSON string");
            }
            break;
        default:
            print("Error: Question is not a valid");
    }

    return results;
}

function autoFillData(data, optionType) {
    var result = [];
    data.forEach(element => {
        var quizData = new QuestionData(element.question, element.options, element.images, element.answer,element.score,element.category);
        result.push(quizData);
    });
    return new Questions(result, quesitonType, optionType);
}


function handleSingleQuestion() {
    var results;
    switch (optionType1) {
        case global.OptionType.TEXT:
            questions1.forEach(element => {
                element.question = singleQuestion;
            });
            results = autoFillData(questions1,global.OptionType.TEXT);
            break;
        case global.OptionType.IMAGE:
            questions2.forEach(element => {
                element.question = singleQuestion;
            });
            results = autoFillData(questions2,global.OptionType.IMAGE);
            break;
        case global.OptionType.IMAGE_TEXT:
            questions3.forEach(element => {
                element.question = singleQuestion;
            });
            results = autoFillData(questions3,global.OptionType.IMAGE_TEXT);
            break;
        default:
            print("Error: Option Type is not valid");
    }
    return results;
}

function handleTrueOrFalse() {
    var results;
    switch (optionType2) {
        case global.OptionType.TEXT:
            questions4.forEach(element => {
                element.options = [];
                element.options.push(trueOption1);
                element.options.push(falseOption1);
            });
            results = autoFillData(questions4,global.OptionType.TEXT);
            break;
        case global.OptionType.IMAGE:
            questions4.forEach(element => {             
                element.images = [];
                element.images.push(trueImageOption2);
                element.images.push(falseImageOption2);
            });
            results = autoFillData(questions4,global.OptionType.IMAGE);
            break;
        case global.OptionType.IMAGE_TEXT:
            questions4.forEach(element => {
                element.options = [];
                element.images = [];
                element.options.push(trueOption3);
                element.options.push(falseOption3);
                element.images.push(trueImageOption3);
                element.images.push(falseImageOption3);
            });
            results = autoFillData(questions4,global.OptionType.IMAGE_TEXT);
            break;
        default:
            print("Error: Option Type is not valid");
    }
    return results;
}

function handleMultipleOptions() {
    var results;
    switch (optionType3) {
        case global.OptionType.TEXT:
            results = autoFillData(questions5,global.OptionType.TEXT);
            break;
        case global.OptionType.IMAGE:
            results = autoFillData(questions6,global.OptionType.IMAGE);
            break;
        case global.OptionType.IMAGE_TEXT:
            results = autoFillData(questions7,global.OptionType.IMAGE_TEXT);
            break;
        default:
            print("Error: Option Type is not valid");
    }
    return results;
}

global.questions = initializeQuestions();