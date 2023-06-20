import type { Plugin } from 'vue';
import { directive } from './directive';

export default ((app) => {
    app.directive('lenis', directive)
}) as Plugin;