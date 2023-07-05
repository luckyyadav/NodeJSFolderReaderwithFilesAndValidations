const fs = require("fs");
const readline = require("readline");
const HelperFxn = require("./helper")
const fileStream = fs.createReadStream("./input/Typescript_OC9KBG959KH95A3K.txt");

function ReadEachFiles(){
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

 /* Category section */

 let additionalInfoReading = false;
 let additionalInfoBlock = "";
 let additionalInfoSection = [];
 
 // Desired additionalInfo Block
  rl.on("line", (line) => {
   if (line.includes("Additional Info Start")) {
     additionalInfoReading = true;
     return;
   }
 
   if (line.includes("Additional Info End")) {
     additionalInfoReading = false;
     HelperFxn.additionalInfoValidation(additionalInfoSection)
     
     rl.close();
     return;
   }
   if (additionalInfoReading) {
     if(line != ""){
       additionalInfoBlock+=line;
       additionalInfoSection.push(additionalInfoBlock); 
     }
   }
 
 });


/* Question Block */

let starQuestiontReading = false;
let QuestionBlock = "";
let QuestionSection = [];

// Desired Question Block
 rl.on("line", (line) => {
  if (line.includes("Desired Question Start")) {
    starQuestiontReading = true;
    return;
  }

  if (line.includes("Desired Question End")) {
    starQuestiontReading = false;
    HelperFxn.desiredQuestionValidation(QuestionSection)
    rl.close();
    return;
  }
  if (starQuestiontReading) {
    if(line != ""){
      QuestionBlock+=line;
      QuestionSection.push(QuestionBlock); 
    }
  }

});


// Desired Answer Start

let startAnswer = false;
let AnswerBlock = "";
let AnswerSections = [];
rl.on("line", (line) => {
  if (line.includes("Desired Answer Start")) {
   
    startAnswer = true;   
    return;
  }

  if (line.includes("Desired Answer End")) {
    startAnswer = false;
    HelperFxn.desiredAnswerValidation(AnswerSections)
    rl.close();
    return;
  }

  if (startAnswer) { 
    if (line != "") {
      AnswerBlock+=line;
      AnswerSections.push(AnswerBlock);  
    }
  }
  
});


// ################## Desired Answer First Paragraph Language Check ######################


/* 
let desiredAnswerLanguageCheckIntro = false;
let desiredAnswerLanguageCheckIntroBlock = "";
let desiredAnswerLanguageCheckIntroSections = [];
rl.on("line", (line) => {
  if (line.includes("Desired Answer Start")) {
    desiredAnswerLanguageCheckIntro = true;     
    return;
  }

  if (line.includes("``` ")) {
    desiredAnswerLanguageCheckIntro = false;
    HelperFxn.desiredAnswerLanguageCheckIntroValidation(desiredAnswerLanguageCheckIntroSections)
    rl.close();
    return;
  }

  if (desiredAnswerLanguageCheckIntro) { 
    if (line != "") {
    //  console.log("\x1b[31m Error: Invalid Desired Answer. Please Check concusion is missing. \x1b[0m");
      desiredAnswerLanguageCheckIntroBlock+=line;
      desiredAnswerLanguageCheckIntroSections.push(desiredAnswerLanguageCheckIntroBlock);  
    }
  }
  
});
 */


 


// ################## Desired Answer Conclusion ######################



let desiredAnswerSummary = false;
let desiredAnswerSummaryBlock = "";
let desiredAnswerSummarySections = [];
rl.on("line", (line) => {
  if (line.includes("``` ")) {
    desiredAnswerSummary = true;   
   
    return;
  }

  if (line.includes("Desired Answer End")) {
    desiredAnswerSummary = false;
    HelperFxn.desiredAnswerConclusionValidation(desiredAnswerSummarySections)
    rl.close();
    return;
  }

  if (desiredAnswerSummary) { 
    if (line != "") {
    //  console.log("\x1b[31m Error: Invalid Desired Answer. Please Check concusion is missing. \x1b[0m");
      desiredAnswerSummaryBlock+=line;
      desiredAnswerSummarySections.push(desiredAnswerSummaryBlock);  
    }
  }
  
});

}

ReadEachFiles();