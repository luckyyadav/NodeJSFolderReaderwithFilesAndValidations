const fs = require('fs');
const readline = require('readline');
const path = require('path');
const HelperFxn = require("./helper")


// Define the folder path
const folderPath = './input';

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  console.log(folderPath)
  files.forEach(file => {
    // Create a readable stream for each file
    const filePath = path.join(folderPath, file);
    const readStream = fs.createReadStream(filePath);

    // Create a readline interface for the stream
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

    // Process each line of the file
    
    ReadEachFiles(rl,file);
   
  });
});

















function ReadEachFiles(rl, fileName){ 

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
      HelperFxn.additionalInfoValidation(additionalInfoSection, fileName)
      
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
      HelperFxn.desiredQuestionValidation(QuestionSection, fileName)
      
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