{
    // 함수의 리턴 타입
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    }

    // 접근자
    // public : 외부 접근 가능
    // private : 외부 접근 불가능
    // protected : 외부 접근은 불가능하지만 sub 클래스에서는 접근 가능
    class CoffeeMachine {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        private constructor(beans: number) {
            this.coffeeBeans = beans
        }

        // 보통 makeMachine과 같이 생성자를 리턴하는 함수를 갖고있다는건
        // 이 클래스의 생성자를 이용하여 인스턴스를 만드는것을 금지하고 싶다 라는 의미를 갖기 때문에
        // constructor 앞에 private을 붙여 makeMachine이라는 함수를 사용하도록 권장하는것이 좋다.
        static makeMachine(beans: number): CoffeeMachine{
            return new CoffeeMachine(beans)
        }

        fillCoffeeBeans(beans:number){
            if(beans < 0){
                throw new Error('커피 콩의 갯수는 음수가 될 수 없습니다.')
            }
            this.coffeeBeans += beans
        }

        makeCoffee(shots: number): CoffeeCup{
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error('커피 콩이 부족합니다.')
            }

            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT

            return {
                shots: shots,
                hasMilk: false
            }
        }
    }

    // const maker = new CoffeeMachine(31)
    const maker = CoffeeMachine.makeMachine(32)
    maker.fillCoffeeBeans(32)
    // maker.coffeeBeans  = -30 // invalid

    class User{
        firstName:string
        lastName:string
        fullName:string
        constructor(firstName:string,lastName:string){
            this.firstName = firstName
            this.lastName = lastName
            this.fullName = `${this.firstName} ${this.lastName}`
        }
    }
    const user = new User('Steve','Jobs')
    console.log(user.fullName) // Steve Jobs
    user.firstName = 'seob'
    console.log(user.fullName) // Steve Jobs

    // firstName을 seob로 수정해도 최초 생성시 fullName이 지정되었기 때문에 변경된 firstName을 적용하지 않는다.
    // 때문에 getter, setter로 값을 수정하고 적용할 수 있다.

    class Person{
        get fullName():string{
            return  `${this.firstName} ${this.lastName}`
        }
        set fullName(fullName:string){
            this.fullName = fullName
        }

        constructor(private firstName:string,private lastName:string){
        }
    }
    const person = new User('Steve','Jobs')
    console.log(person.fullName) // Steve Jobs
    person.firstName = 'Seob'
    console.log(person.fullName) // Seob Jobs

}