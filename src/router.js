import { $ } from "./util/util.js";
const CHANGE_ROUTE_EVENT = "urlChange";

export default class Router {
  router;
  lastUrl;
  constructor() {
    this.router = [];
    this.notFoundComponent = () => {};
    window.addEventListener(CHANGE_ROUTE_EVENT, this.route);
    window.addEventListener("popstate", this.route);
    this.addLinkEvent();
  }

  addLinkEvent() {
    $("body").addEventListener("click", (event) => {
      const { target } = event;

      if (target.matches("*[data-navigate]")) {
        event.preventDefault();
        const { navigate } = target.dataset;
        this.changeRoute(navigate);
      }
    });
  }

  notFoundComponent() {}
  getUrlQuery() {
    const searchQuery = new URLSearchParams(window.location.search);
    const query = {};
    for (const [key, value] of searchQuery) {
      query[key] = value;
    }

    return query;
  }

  getUrlParams(currentRouter, pathname) {
    const params = {};

    if (currentRouter.params.length !== 0) {
      const matches = pathname.match(currentRouter.testRegExp);

      if (matches) {
        matches.shift();
        matches.forEach((paramValue, index) => {
          const paramName = currentRouter.params[index];
          params[paramName] = paramValue;
        });
      }
    }
    return params;
  }

  setNotFound(path, component) {
    this.notFoundComponent = component;
    return this;
  }

  addRoute(path, component) {
    const params = [];

    // parse params
    const parsedParam = path
      .replace(/:(\w+)/g, (_, param) => {
        params.push(param); // param 추가하고
        return "([^\\/]+)"; // 정규표현식으로 처리하기 위해 param 을 특정 패턴으로 변경
      })
      .replace(/\//g, "\\/"); // '/' 를 '\/' 패턴으로 변경 (정규표현식으로 인식하기 위함)

    this.router.push({
      testRegExp: new RegExp(`^${parsedParam}$`),
      component,
      params,
    });

    return this;
  }

  changeRoute(url) {
    history.pushState(null, "", url);
    window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
  }

  route() {
    const { pathname, search } = window.location;
    const URL = `${pathname}${search}`;
    if (this.lastUrl === URL) {
      return;
    }
    this.lastUrl = URL;

    const query = this.getUrlQuery();
    const currentRouter = this.router.find((route) =>
      route.testRegExp.test(pathname)
    );
    if (!currentRouter) {
      this.notFoundComponent();
      return;
    }
    const params = this.getUrlParams(currentRouter, pathname);

    const location = {
      params,
      query,
    };

    currentRouter.component(location);
  }
}
