<template>
    <Navbar />
    <div class="container">
        <Suspense>
            <RouterView name="mainview"/>
        </Suspense>
     </div>
     <ScrollTop :threshold="200"/>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/layouts/nav/Navbar.vue";
</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>