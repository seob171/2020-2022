import router from './router.js';

window.onload = () => {
    document.body.addEventListener('click', e => {
        // if(e.target.matches('data-link')){
        e.preventDefault();
        window.history.pushState(null, null, e.target.getAttribute('route'));
        router();
        // }
    });
    window.addEventListener('popstate', () => {
        router();
    });
    router();
};
