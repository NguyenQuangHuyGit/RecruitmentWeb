<template>
    <div class="recruit-container">
        <div class="recruit-aside">
            <div
                class="aside-control"
                :class="{ expand: isExpandNav }"
                @click="isExpandNav = !isExpandNav"
            >
                <span></span>
            </div>
            <div class="aside-nav">
                <div
                    class="aside-nav-item search"
                    @click="router.push({ name: 'recruiter-mannage' })"
                >
                    <span></span>
                    <p v-if="!isExpandNav">Tin tuyển dụng</p>
                </div>
                <div class="aside-nav-item company">
                    <span></span>
                    <p v-if="!isExpandNav">Công ty</p>
                </div>
            </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column">
            <div class="recruit-header"></div>
            <div class="recruit-main">
                <h2 style="font-weight: normal">Quản lý đăng tuyển</h2>
                <div class="main-container">
                    <Suspense>
                        <RouterView name="recruiterview" />
                    </Suspense>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isExpandNav = ref(false);
</script>

<style scoped>
.recruit-container {
    width: 100%;
    height: 100vh;
    display: flex;
}

.recruit-container .recruit-aside {
    width: 170px;
    background-color: #001833;
}

.recruit-container .recruit-header {
    height: 50px;
    width: 100%;
    background-color: #fff;
}

.recruit-container .recruit-main {
    flex: 1;
    width: 100%;
    padding: 35px 35px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.recruit-container .recruit-main h2 {
    font-family: Roboto-Medium;
}

.recruit-container .recruit-main .main-container {
    height: 100%;
    min-height: max-content;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color: #fff;
    border-radius: 4px;
}

.recruit-aside .aside-control {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.recruit-container .recruit-aside:has(.aside-control.expand) {
    width: 70px;
}

.recruit-aside .aside-control:hover {
    background-color: #1e3155;
}

.recruit-aside .aside-control span {
    width: 20px;
    height: 20px;
    background-image: url(@/assets/icons/right-arrow.png);
    background-size: contain;
}

.recruit-aside .aside-control.expand span {
    transform: rotateY(180deg);
}

.aside-nav {
    width: 100%;
    height: calc(100vh - 50px);
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.aside-nav .aside-nav-item {
    width: 100%;
    height: 40px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 10px;
}

.aside-nav .aside-nav-item:hover {
    background-color: #1e3155;
}

.aside-nav .aside-nav-item p {
    color: #fff;
    flex: 1;
    font-size: 0.9em;
}

.aside-nav .aside-nav-item.search span {
    width: 25px;
    height: 25px;
    background-image: url(@/assets/icons/search-user.png);
    background-size: contain;
}

.aside-nav .aside-nav-item.company span {
    width: 25px;
    height: 25px;
    background-image: url(@/assets/icons/office-building.png);
    background-size: contain;
}
</style>
