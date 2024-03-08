
//calculator
const screen = document.getElementById("screen");
var solveClear = false;
var checkStatus = false;

function displayToScreen(input){
    if(solveClear == true){
        clearScreen();
        solveClear = false;
    }
    screen.value += input;
}

function calculate(){
    try{
    screen.value = eval(screen.value);
    }
    catch(error){
        screen.value = "Error";
    }
    solveClear = true;
}

function clearScreen(){
    screen.value = "";
}

function colorChange(){
    if(checkStatus == false){
    
    checkStatus = true;
        document.documentElement.style.setProperty('--backgroundColor', '#e11a8e');
    document.documentElement.style.setProperty('--screenColor', '#ed61b3');
    document.documentElement.style.setProperty('--bigScreenColor', '#737373');

    document.documentElement.style.setProperty('--buttonColor', '#ed61b3');
    document.documentElement.style.setProperty('--buttonFlashColor', '#ffccf2');
    document.documentElement.style.setProperty('--buttonHoverColor', '#ff80df');
    return;
    }
    if(checkStatus == true){
        
        checkStatus = false;
        document.documentElement.style.setProperty('--backgroundColor', '#6e6c6c');
        document.documentElement.style.setProperty('--screenColor', '#c1c0c1');
        
        document.documentElement.style.setProperty('--bigScreenColor', '#dcd1d1');

        document.documentElement.style.setProperty('--buttonColor', '#fdb306');
        document.documentElement.style.setProperty('--buttonFlashColor', '#f1bd44');
        document.documentElement.style.setProperty('--buttonHoverColor', '#c98f09');
        return;
    }


}