import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'vue-final-modal/style.css';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { createVfm } from 'vue-final-modal';

hljs.registerLanguage('cpp', cpp);

const pinia = createPinia();
const app = createApp(App);

app.use(createVfm());
app.use(pinia);
app.use(hljsVuePlugin);
app.mount('#app');
