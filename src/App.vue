<script setup>
import { onBeforeMount, onErrorCaptured, provide, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/counter";
import { useToast } from "primevue/usetoast";
const isLoading = ref(false);
const authContext = useUserStore();
const setLoading = (value) => {
    isLoading.value = value;
};

provide("setLoading", setLoading);

onBeforeMount(async () => {
    setLoading(true);
    await authContext.getUser(() => {
        setLoading(false);
    });
});

onErrorCaptured((err, instance, info) => {
    console.log(err);
    const toast = useToast();
    toast.add({
        severity: "error",
        summary: "Lỗi hệ thống",
        detail: "Vui lòng thử lại sau ít phút",
        life: 3000,
    });
    setLoading(false);
    return false;
});
</script>

<template>
    <error-boundary>
        <RouterView name="root" />
    </error-boundary>
    <Toast />
    <div class="overlay" v-if="isLoading">
        <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
        />
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>
