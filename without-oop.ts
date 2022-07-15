{
    // 함수의 리턴 타입
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    }

    const BEANS_GRAMM_PER_SHOT: number = 7;

    let coffeeBeans: number = 0;

    function makeCoffee(shots: number): CoffeeCup{
        // 현재 커피 콩 < 샷을 내리는데 필요한 커피 콩
        if(coffeeBeans < shots * BEANS_GRAMM_PER_SHOT){
            throw new Error('커피 콩이 부족합니다.')
        }

        // 사용한 만큼 커피 콩 감소
        coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT

        return {
            shots: shots,
            hasMilk: false
        }
    }

    coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT
    const coffee = makeCoffee(2)
    console.log(coffee)
}