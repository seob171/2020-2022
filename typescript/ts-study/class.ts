{
    // 함수의 리턴 타입
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    }

    class CoffeeMachine {
        // 클래스에서 공유하는 값을 멤버변수로 두면 메모리 낭비가 될 수 있다.
        // static을 붙이면 class level이 된다.
        static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        coffeeBeans: number = 0; // instance (object) level

        constructor(beans: number) {
            this.coffeeBeans = beans
        }

        // static을 활용하는 예제 (맨 하단에서 활용)
        static makeMachine(beans: number): CoffeeMachine{
            return new CoffeeMachine(beans)
        }

         makeCoffee(shots: number): CoffeeCup{
            // 현재 커피 콩 < 샷을 내리는데 필요한 커피 콩
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error('커피 콩이 부족합니다.')
            }

            // 사용한 만큼 커피 콩 감소       // BEANS_GRAMM_PER_SHOT이 class level이기 때문에 this. 이 아닌 CoffeeMachine. 이 붙는다.
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT

            return {
                shots: shots,
                hasMilk: false
            }
        }
    }

    const maker = new CoffeeMachine(31)
    maker.makeCoffee(2)

    const maker2 = new CoffeeMachine(45)
    maker2.makeCoffee(3)

    // static을 활용하는 예제
    const maker3 = CoffeeMachine.makeMachine(28)

    Math.PI // PI도 static을 활용하여 생성된 Math 클래스 내부 변수이다.
}