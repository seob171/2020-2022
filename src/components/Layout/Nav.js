import Components from '../../core/Components.js';
import { $ } from '../../util/util.js';
import router from '../../router.js';

export default class Nav extends Components {
  async initialState() {
    this.setState({});
  }

  template() {
    return `
      <nav>
        <li data-navigate="/">home</li>
        <li data-navigate="/posts">posts</li>
        <li data-navigate="/settings">settings</li>
      </nav>
    `;
  }

  async componentDidMount() {
    window.onpopstate = async () => {
      const view = await router();
      new view($('#app'));
    };

    $('nav').addEventListener('click', async event => {
      console.log(event);
      event.preventDefault();
      const { navigate } = event.target.dataset;
      window.history.pushState(null, '', navigate);

      const view = await router();
      new view($('#app'));
    });
  }
}
