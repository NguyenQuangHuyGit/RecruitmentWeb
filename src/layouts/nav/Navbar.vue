<template>
    <div class="nav-bar-container">
        <Menubar
            :model="itemContext"
            class="justify-end"
            style="padding: 8px 20px"
        >
            <template #start>
                <Button
                    label="Trang chủ"
                    @click="$router.push({ name: 'main' })"
                />
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <span
                        v-if="item.shortcut"
                        class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                        >{{ item.shortcut }}</span
                    >
                    <i
                        v-if="hasSubmenu"
                        :class="[
                            'pi pi-angle-down ml-auto',
                            { 'pi-angle-down': root, 'pi-angle-right': !root },
                        ]"
                    ></i>
                </a>
            </template>
            <template #end>
                <div class="flex gap-1 justify-center align-center">
                    <Button
                        v-if="!authContext.isAuthenticated"
                        label="Đăng nhập"
                        @click="
                            $router.push({
                                name: 'user-auth',
                                query: { isSignIn: true },
                            })
                        "
                    />
                    <Button
                        v-if="!authContext.isAuthenticated"
                        label="Đăng ký"
                        @click="$router.push({ name: 'user-auth' })"
                    />
                    <div
                        class="notification"
                        v-if="authContext.isAuthenticated"
                        @click="handleOpenNotification"
                    >
                        <OverlayBadge value="2" size="small">
                            <i
                                class="pi pi-bell"
                                style="font-size: 1.2rem; padding: 2px"
                            />
                        </OverlayBadge>
                    </div>
                    <Avatar
                        label="H"
                        class="mr-2 avatar"
                        shape="circle"
                        v-if="authContext.isAuthenticated"
                        @click="visible = true"
                    />
                </div>
            </template>
        </Menubar>
    </div>
    <Drawer v-model:visible="visible" position="right">
        <div class="account-controll-header">
            <p style="font-family: Roboto-Medium; font-size: 1.2em">
                Chào mừng bạn
            </p>
            <div
                style="
                    font-size: 0.9em;
                    color: color-mix(
                        in srgb,
                        #64748b calc(100% * 1),
                        transparent
                    );
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                "
            >
                <p v-if="authContext.user">{{ authContext.user?.fullName }}</p>
                <p v-if="authContext.user">
                    Mã ứng viên: <span>#27042002</span>
                </p>
                <p v-if="authContext.user">{{ authContext.user?.email }}</p>
                <p v-else>
                    Hãy đăng nhập để bắt đầu ứng tuyển vào những công việc phù
                    hợp bạn nhé
                </p>
            </div>
        </div>
        <div class="account-controll-body">
            <div
                class="account-controll-item"
                @click="handleNavigate('user-profile')"
            >
                <div class="account-controll-item-icon">
                    <i class="pi pi-user" style="color: #10b981"></i>
                </div>
                <div class="account-controll-item-content">
                    <p>Hồ sơ của bạn</p>
                </div>
            </div>
            <div
                class="account-controll-item"
                @click="handleNavigate('user-job')"
            >
                <div class="account-controll-item-icon">
                    <i class="pi pi-briefcase" style="color: #10b981"></i>
                </div>
                <div class="account-controll-item-content">
                    <p>Việc làm của bạn</p>
                </div>
            </div>
            <div class="account-controll-item" @click="handleNavigate(null)">
                <div class="account-controll-item-icon">
                    <i class="pi pi-cog" style="color: #10b981"></i>
                </div>
                <div class="account-controll-item-content">
                    <p>Cài đặt</p>
                </div>
            </div>
            <div class="account-controll-item" @click="handleNavigate(null)">
                <div class="account-controll-item-icon">
                    <i class="pi pi-inbox" style="color: #10b981"></i>
                </div>
                <div class="account-controll-item-content">
                    <p>Tin nhắn</p>
                </div>
            </div>
        </div>
        <template #footer>
            <div>
                <div
                    class="account-controll-item logout-item"
                    @click="handleLogout"
                >
                    <div class="account-controll-item-icon">
                        <i class="pi pi-sign-out" style="color: #ef4444"></i>
                    </div>
                    <div class="account-controll-item-content">
                        <p>Đăng xuất</p>
                    </div>
                </div>
            </div>
        </template>
    </Drawer>
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
                                đã đánh hồ sơ ứng tuyển của bạn cho công việc
                                <span style="font-family: Roboto-Bold"
                                    >Nhân Viên Kế Toán Thuế - 2 Năm Kinh
                                    Nghiệm</span
                                > là:
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
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Consectetur,
                        adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel value="2">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio. Nam libero tempore, cum
                        soluta nobis est eligendi optio cumque nihil impedit quo
                        minus.
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Drawer>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/counter";
import { useToast } from "primevue/usetoast";
import authservice from "@/services/authservice";

const setLoading = inject("setLoading");

const toast = useToast();

const authContext = useUserStore();

const router = useRouter();

const visible = ref(false);
const visibleNotification = ref(false);

const handleOpenNotification = () => {
    visibleNotification.value = true;
};

const handleNavigate = (name) => {
    if (name) {
        visible.value = false;
        router.push({ name: name });
    } else {
        toast.add({
            severity: "warn",
            summary: "Không khả dụng",
            detail: "Chức năng đang trong quá trinh phát triển",
            life: 3000,
        });
    }
};

const handleLogout = async () => {
    setLoading(true);
    await authservice.signOut();
    router.push({ name: "main" });
    authContext.user = null;
    visible.value = false;
    setLoading(false);
};

const itemContext = ref([
    {
        label: "Tìm việc làm",
        command: () => {
            router.push({ name: "recruiter-search" });
        },
    },
    {
        label: "Danh sách công ty",
        command: () => {
            router.push({ name: "list-company" });
        },
    },
    {
        label: "Đăng tuyển ngay tại đây",
        command: () => {
            router.push({ name: "recruiter-sign-in" });
        },
    },
]);
</script>

<style scoped>
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

.nav-bar-container {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
}

.nav-bar-container .avatar {
    cursor: pointer;
}

.account-controll-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.account-controll-body {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.account-controll-item {
    width: 100%;
    padding: 14px;
    display: flex;
    align-items: center;
    border: 1px #e2e8f0 solid;
    border-radius: 8px;
    gap: 14px;
    cursor: pointer;
}

.logout-item {
    color: #ef4444;
}

.account-controll-item:hover {
    background-color: #f1f5f9;
}

.account-controll-item .account-controll-item-content p {
    font-family: Roboto-Medium;
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
    /* background-color: #f8f9fa; */
}
</style>
