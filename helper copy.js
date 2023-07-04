function IsQuestion(str) {
  //const questionRegExp = /\?\s*$/;
  if (/^\s*([Ww]ho|[Ww]hat|[Ww]hen|[Ww]here|[Ww]hy|[Hh]ow|[Ii]s|[Aa]re|[Cc]an|[Mm]ay|[Ss]hould|[Dd]o)\b.*\?\s*$/.test(str)) {
    return true;
  }
  return false;
}

function IsLanguageContained(str) {
  if (/(java|python|TypeScript|JavaScript|perl|php|ruby)/gi.test(str)) {
    return true;
  }
  return false;
}

function IsNounContained(str) {
  if (/\b(i|[Ww]e|[Yy]our|[Mm]e)\b/g.test(str)) {
    return true;
  }
  return false;
}

/* function CheckLanguageAfterBactics(str){
  const regexForLanguage = /`{3}\s{1}(\S.+?)`{3}/gms;
  if(regexForLanguage.test(str)){
   return  true
  }
  return false;
} */
let DesiredAnswerText;
let DesiredQuestionText;

/* function checkEqualNumberOfBactics2(str) {
  //DesiredAnswerText = str.pop();
  const regexBacticsCount = /^(?:[^`]*`{3}[^`]*`{3})*[^`]*$/s;
  const regexForLanguage = /`{3}\s{1}(\S.+?)`{3}/gms;
  const match = regexForLanguage.exec(str);

  if (match) {
    console.log("\x1b[32m Matching only First occurence of language after bactics.\x1b[0m");
  } else {
    console.log("\x1b[31m First occurence not matched please check LANGUAGE after bactics followed by space.\x1b[0m");
  }

  if (regexBacticsCount.test(str)) {
    console.log("\x1b[32m String has equal number of opening and closing backticks.\x1b[0m");
  } else {
    console.log("\x1b[31m String does not have equal number of opening and closing backticks.\x1b[0m");
  }
  //regexToCheckLanguageInAnswer();
} */

// check if it has equal pair of bactics with 3 count each pair.
function checkEqualNumberOfBactics2(str) {
  const regexBacticsCount = /^(?:[^`]*`{3}[^`]*`{3})*[^`]*$/s;
  if (regexBacticsCount.test(str)) {
    return true;   
  } else {
    return false;
    
  }
}

// Check if Language is present after 3 bactics of first occurence.
function regexToCheckLanguageInAnswer(str) {
  const regexForLanguage = /`{3}\s{1}(\S.+?)`{3}/gms;
  const match = regexForLanguage.exec(str);

  if (match) {
    return true;
    
  } else {
    return false;
    
  }
}

/* Validation Area */

function desiredQuestionValidation(question) {
  console.log(" ");
  console.log("###############   desired Question Start ############");
  console.log(" ");
  DesiredQuestionText = question.pop();

  let containsQuestionPhrasewithQuesMark = false;
  const validQuestionLanguage = IsLanguageContained(DesiredQuestionText.trim());
  const ISNoun = IsNounContained(DesiredQuestionText.trim());

  let HasQuestionBactics = false;
  if (/\`/.test(DesiredQuestionText.trim())) {
    HasQuestionBactics = true;
    const IsEqualBactics = checkEqualNumberOfBactics2(DesiredQuestionText.trim());
    if (IsEqualBactics) {
      console.log("\x1b[32m Success: String has equal number of opening and closing backticks.\x1b[0m");
    } else {
      console.log("\x1b[31m Error: String does not have equal number of opening and closing backticks(pair of 3 bactics).\x1b[0m");
      return;
    }
  } else {
    console.log("\x1b[33m Warning: Question does not have mark code block.\x1b[0m");
  }

  if (!HasQuestionBactics) {
    containsQuestionPhrasewithQuesMark = IsQuestion(DesiredQuestionText.trim());
  } else {
    containsQuestionPhrasewithQuesMark = true;
  }

  if (!containsQuestionPhrasewithQuesMark) {
    console.log("\x1b[31m Error: Invalid Desired Question. Please Check Question phrases like what, when why... and please check question mark also(?)\x1b[0m");
    return;
  }

  if (!validQuestionLanguage) {
    console.log("\x1b[31m Error: Invalid Desired Question. Please Check Language missing.\x1b[0m");
    return;
  }
  if (ISNoun) {
    console.log("\x1b[31m Error: Invalid Desired Question. Please Check it contains nouns like I,we,you,your,user.\x1b[0m");
    return;
  }

  if (containsQuestionPhrasewithQuesMark && validQuestionLanguage && !ISNoun) {
    console.log("\x1b[32m Success: Valid Desired Question\x1b[0m");
    console.log("\x1b[32m Success: " + DesiredQuestionText + " \x1b[0m");
    return;
  } else {
    console.log("\x1b[31m Error: Invalid Desired Question. Please Check\x1b[0m");
  }
}
/* Desired Answer Validation Functions and methods
 */
function desiredAnswerValidation(answer) {
  let msgError = '';
  let msgSuccess = '';
  console.log(" ");
  console.log("###############   desired Answer Start ############");
  console.log(" ");
  DesiredAnswerText = answer.pop();
    // check Language in first Intro text.
    desiredAnswerLanguageCheckIntroValidation(DesiredAnswerText)  
  const validAnswerLanguage = IsLanguageContained(DesiredAnswerText.trim());
  const ISNoun = IsNounContained(DesiredAnswerText.trim());
  const IsEqualBactics = checkEqualNumberOfBactics2(DesiredAnswerText.trim());
  const IsEqualBacticsLanguage = regexToCheckLanguageInAnswer(DesiredAnswerText.trim());
  if (IsEqualBactics) {
    console.log("\x1b[32m Success: String has equal number of opening and closing backticks.\x1b[0m");
  } else {
    msgError = `String does not have equal number of opening and closing backticks(pair of 3 bactics).`
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
    
  }

  if(IsEqualBacticsLanguage){
    console.log("\x1b[32m Success: Matching only First occurence of language after bactics.\x1b[0m");
  }else{
    msgError = `First occurence not matched please check LANGUAGE after bactics followed by space.`;
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
     
  }

  if (!validAnswerLanguage) {
    msgError = 'Invalid Desired Answer. Please Check Language missing.';
    console.log("\x1b[31m Error: "+msgError+" \x1b[0m");
    
  }
  if (ISNoun) {
    msgError = `Invalid Desired Answer. Please Check it contains nouns like I,we,you,your,user.`;
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
    
  }

  if (validAnswerLanguage && !ISNoun) {    
    msgSuccess = 'Valid Desired Answer'
    console.log("\x1b[32m Success: "+msgSuccess+"\x1b[0m");
    
  } else {
    msgError = `Invalid Desired Answer. Please Check.`
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
  }
}

function desiredAnswerLanguageCheckIntroValidation(introAnswer){
  let msgError = '';
  let DesiredAnswerTextInto = introAnswer.split("```");
  if(DesiredAnswerTextInto[0] == '' || DesiredAnswerTextInto[0] == 0){
    msgError = 'Invalid Desired Answer. Please Check Intro text is missing.'
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
    
  }
  let IsLanguageContainedIntro = IsLanguageContained(DesiredAnswerTextInto[0]);
  if(!IsLanguageContainedIntro){
    msgError = 'Invalid Desired Answer. Please Check Language is missing in Intro content (First Paragraph).'
    console.log("\x1b[31m Error: "+msgError+"\x1b[0m");
  }
}

function desiredAnswerConclusionValidation(conslusionAnswer){
let DesiredAnswerTextConclusion = conslusionAnswer.pop();
let conclusionText = DesiredAnswerTextConclusion.split("```");
let concusionLength = conclusionText[conclusionText.length-1].length <= 130;
let isConclusionText = !!conclusionText[conclusionText.length-1];

  if(!isConclusionText || concusionLength){
   
      console.log("\x1b[31m Error: Invalid Desired Answer. Please Check conclusion text is missing or very less it must be more then 1 line. \x1b[0m");
    
  }

}

module.exports = { IsLanguageContained, desiredQuestionValidation, desiredAnswerValidation, desiredAnswerConclusionValidation};
