// 자바스크립트 자체 내장 에러 클래스 Error의 슈도 코드
//
// class Error{
//     constructor(message) {
//         this.message = message
//         this.name = 'Error'
//         this.stack = [call stack]
//     }
// }

class MyError extends Error {
    constructor(message: any) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError {
    property = "";
    constructor(message: any) {
        super(message); // message 프로퍼티는 부모 생성자에서 설정
        this.name = "ValidationError"; // name 프로퍼티도 "Error" 로 설정되므로 변경
        // this.property = "";
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property: any) {
        super(`No property : ${property}`); // message 프로퍼티는 부모 생성자에서 설정
        property = property;
    }
}

// function test() {
//     throw new ValidationError("에러 발생!");
// }
//
// try {
//     test();
// } catch (err: any) {
//     alert(err.message);
//     alert(err.name);
//     alert(err.stack);
// }

function readUser(json: string) {
    let user = JSON.parse(json) as { age?: number; name?: string };

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }

    return user;
}

try {
    let user = readUser('{ "age": 25 }');
} catch (err: any) {
    if (err instanceof ValidationError) {
        // console.log(`invalid data : ${err.message}`);
        console.log("Invalid data: " + err.message); // Invalid data: No property: name
        console.log(err.name); // PropertyRequiredError
        console.log(err.property); // name
    } else if (err instanceof SyntaxError) {
        console.log(`JSON syntax Error : ${err.message}`);
    } else {
        throw err; // 알려지지 않은 에러는 re-throwing 합니다.
    }
}
