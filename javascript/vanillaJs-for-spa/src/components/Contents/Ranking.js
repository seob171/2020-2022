import Components from '../../core/Components.js';
import { $ } from '../../util/util';
import '../../style/ranking.css'

export default class Ranking extends Components {

    constructor(props) {
        super(props);
        this.initialState()
    }

    async initialState() {
        this.setState({ranking:[]});
        await this.getData()
    }

    template() {
        return `
        <div id="ranking">
            <div class="ranking_wrap">
                <div class="inner">
                    <ul>
                        ${this.state.ranking.map((rank,index)=>{
                            return `<li key={index}>
                                        <span>${rank.title}</span>
                                        <span>${rank.mediaName}</span>
                                    </li>`
                                    
                        }).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    }

    async getData(){
        try{
            const res = await fetch('http://localhost:3001/ranking')
            const data = await res.json()
            console.log(data)
            this.setState({ranking:data})
        }catch(err){
            throw new Error(err)
        }
    }

    async componentDidMount() {
        // ranKing 데이터 가져오기
        // await this.getData()

    }

}
