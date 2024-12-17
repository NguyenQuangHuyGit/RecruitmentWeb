<template>
    <div class="nav-bar-container">
        <Menubar :model="items" class="justify-end">
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
                <div class="flex gap-1 justify-center">
                    <Button
                        label="Đăng nhập"
                        @click="
                            $router.push({
                                name: 'user-auth',
                                query: { isSignIn: true },
                            })
                        "
                    />
                    <Button
                        label="Đăng ký"
                        @click="$router.push({ name: 'user-auth' })"
                    />
                    <Button
                        label="Đăng tuyển ngay"
                        severity="contrast"
                        @click="$router.push({ name: 'recruiter-sign-in' })"
                    />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const items = ref([
    {
        label: "Việc làm",
        items: [
            {
                label: "Tìm việc làm",
                icon: "pi pi-bolt",
                command: () => {
                    router.push({ name: "recruiter-search" });
                },
            },
            {
                label: "Việc làm đã lưu",
                icon: "pi pi-server",
                command: () => {
                    router.push({ name: "user-job" });
                },
            },
            {
                separator: true,
            },
            {
                label: "Việc làm đã ứng tuyển",
                icon: "pi pi-pencil",
                command: () => {
                    router.push({ name: "user-job" });
                },
            },
        ],
    },
    {
        label: "Đăng tuyển ngay",
    },
]);
</script>

<style>
.nav-bar-container {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
}
</style>
