import Components from '../../core/Components.js';

export default class Menu extends Components {
  async initialState() {
    this.setState({});
  }

  template() {
    return `
            <div class="menu_wrap">
                <div class="inner">
                    <div class="category_menu">
                        <ul>
                            <li data-cm="home">
                                <span>홈</span>
                            </li>
                            <li data-cm="life">
                            	<span>라이프</span>
							</li>
                            <li data-cm="food">
                            	<span>푸드</span>
                            </li>
                            <li data-cm="trip">
								<span>여행</span>
							</li>
                            <li data-cm="culture">
                            	<span>컬쳐</span
                            ></li>
                        </ul>
                    </div>
                    <div class="sub_menu">
                    <ul class="hub_link">
                    	<li data-sm="latest">
                    		<span>최근 읽은 글</span>
						</li>
						<li data-sm="channel">
							<span>채널</span>
						</li>
					</ul>
				</div>
			</div>
       </div>
    `;
  }

  async componentDidMount() {}
}
