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

    interface MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup
    }

    interface SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup
    }


    class CoffeeMachine implements CoffeeMaker{
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        constructor(private beans: number,private milkFrother:MilkFrother,private sugar:SugarProvider) {
            this.coffeeBeans = beans
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
            const coffee = this.extract(shots)
            const sugarAdded = this.sugar.addSugar(coffee)
            return this.milkFrother.makeMilk(sugarAdded)

        }
    }

    class NoMilk implements MilkFrother{
        makeMilk(cup: CoffeeCup): CoffeeCup {
            return cup
        }
    }

    // 싸구려 우유 거품기
    class CheapMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log('우유를 스팀처리 합니다...')
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk()
            return {...cup, hasMilk:true}
        }
    }

    // 고급 우유 거품기
    class FancyMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log('우유를 스팀처리 합니다...')
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk()
            return {...cup, hasMilk:true}
        }
    }
    // 차가운 우유 거품기
    class ColdMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log('우유를 스팀처리 합니다...')
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk()
            return {...cup, hasMilk:true}
        }
    }

    class NoSugar implements SugarProvider{
        addSugar(cup: CoffeeCup): CoffeeCup {
            return cup
        }
    }

    // 설탕 제조기
    class CandySugarMixer implements SugarProvider{
        private getSugar():boolean{
            console.log('설탕을 가져옵니다...')
            return true
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar = this.getSugar()
            return {...cup, hasSugar:sugar}
        }
    }

    class SugarMixer implements SugarProvider{
        private getSugar():boolean{
            console.log('설탕을 가져옵니다...')
            return true
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar = this.getSugar()
            return {...cup, hasSugar:sugar}
        }
    }



    const noMilk = new NoMilk()
    const cheapMilkSteamer = new CheapMilkSteamer()
    const fancyMilkSteamer = new FancyMilkSteamer()
    const coldMilkSteamer = new ColdMilkSteamer()

    const noSugar = new NoSugar()
    const candySugar = new CandySugarMixer()
    const sugar = new SugarMixer()

    const machine  = new CoffeeMachine(100,noMilk,noSugar)
    const sweetCandyMachine  = new CoffeeMachine(100,noMilk,candySugar)
    const sweetMachine  = new CoffeeMachine(100,noMilk,sugar)
    const latteMachine = new CoffeeMachine(100,cheapMilkSteamer,noSugar)
    const sweetLatteMachine = new CoffeeMachine(100,fancyMilkSteamer,sugar)

}