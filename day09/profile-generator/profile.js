// 1. 변수 선언 (var, let, const)
var age = 40;                
let userName = "Junhee";     
const isStudent = false;   

// 추가 데이터 타입
let emptyValue = null;   
let notAssigned;       
const uniqueId = Symbol("id");
const bigNumber = 12345678901234567890n;

// 2. 문자열 처리 
let profileInfo = "User Profile\n\tName: " + userName + "\n\tAge: " + age;
console.log(profileInfo);

// 3. 문자열 연결 연산자 사용
let intro = "Hello, my name is " + userName + " and I am " + age + " years old.";
console.log(intro);

// 4. 배열 리터럴 
let hobbies = ["tennis", "coding", "reading"];

// 배열 요소를 문자열로 결합하여 출력
console.log("My hobbies: " + hobbies.join(", "));

// 5. 객체 리터럴
let profile = {
    name: "Junhee",
    age: 40,
    isStudent: false
};

// 객체 속성으로 프로필 문장 생성
console.log("Profile: " + profile.name + " is " + profile.age + " years old.");

// 6. typeof 연산자 사용
console.log("Type of age:", typeof age);
console.log("Type of hobbies:", typeof hobbies);
console.log("Type of profile:", typeof profile);