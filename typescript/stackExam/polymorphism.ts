{
    // 함수의 리턴 타입
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?:boolean;
    }

    // 인터페이스
    interface CoffeeMaker {
        makeCoffee(shots:number):CoffeeCup
        fillCoffeeBeans(beans:number):void
    }


    class CoffeeMachine implements CoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        constructor(beans: number) {
            this.coffeeBeans = beans
        }

        static makeMachine(beans: number): CoffeeMachine{
            return new CoffeeMachine(beans)
        }

        clean() {
            console.log('커피 머신을 청소중입니다..✨')
        }

        fillCoffeeBeans(beans:number){
            if(beans < 0){
                throw new Error('커피 콩의 갯수는 음수가 될 수 없습니다.')
            }
            this.coffeeBeans += beans
        }

        grindBeans(shots:number){
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error('커피 콩이 부족합니다.')
            }

            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT

        }

        private preHeat(){
            console.log('커피 머신을 예열중입니다...')
        }


        private extract(shots:number):CoffeeCup{
            console.log(`${shots}샷 커피를 추출하고 있습니다...`)
            return{
                shots:shots,
                hasMilk:false
            }
        }

        // makeCoffee를 조금 더 복잡하게 만들어봅시다!
        makeCoffee(shots: number): CoffeeCup{

            // 커피콩을 그라인더로 갈고
            this.grindBeans(shots)
            // 커피 머신을 예열하고
            this.preHeat()
            // 커피를 추출합니다.
            return this.extract(shots)

        }
    }

    class CaffeLatteMachine extends CoffeeMachine{

        constructor(serialNumber:string,beans:number) {
            super(beans);
        }

        steamMilk():void{
            console.log('우유를 스팀중입니다...')
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            this.steamMilk()
            return {...coffee,hasMilk:true}
        }

    }

    class SweetCoffeeMaker extends CoffeeMachine{
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return {...coffee,hasSugar:true}
        }
    }

    const machine = new CoffeeMachine(23)
    const latteMachine = new CaffeLatteMachine("232",33)

    const machines: CoffeeMaker[] = [
        new CoffeeMachine(16),
        new CaffeLatteMachine('ssss',16),
        new SweetCoffeeMaker(16),
        new CoffeeMachine(16),
        new CaffeLatteMachine('ssss',16),
        new SweetCoffeeMaker(16),
    ]

    machines.forEach(machine=>{
        machine.makeCoffee(1)
    })


}