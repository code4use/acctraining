var res_ok=0, res_bad=0;
var startDatetime, startmSecondsime, myTimerIns;
var allOperands = {firstOperand: 1, secondOperand: 1, trueResult: 1, assumedResult:1, theOperation:0};

$(document).ready(function(){
    //Add buttons listeners
    var numberkeys=document.getElementsByClassName("number");
    for(var i=0;i<numberkeys.length;i++) {
        numberkeys[i].addEventListener('click',function(){
            let currentres=document.getElementById("res");
            console.log(currentres.value);
            currentres.value+=this.innerText;
            currentres.focus();
        })
    }
    //Initial reset
    allReset();
    //Start the timer
    myTimerIns = setInterval(theTimer, 1000);
});

function chkForm() {
    allOperands.assumedResult=Number($("input[name=res]").val());
    if (allOperands.trueResult==allOperands.assumedResult) {
        res_ok+=1;
        $("input[name=res_ok]").val(String(res_ok));
        $("input[name=hint]").val("");
    }
    else {
        res_bad+=1;
        $("input[name=res_bad]").val(String(res_bad));
    }
    newRound();
    return false;
}

function newOperands(curOperands) {
    let intTmp1 = Math.floor(Math.random()*10);
    let intTmp2 = Math.floor(Math.random()*10);
    if( intTmp1 < 2 ) intTmp1 = 9-intTmp1;
    if( intTmp2 < 2 ) intTmp2 = 9-intTmp2;
    switch (curOperands.theOperation) {
    case 1:
        //division
        curOperands.firstOperand = intTmp1*intTmp2;
        curOperands.secondOperand = intTmp1;
        curOperands.trueResult = intTmp2;
        break;
    case 0:
        // multiplication
        curOperands.firstOperand = intTmp1;
        curOperands.secondOperand = intTmp2;
        curOperands.trueResult = intTmp1 * intTmp2;
        break;                        
    }
}

function newRound() {
    if (allOperands.trueResult==allOperands.assumedResult) {
        newOperands(allOperands);
    }
    else {
        $("input[name=hint]").val(String(allOperands.trueResult));
    }
    $("input[name=num1]").val(String(allOperands.firstOperand));
    $("input[name=num2]").val(String(allOperands.secondOperand));
    $("input[name=res]").val("");
    $("input[name=res]").focus();
}

function allReset() {
    res_ok=0, res_bad=0;
    $("input[name=res_ok]").val(String(res_ok));
    $("input[name=res_bad]").val(String(res_bad));
    $("input[name=hint]").val("");
    if(allOperands.theOperation == 0) {
        $("#operchar").html('&#8729;');
        $("#modebutton").html('Деление');
    }
    else {
        $("#operchar").html('&#8758;');
        $("#modebutton").html('Умножение');
    }
    allOperands.trueResult = 1;
    allOperands.assumedResult = allOperands.trueResult;
    startDatetime = new Date();
    startmSeconds = startDatetime.getTime();    
    $("input[name=timer]").val("0:0");
    newRound();
    return false;
}

function theTimer() {
    let curDatetime = new Date();
    let curmSeconds = curDatetime.getTime();
    let seconds = Math.floor((curmSeconds-startmSeconds)/1000);
    let minutes = Math.floor(seconds / 60); 
    seconds %= 60;
    $("input[name=timer]").val(String(minutes)+":"+String(seconds));
}

function switchMode() {
    if(allOperands.theOperation == 0) 
        allOperands.theOperation = 1;
    else 
        allOperands.theOperation = 0;
    allReset();
    return false;
}