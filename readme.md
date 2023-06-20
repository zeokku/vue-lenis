# ✋ [Lenis](https://github.com/studio-freight/lenis) smooth scroll directive for Vue templates

## Installation

Install the library

```shell
pnpm add vue-lenis
```

Add the plugin to your Vue app:

```ts
import lenis from "vue-lenis";

createApp(App)
  .use(lenis)
  .mount("#app");
```

## Usage

Just specify `v-lenis` directive on a scrollable element and it's done!

```vue
<template lang="pug">
.view(v-lenis)
    .content
        // ...
</template>
```

Optionally you can provide an object with fields for the value:

* `ref` - Vue ref which will be assigned a lenis instance, available in `onMounted()` hook
* `registerRaf` - If you want to run lenis.raf() by yourself, set it to `false`. (Default: `true`)
* `settings` - Object with [lenis instance settings](https://github.com/studio-freight/lenis#instance-settings)