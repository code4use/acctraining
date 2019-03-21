var num1=0, num2=0, res=0, res_ok=0, res_bad=0, isRight=true;
var startDatetime, startmSecondsime, myTimerIns;

$(document).ready(function(){
    myTimerIns = setInterval(theTimer, 1000);
    allReset();    
});

function chkForm() {
    res=Number($("input[name=res]").val());
    isRight=(res==num1*num2);
    if (isRight) {
        res_ok+=1;
    }
    else {
        res_bad+=1;
    }
    newRound();
    return false;
}

function newRound() {
    $("input[name=res_ok]").val(String(res_ok));
    $("input[name=res_bad]").val(String(res_bad));
    if (isRight) {
        $("input[name=hint]").val("");
        num1=Math.floor(Math.random()*10);
        if (num1<2) num1=9-num1;
        num2=Math.floor(Math.random()*10);
        if(num2<2) num2=9-num2;
    }
    else {
        $("input[name=hint]").val(String(num1*num2));
    }
    $("input[name=num1]").val(String(num1));
    $("input[name=num2]").val(String(num2));
    $("input[name=res]").val("");
    $("input[name=res]").focus();
}

function theTimer() {
    let curDatetime = new Date();
    let curmSeconds = curDatetime.getTime();
    let seconds = Math.floor((curmSeconds-startmSeconds)/1000);
    let minutes = Math.floor(seconds / 60); 
    seconds %= 60;
    $("input[name=timer]").val(String(minutes)+":"+String(seconds));
}

function allReset() {
    num1=0, num2=0, res=0, res_ok=0, res_bad=0, isRight=true;
    startDatetime = new Date();
    startmSeconds = startDatetime.getTime();    
    $("input[name=timer]").val("0:0");
    newRound();
    return false;
}