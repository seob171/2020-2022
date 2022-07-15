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
    maker.coffeeBeans  = -30 // invalid
}