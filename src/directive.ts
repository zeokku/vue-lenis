import type { Directive, Ref } from "vue";
import Lenis from "@studio-freight/lenis";

export type DirectiveValue = Partial<{
    /**
     * Vue ref which will be assigned a lenis instance, 
     * available in `onMounted()` hook
     */
    ref: Ref<Lenis>,

    /**
     * If you want to run lenis.raf() by yourself, set it to `false`
     * @default true
     */
    registerRaf: boolean,
    /**
     * @todo whether to dispatch `lenis-scroll` events or not
     * @default false
     */
    // event: boolean,
    /**
     * Lenis instance creation settings
     */
    settings: ConstructorParameters<typeof Lenis>
}>

const rafs = new Map<HTMLElement, ReturnType<typeof requestAnimationFrame>>();
const lenisInstances = new Map<HTMLElement, Lenis>();

export const directive: Directive<HTMLElement, DirectiveValue | undefined> = {
    mounted(el, { value = {} }, vnode) {
        let lenis = new Lenis({
            wrapper: el,
            content: el.firstChild as HTMLElement,

            ...value.settings
        })

        lenisInstances.set(el, lenis);

        if (value.ref) {
            value.ref.value = lenis;
        }

        if (value.registerRaf !== false) {

            rafs.set(el, requestAnimationFrame(function raf(time) {
                rafs.set(el, requestAnimationFrame(raf));

                lenis.raf(time)
            }));

        }

        // if (value.event) {
        //     lenis.on('scroll', e => {
        //         el.dispatchEvent(new Event('lenis-scroll', e))
        //     })
        // }
    },
    beforeUnmount(el) {
        // @note cancelAnimationFrame allows providing `undefined` as argument, so we don't need any extra checks
        cancelAnimationFrame(rafs.get(el)!);
        rafs.delete(el);

        lenisInstances.get(el)!.destroy();
    }
}