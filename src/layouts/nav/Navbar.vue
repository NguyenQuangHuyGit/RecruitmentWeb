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
                    <Button
                        v-if="!authContext.isAuthenticated"
                        label="Đăng tuyển ngay"
                        severity="contrast"
                        @click="$router.push({ name: 'recruiter-sign-in' })"
                    />
                    <div class="notification" v-if="authContext.isAuthenticated">
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
                <p>Nguyễn Quang Huy</p>
                <p>Mã ứng viên: <span>#27042002</span></p>
                <p>nguyenquanghuy27042002@gmail.com</p>
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
                <div class="account-controll-item logout-item">
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/counter";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const authContext = useUserStore();

const router = useRouter();

const visible = ref(false);

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
</style>
