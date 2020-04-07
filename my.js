//Get element once only
var objKeysDiv = document.getElementById("idkeys"),
    objDisplay = document.getElementById("iddisplay")
    objResult = document.getElementById("idresult"),
    objGoodResults = document.getElementById("goodresults"),
    objBadResults = document.getElementById("badresults")
    objTimer = document.getElementById("timer");
    
const strMode = '+−×÷', strNumbers = '0123456789';

var res_ok = 0, res_bad = 0;
var startDatetime, startmSecondsime, myTimerIns,
    isRoundEnd=false;
var allOperands = { firstOperand: 1, secondOperand: 1,
        trueResult: 1, assumedResult: 1, theOperationChar: "×",
        strAssumedResult: '', strTrueResult: '', strExpression: ''};

//
function handleMode(strMode) {
    if ( strMode==allOperands.theOperationChar ) {
        return;        
    }
    allOperands.theOperationChar=strMode;
    allInit();
    newRound();    
}

function handleNumber(strNumber) {
    allOperands.strAssumedResult+=strNumber;
    objResult.value = allOperands.strAssumedResult;
    
    if (allOperands.strAssumedResult==allOperands.strTrueResult) {
        // Right result entered
        ++res_ok;
        isRoundEnd=true;
        objGoodResults.textContent = res_ok.toString();
    }
    else if (allOperands.strAssumedResult.length == allOperands.strTrueResult.length) {
        // Wrong result entered
        ++res_bad;
        isRoundEnd=true;
        objBadResults.textContent = res_bad.toString();
    }
    
}

function newRound() { 
    // Correct result. Both operands initiaziled with ''
    if (allOperands.strAssumedResult==allOperands.strTrueResult) { 
    newOperands(allOperands);
    objDisplay.textContent = allOperands.strExpression;
    objResult.value = allOperands.strAssumedResult;
    objResult.placeholder = '';
    } else  { // Mistake handle
    allOperands.strAssumedResult = '';
    objResult.value = '';
    objResult.placeholder = allOperands.strTrueResult;
    }
}

function newOperands(curOperands) {
    let intTmp1, intTmp2;
    switch (curOperands.theOperationChar) {
        case "−": //subtraction
            intTmp1 = Math.floor(Math.random() * 100);
            intTmp2 = Math.floor(Math.random() * 100);
            if (intTmp1 > intTmp2) {
                curOperands.firstOperand = intTmp1;
                curOperands.secondOperand = intTmp2;
                curOperands.trueResult = intTmp1 - intTmp2;
            }
            else {
                curOperands.firstOperand = intTmp2;
                curOperands.secondOperand = intTmp1;
                curOperands.trueResult = intTmp2 - intTmp1;
            }
            break;
        case "+": //addition
            intTmp1 = Math.floor(Math.random() * 40) + 9;
            intTmp2 = Math.floor(Math.random() * 40) + 9;
            curOperands.firstOperand = intTmp1;
            curOperands.secondOperand = intTmp2;
            curOperands.trueResult = intTmp1 + intTmp2;
            break;
        case "÷": //division
            intTmp1 = Math.floor(Math.random() * 10);
            intTmp2 = Math.floor(Math.random() * 10);
            if (intTmp1 < 2) intTmp1 = 9 - intTmp1;
            if (intTmp2 < 2) intTmp2 = 9 - intTmp2;
            curOperands.firstOperand = intTmp1 * intTmp2;
            curOperands.secondOperand = intTmp1;
            curOperands.trueResult = intTmp2;
            break;
        case "×": // multiplication
            intTmp1 = Math.floor(Math.random() * 10);
            intTmp2 = Math.floor(Math.random() * 10);
            if (intTmp1 < 2) intTmp1 = 9 - intTmp1;
            if (intTmp2 < 2) intTmp2 = 9 - intTmp2;
            curOperands.firstOperand = intTmp1;
            curOperands.secondOperand = intTmp2;
            curOperands.trueResult = intTmp1 * intTmp2;
            break;
    }
    curOperands.strTrueResult = curOperands.trueResult.toString();
    curOperands.strAssumedResult = '';
    curOperands.strExpression = allOperands.firstOperand.toString()
        + ' ' + allOperands.theOperationChar
        + ' ' + allOperands.secondOperand.toString()
        + ' = ';
}

function theTimer() {
    let curDatetime = new Date();
    let curmSeconds = curDatetime.getTime();
    let seconds = Math.floor((curmSeconds - startmSeconds) / 1000);
    let minutes = Math.floor(seconds / 60);
    objTimer.textContent=String(minutes) + ":" + String(seconds % 60);
    if ( isRoundEnd ) {
        isRoundEnd = false;
        newRound();
    }
}

function allInit(params) {
    startDatetime = new Date();
    startmSeconds = startDatetime.getTime();
    document.getElementById('timer').textContent='0:0';
    allOperands.strAssumedResult = '';
    allOperands.strTrueResult = '';
    document.getElementById('idresult').placeholder= '' ;
    res_ok = 0;
    objGoodResults.textContent = res_ok.toString();
    res_bad = 0;
    objBadResults.textContent = res_bad.toString();

}

// Entry point
objKeysDiv.addEventListener('click', e => {
    if ( e.target.tagName=='BUTTON') {
        let strInnerText = e.target.textContent;
        console.log(e.target);
        if ( strMode.includes(strInnerText) ) { // Operation button handle
            handleMode(strInnerText);
        } else if (strNumbers.includes(strInnerText)) { // Number button handle
            handleNumber(strInnerText);
        } else if (strInnerText==='Del'){
            allOperands.strAssumedResult = '';
            objResult.value = '';
        }
         else {(strInnerText==='C')
            allInit();
            newRound();
         }
    }
})

document.addEventListener('keydown', e => {
   
    if (strNumbers.includes(e.key)) { // Number key has been pressed
        handleNumber(e.key);
    }
    if ( strMode.includes(e.key) )  {
        handleNumber(e.key);
    }
    if (e.key=='Backspace' || e.key=='Delete') { // Backspace handler
        allOperands.strAssumedResult = '';
        objResult.value = '';
    }
})

allInit();
myTimerIns = setInterval(theTimer, 200);
newRound();