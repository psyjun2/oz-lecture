const maxStars = 10;

function printStars(count = 1) {
var stars = ""; 
    for (let i = 0; i < count; i++) {
        stars = stars + "*";
    }
    console.log(stars);
}

const getPromptInput = () => {
    let input;
    let isNotValid = true;
    while (isNotValid) {
        let inputStr = prompt("1에서 10 사이의 숫자를 입력해주세요.");
        input = Number(inputStr);
        if (!isNaN(input) && input >= 1 && input <= maxStars) {
            isNotValid = false;
            break;
        } else {
            console.log("Invalid input! Enter a number between 1 and 10.");
            continue;
        }
    }
    return input;
}


const inputVal = getPromptInput();
printStars(inputVal);