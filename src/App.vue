<script setup>
import { provide, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const isLoading = ref(false);

const setLoading = (value) => {
    isLoading.value = value;
};

provide("setLoading", setLoading);
</script>

<template>
    <RouterView name="root" />
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
