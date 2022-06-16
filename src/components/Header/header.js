import Components from '../../core/Components.js';
import Menu from './menu';
import { $ } from '../../util/util';
import '../../style/header.css';

export default class Header extends Components {
  async initialState() {
    this.setState({});
  }

  template() {
    return `
        <div id="header">
            <div class="header_wrap">
                <div class="inner">
                    <h1>
                        <img src="https://hub.zum.com/resources/pc/images/logo_zum_2x_20210429-047bb40d62fc256b0d38d0359520856e.png" width="65" height="27" alt="zum">
                        <img src="https://hub.zum.com/resources/pc/images/img_hub_zum_2x_20210429-327cc2698de49b56b35ae8d45e833a05.png" width="39" height="21" alt="허브">
                    </h1>
                    <div class="search_box">
                        <form action="">
                            <fieldset>
                                <div class="search_box_wrap">
                                    <Input type="text">
                                    <button>
                                        검색
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                        <div class="gnb">
                            <ul class="gnb_service"></ul>
                            <div class="gnb_login">
                                <span>로그인</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="menu"></div>
        </div>
    `;
  }

  async componentDidMount() {
    new Menu($('#menu'));
  }
}
