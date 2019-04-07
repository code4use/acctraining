var res_ok=0, res_bad=0;
var startDatetime, startmSecondsime, myTimerIns;
var allOperands = {firstOperand: 1, secondOperand: 1, trueResult: 1, assumedResult:1, theOperation:0, theOperationChar:""};

$(document).ready(function(){
    //Add number buttons listeners
    var thekeys=document.getElementsByClassName("number");
    for(var i=0;i<thekeys.length;i++) {
        thekeys[i].addEventListener('click',function(){
            let currentres=document.getElementById("res");
            currentres.value+=this.innerText;
        })
    }
    //Add operation mode buttons listeners
    var thekeys=document.getElementsByClassName("opermode");
    for(var i=0;i<thekeys.length;i++) {
        thekeys[i].addEventListener('click',function(){
            allOperands.theOperationChar=this.innerText;
            switch(allOperands.theOperationChar) {
                case "×":
                    allOperands.theOperation=0;
                break;
                case "÷":
                    allOperands.theOperation=1;
                break;
                case "+":
                    allOperands.theOperation=2;
                break;
                case "-":
                    allOperands.theOperation=3;
                break;
            }
            allReset();
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
    let intTmp1, intTmp2;
    switch (curOperands.theOperation) {
        case 3:
            //subtraction
            intTmp1 = Math.floor(Math.random()*100);
            intTmp2 = Math.floor(Math.random()*100);
            if(intTmp1>intTmp2) {
                curOperands.firstOperand = intTmp1;
                curOperands.secondOperand = intTmp2;
                curOperands.trueResult = intTmp1 - intTmp2;
            }
            else {
                curOperands.firstOperand = intTmp2;
                curOperands.secondOperand = intTmp1;
                curOperands.trueResult = intTmp2-intTmp1;
            }
        break;
        case 2:
            //addition
            intTmp1 = Math.floor(Math.random()*50);
            intTmp2 = Math.floor(Math.random()*50);
            curOperands.firstOperand = intTmp1;
            curOperands.secondOperand = intTmp2;
            curOperands.trueResult = intTmp1 + intTmp2;
        break;
        case 1:
            //division
            intTmp1 = Math.floor(Math.random()*10);
            intTmp2 = Math.floor(Math.random()*10);
            if( intTmp1 < 2 ) intTmp1 = 9-intTmp1;
            if( intTmp2 < 2 ) intTmp2 = 9-intTmp2;
            curOperands.firstOperand = intTmp1*intTmp2;
            curOperands.secondOperand = intTmp1;
            curOperands.trueResult = intTmp2;
        break;
        case 0:
            // multiplication
            intTmp1 = Math.floor(Math.random()*10);
            intTmp2 = Math.floor(Math.random()*10);
            if( intTmp1 < 2 ) intTmp1 = 9-intTmp1;
            if( intTmp2 < 2 ) intTmp2 = 9-intTmp2;
            curOperands.firstOperand = intTmp1;
            curOperands.secondOperand = intTmp2;
            curOperands.trueResult = intTmp1 * intTmp2;
        break;                        
    }
}

function newRound() {
    if (allOperands.trueResult==allOperands.assumedResult) {
        newOperands(allOperands);
        $("input[name=num1]").val(String(allOperands.firstOperand));
        $("input[name=num2]").val(String(allOperands.secondOperand));
    }
    else {
        $("input[name=hint]").val(String(allOperands.trueResult));
    }
    $("input[name=res]").val("");
}

function allReset() {
    res_ok=0, res_bad=0;
    $("input[name=res_ok]").val(String(res_ok));
    $("input[name=res_bad]").val(String(res_bad));
    $("input[name=hint]").val("");
    switch(allOperands.theOperation) {
        case 3:
            $("#operchar").html('-');
        break;
        case 2:
            $("#operchar").html('+');
        break;
        case 1:
            $("#operchar").html('&div;');
            $("#modebutton").html('Умножение');
        break;
        case 0:
            $("#operchar").html('&times;');
            $("#modebutton").html('Деление');
        break;
    }

    allOperands.trueResult = 1;
    allOperands.assumedResult = allOperands.trueResult;
    startDatetime = new Date();
    startmSeconds = startDatetime.getTime();    
    $("input[name=timer]").val("0:0");
    newRound();
    $("input[name=res]").focus();
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
