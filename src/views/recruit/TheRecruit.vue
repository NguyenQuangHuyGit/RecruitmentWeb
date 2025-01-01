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
                <router-link
                    :to="{ name: 'recruiter-mannage' }"
                    style="text-decoration: none; color: #000; width: 100%"
                >
                    <div
                        class="aside-nav-item search"
                        v-tooltip="{
                            value: 'Tin tuyển dụng',
                            disabled: !isExpandNav,
                        }"
                    >
                        <span></span>
                        <p v-if="!isExpandNav">Tin tuyển dụng</p>
                    </div>
                </router-link>
                <router-link
                    :to="{ name: 'company-manage' }"
                    style="text-decoration: none; color: #000; width: 100%"
                >
                    <div
                        class="aside-nav-item company"
                        v-tooltip="{
                            value: 'Công ty',
                            disabled: !isExpandNav,
                        }"
                    >
                        <span></span>
                        <p v-if="!isExpandNav">Công ty</p>
                    </div>
                </router-link>
                <div
                    class="aside-nav-item message"
                    v-tooltip="{
                        value: 'Hộp thoại',
                        disabled: !isExpandNav,
                    }"
                >
                    <span></span>
                    <p v-if="!isExpandNav">Hộp thoại</p>
                </div>
                <div
                    class="aside-nav-item setting"
                    v-tooltip="{
                        value: 'Cài đặt',
                        disabled: !isExpandNav,
                    }"
                >
                    <span></span>
                    <p v-if="!isExpandNav">Cài đặt</p>
                </div>
                <div
                    class="aside-nav-item logout"
                    v-tooltip="{
                        value: 'Đăng xuất',
                        disabled: !isExpandNav,
                    }"
                    @click="handleLogout"
                >
                    <span></span>
                    <p v-if="!isExpandNav">Đăng xuất</p>
                </div>
            </div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column">
            <div class="recruit-header">
                <router-link
                    :to="{ name: 'main' }"
                    style="text-decoration: none; color: #000; width: 100%"
                >
                    <Button label="Trang chủ" />
                </router-link>
                <div class="notification" @click="handleOpenNotification">
                    <OverlayBadge value="2" size="small">
                        <i
                            class="pi pi-bell"
                            style="font-size: 1.2rem; padding: 2px"
                        />
                    </OverlayBadge>
                </div>
            </div>
            <div class="recruit-main">
                <p style="font-family: Roboto-Medium; font-size: 1.7em">
                    {{ title }}
                </p>
                <div class="main-container">
                    <Suspense>
                        <RouterView name="recruiterview" />
                    </Suspense>
                </div>
            </div>
        </div>
        <Drawer
            v-model:visible="visibleNotification"
            header="Thông báo"
            position="right"
            style="width: 30em"
        >
            <Tabs value="0">
                <TabList>
                    <Tab
                        value="0"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Tất cả</Tab
                    >
                    <Tab
                        value="1"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Chưa đọc</Tab
                    >
                    <Tab
                        value="2"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Đã đọc</Tab
                    >
                </TabList>
                <TabPanels style="padding: 14px 0">
                    <TabPanel value="0">
                        <div class="notification-list">
                            <div class="notification-item hvr-shrink">
                                <p style="line-height: 1.25em">
                                    Nhà tuyển dụng
                                    <span style="font-family: Roboto-Bold"
                                        >Nguyễn Quang Huy</span
                                    >
                                    của
                                    <span style="font-family: Roboto-Bold"
                                        >Công ty cổ phần MISA</span
                                    >
                                    đã xem hồ sơ ứng tuyển của bạn cho công việc
                                    <span style="font-family: Roboto-Bold"
                                        >Nhân Viên Kế Toán Thuế - 2 Năm Kinh
                                        Nghiệm</span
                                    >
                                </p>
                                <p style="font-size: 0.85em">
                                    20:54:24 - 10/12/2024
                                </p>
                            </div>
                            <div class="notification-item hvr-shrink">
                                <p style="line-height: 1.25em">
                                    Nhà tuyển dụng
                                    <span style="font-family: Roboto-Bold"
                                        >Nguyễn Quang Huy</span
                                    >
                                    của
                                    <span style="font-family: Roboto-Bold"
                                        >Công ty cổ phần MISA</span
                                    >
                                    đã đánh hồ sơ ứng tuyển của bạn cho công
                                    việc
                                    <span style="font-family: Roboto-Bold"
                                        >Nhân Viên Kế Toán Thuế - 2 Năm Kinh
                                        Nghiệm</span
                                    >
                                    là:
                                    <br />
                                    <span
                                        style="
                                            font-family: Roboto-Bold;
                                            color: #10b981;
                                        "
                                        >Hồ sơ phù hợp</span
                                    >
                                </p>
                                <p style="font-size: 0.85em">
                                    16:54:24 - 01/01/2024
                                </p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                    </TabPanel>
                    <TabPanel value="2">
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Drawer>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, provide } from "vue";
import { onBeforeRouteUpdate, RouterLink, RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import authservice from "@/services/authservice";
import { useUserStore } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const isExpandNav = ref(false);
const authContext = useUserStore();
const setLoading = inject("setLoading");
const visibleNotification = ref(false);

const title = ref("Quản lý");

const setTitle = (title) => {
    title.value = title;
};

provide("setTitle", setTitle);

const handleLogout = async () => {
    setLoading(true);
    await authservice.signOut();
    router.push({ name: "main" });
    authContext.user = null;
    setLoading(false);
};

const handleOpenNotification = () => {
    visibleNotification.value = true;
}

onBeforeMount(() => {
    if (route.name == "company-manage") {
        title.value = "Thông tin công ty";
    } else if (route.name == "recruiter-mannage") {
        title.value = "Quản lý tuyển dụng";
    } else if (route.name == "user-list") {
        title.value = "Quản lý tuyển dụng // Danh sách ứng viên";
    }
});

onBeforeRouteUpdate((to, from, next) => {
    if (to.name == "company-manage") {
        title.value = "Thông tin công ty";
    } else if (to.name == "recruiter-mannage") {
        title.value = "Quản lý tuyển dụng";
    } else if (to.name == "user-list") {
        title.value = "Quản lý tuyển dụng // Danh sách ứng viên";
    }
    next();
});
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
    display: flex;
    align-items: center;
    padding: 0 35px;
}

.recruit-container .recruit-main {
    flex: 1;
    width: 100%;
    padding: 28px 35px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    position: relative;
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

@media screen and (max-width: 1000px) {
    .aside-nav .aside-nav-item p {
        display: none;
    }

    .recruit-container .recruit-aside {
        width: 70px;
    }

    .recruit-aside .aside-control {
        pointer-events: none;
        opacity: 0.5;
    }

    .recruit-aside .aside-control span {
        transform: rotateY(180deg);
    }
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

.aside-nav .aside-nav-item.message span {
    width: 25px;
    height: 25px;
    background-image: url(@/assets/icons/chatting.png);
    background-size: contain;
}

.aside-nav .aside-nav-item.setting span {
    width: 25px;
    height: 25px;
    background-image: url(@/assets/icons/settings.png);
    background-size: contain;
}

.aside-nav .aside-nav-item.logout {
    position: absolute;
    bottom: 35px;
    left: 10px;
    width: calc(100% - 20px);
}

.aside-nav .aside-nav-item.logout span {
    width: 25px;
    height: 25px;
    background-image: url(@/assets/icons/turn-off.png);
    background-size: contain;
}

.notification {
    cursor: pointer !important;
    border-radius: 50%;
    width: max-content;
    height: max-content;
    padding: 5px;
    box-sizing: content-box !important;
}

.notification:hover {
    background-color: #f1f2f5;
}

.notification:active {
    background-color: #e8e9ee;
}

.notification-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: inherit;
}

.notification-list .notification-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    height: max-content;
    border-radius: 8px;
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
}
</style>
