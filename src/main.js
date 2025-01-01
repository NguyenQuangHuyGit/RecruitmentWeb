import "./assets/css/main.css";
import "primeicons/primeicons.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import 'hover.css' 

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";
import { QuillEditor } from "@vueup/vue-quill";
import DialogService from "primevue/dialogservice";
import AnimateOnScroll from "primevue/animateonscroll";
import Tooltip from "primevue/tooltip";
import Common from "./helper/common.js";
import App from "./App.vue";
import router from "./router";
import PdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
import { GlobalWorkerOptions } from 'vue-pdf-embed/dist/index.essential.mjs'
GlobalWorkerOptions.workerSrc = PdfWorker;

const app = createApp(App);

app.directive("animateonscroll", AnimateOnScroll);
app.use(createPinia());
app.use(ToastService);
app.use(DialogService);
app.directive("tooltip", Tooltip);
app.component("QuillEditor", QuillEditor);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: "dark-mode",
        },
    },
});

app.directive("mounted", {
    mounted(el, binding) {
        binding.value();
    },
});

app.config.globalProperties.common = Common;
app.use(router);

app.mount("#app");
