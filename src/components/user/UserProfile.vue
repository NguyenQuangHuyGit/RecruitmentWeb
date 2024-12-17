<template>
    <div class="user-profile-container">
        <div class="user-main-infor">
            <div class="avatar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    class="ProfilePicture_userPlaceholder__YbFoJ"
                    viewBox="0 0 30 30"
                >
                    <path
                        d="M15 3a6 6 0 00-6 6v1a6 6 0 1012 0V9a6 6 0 00-6-6zm-.002 16c-4.006 0-9.146 2.167-10.625 4.09C3.459 24.279 4.329 26 5.828 26H24.17c1.499 0 2.369-1.721 1.455-2.91C24.146 21.168 19.004 19 14.998 19z"
                    ></path>
                </svg>
            </div>
            <div class="content">
                <div style="font-family: Roboto-Medium; font-size: 1.5em">
                    Nguyễn Quang Huy
                </div>
                <div style="font-size: 0.9em">
                    INTERN DEVELOPER - 1 năm kinh nghiệm
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                    <svg
                        fill="#000000"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"
                        />
                    </svg>
                    <p>nguyenquanghuy@gmail.com</p>
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                    <svg
                        width="18px"
                        height="18px"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
                            fill="#000000"
                        />
                    </svg>
                    <p>5C Bảo Linh, Phúc Tân, Hoàn Kiếm, Hà Nội</p>
                </div>
                <div
                    class="user-main-infor-control"
                    v-tooltip.top="'Chỉnh sửa'"
                >
                    <i
                        class="pi pi-pencil"
                        style="font-size: 1rem; color: #767676"
                    ></i>
                </div>
            </div>
        </div>
        <div class="suitable-recruit">
            <div style="font-family: Roboto-Medium; font-size: 1.5em">
                Công việc mong muốn
            </div>
            <div class="suitable-recruit-content">
                <div class="suitable-recruit-item">
                    <p>Địa điểm làm việc mong muốn</p>
                    <p>Hà Nội</p>
                </div>
                <div class="suitable-recruit-item">
                    <p>Lĩnh vực yêu thích</p>
                    <p>Marketing</p>
                </div>
                <div class="suitable-recruit-item">
                    <p>Mức lương mong muốn (USD / tháng)</p>
                    <p>1000</p>
                </div>
            </div>
            <div class="suitable-recruit-control" v-tooltip.top="'Chỉnh sửa'">
                <i
                    class="pi pi-pencil"
                    style="font-size: 1rem; color: #767676"
                ></i>
            </div>
        </div>
        <div class="config-account">
            <div style="font-family: Roboto-Medium; font-size: 1.5em">
                Quản lý tài khoản
            </div>
            <div class="config-account-content">
                <p>Email đăng nhập:</p>
                <p>nguyenquanghuy@gmail.com</p>
            </div>
            <div
                class="config-account-control"
                @click="toggle($event)"
                :class="[iShowMenu ? 'active' : '']"
                v-tooltip.top="'Tùy chọn'"
            >
                <i
                    class="pi pi-ellipsis-v"
                    style="font-size: 1rem; color: #767676"
                ></i>
                <Menu ref="menuConfigAccount" :model="items" :popup="true" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTemplateRef, ref, computed } from "vue";

const menuConfigAccount = useTemplateRef("menuConfigAccount");
const items = ref([
    {
        label: "Cập nhật email đăng nhập",
    },
    {
        label: "Thay đổi mật khẩu",
    },
]);

const iShowMenu = computed(() => {
    return menuConfigAccount.value ? menuConfigAccount.value.focused : false;
});

const toggle = (event) => {
    menuConfigAccount.value.toggle(event);
    console.log(menuConfigAccount.value);
};
</script>

<style>
.user-profile-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background-color: #f1f2f4;
    border-radius: 8px;
}

.user-profile-container .user-main-infor {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    padding: 10px;
    gap: 10px;
    position: relative;
}

.user-profile-container .user-main-infor .avatar {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-profile-container .user-main-infor .avatar svg {
    fill: #eee;
}

.user-profile-container .user-main-infor .content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 0;
}

.user-profile-container .user-main-infor-control {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    padding: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .user-main-infor:hover .user-main-infor-control {
    display: flex;
}

.user-profile-container .user-main-infor .user-main-infor-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .user-main-infor .user-main-infor-control:active {
    background-color: #ededed;
}

.user-profile-container .suitable-recruit .suitable-recruit-control {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    padding: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .suitable-recruit:hover .suitable-recruit-control {
    display: flex;
}

.user-profile-container .suitable-recruit .suitable-recruit-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .suitable-recruit .suitable-recruit-control:active {
    background-color: #ededed;
}

.user-profile-container .suitable-recruit {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

.user-profile-container .suitable-recruit .suitable-recruit-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item {
    display: flex;
    gap: 10px;
    align-items: center;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item
    p:first-child {
    width: max-content;
    min-width: 250px;
    color: #767676;
    font-size: 0.9em;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item
    p:last-child {
    flex: 1;
}

.user-profile-container .config-account {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

.user-profile-container .config-account .config-account-content {
    display: flex;
    gap: 10px;
    align-items: center;
}

.user-profile-container .config-account .config-account-content p:first-child {
    width: max-content;
    color: #767676;
    font-size: 0.9em;
}

.user-profile-container .config-account .config-account-control {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: none;
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .config-account:hover .config-account-control {
    display: flex;
}

.user-profile-container .config-account .config-account-control.active {
    display: flex;
}

.user-profile-container .config-account .config-account-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .config-account .config-account-control:active {
    background-color: #ededed;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
