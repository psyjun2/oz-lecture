// 입출력 점수 물어보기 
let input = prompt("점수를 입력하세요.");
console.log(input);
let score = Number(input);

// 변수 선언 
const maxSxore = 100; 
var grade;

// 연산자 사용 / 복합 대입 보너스 5점 
score += 5;

// 조건문 if (등급 나누기)
if (score >= 100) {
    grade = "S";
} else if (score >= 90 && score < 100) {
    grade = "A";
} else if (score >= 80 && score < 90) {
    grade = "B";
} else if (score >= 70 && score < 80) {
    grade = "C";
} else if (score >= 60 && score < 70) {
    grade = "D";
} else {
    grade = "F";
}

// 삼항 연산자 (합격,불합격 여부)
const resultStatus = (score >= 60) ? "Pass" : "Fail";

// 결과 백틱 사용 
console.log(`최종 점수: ${score}점`);
console.log(`합격 여부: ${resultStatus}`)

// switch (등급별 메시지) 백틱 사용 
switch (grade) {
    case "S":
        console.log(`등급: S - “Super!!”`);
        break;
    case "A":
        console.log(`등급: A - "Excellent work!"`);
        break;
    case "B":
        console.log(`등급: B - "Good job!"`);
        break;
    case "C":
        console.log(`등급: C - "Satisfactory performance.\"`);
        break;
    case "D":
        console.log(`등급: D - "Needs improvement."`);
        break;
    case "F":
        console.log(`등급: F - "Please try harder!"`);
        break;
}

