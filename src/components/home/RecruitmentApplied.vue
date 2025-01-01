<template>
    <div class="recruitment-applied-container">
        <aside class="recruitment-applied-left">
            <div class="account-info">
                <div
                    style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        cursor: pointer;
                    "
                    v-tooltip.top="'Đăng xuất'"
                >
                    <i class="pi pi-sign-out" style="color: #ffffff"></i>
                </div>
                <div class="avatar">
                    <img
                        :src="authContext.user.avatarPath"
                        alt=""
                        v-if="authContext.user && authContext.user.avatarPath"
                    />
                    <svg
                        v-else
                        width="90"
                        height="90"
                        viewBox="0 0 110 110"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="10"
                            y="10"
                            width="90"
                            height="90"
                            rx="45"
                            fill="#E6EFFF"
                        ></rect>
                        <path
                            d="M55.9759 54.1993C62.3237 54.1993 67.8409 48.5041 67.8409 41.0884C67.8409 33.7618 62.3237 28.3335 55.9759 28.3335C49.6281 28.3335 44.1109 33.8804 44.1109 41.1477C44.1109 48.5041 49.5984 54.1993 55.9759 54.1993ZM37.3181 81.6668H74.5743C79.261 81.6668 80.9221 80.332 80.9221 77.7217C80.9221 70.0688 71.3411 59.5089 55.9462 59.5089C40.581 59.5089 31 70.0688 31 77.7217C31 80.332 32.6611 81.6668 37.3181 81.6668Z"
                            fill="#CCDEFF"
                        ></path>
                    </svg>
                </div>
                <div class="user-info">
                    <p style="font-family: Roboto-Bold; font-size: 1.1em">
                        {{ authContext.user && authContext.user.fullName }}
                    </p>
                    <p style="font-size: 0.8em">
                        {{
                            authContext.user &&
                            authContext.user.position &&
                            authContext.user.position.toUpperCase()
                        }}
                    </p>
                </div>
            </div>
            <div class="nav-list">
                <router-link
                    style="text-decoration: none; color: #000"
                    :to="{ name: 'user-profile' }"
                >
                    <div class="nav-item">
                        <div>
                            <i class="pi pi-user" style="color: #708090"></i>
                        </div>
                        <p>Hồ sơ của tôi</p>
                    </div>
                </router-link>
                <router-link
                    style="text-decoration: none; color: #000"
                    :to="{ name: 'user-job' }"
                >
                    <div class="nav-item">
                        <div>
                            <i
                                class="pi pi-briefcase"
                                style="color: #708090"
                            ></i>
                        </div>
                        <p>Công việc của tôi</p>
                    </div>
                </router-link>
            </div>
        </aside>
        <main class="recruitment-applied-center">
            <RouterView name="user-profile" />
        </main>
        <aside class="recruitment-applied-right">
            <p style="font-family: Roboto-Medium; font-size: 1.3em">
                Công việc phù hợp với bạn
            </p>
            <div class="recruitment-related-list">
                <div class="recruitment-related-item">
                    <div class="company-avatar">
                        <img
                            src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                            alt="Ảnh công ty"
                        />
                    </div>
                    <div class="recruitment-info">
                        <div
                            style="
                                width: 100%;
                                font-family: Roboto-Medium;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                text-wrap: nowrap;
                                font-size: 1.1em;
                            "
                        >
                            Mobile Developer
                        </div>
                        <div
                            style="
                                width: 100%;
                                text-overflow: ellipsis;
                                color: rgb(119, 119, 119);
                                font-size: 0.9em;
                                overflow: hidden;
                                white-space: nowrap;
                                text-wrap: nowrap;
                                transform: 0.25s;
                            "
                        >
                            Công ty TNHH GMO-Z
                        </div>
                        <div style="font-family: Roboto-Medium">
                            Thương lượng
                        </div>
                        <div>Hà Nội</div>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { useTemplateRef, ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/counter";

const authContext = useUserStore();
const router = useRouter();
const setLoading = inject("setLoading");
</script>

<style>
.recruitment-applied-container {
    display: flex;
    padding: 20px 20px;
    background-color: #f8f9fa;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
    height: max-content;
    min-height: calc(100vh - 50px);
}

.recruitment-applied-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: max-content;
    min-width: 20%;
    height: max-content;
    min-height: 100%;
    animation: slideInLeft 1s ease forwards;
}

.recruitment-applied-left .account-info {
    width: max-content;
    position: relative;
    border-radius: 8px;
    padding: 20px 40px 20px 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    align-items: center;
    background: #50c9c3;
    background: -webkit-linear-gradient(to right, #96deda, #50c9c3);
    background: linear-gradient(to right, #96deda, #50c9c3);
}

.recruitment-applied-left .account-info .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
}

.recruitment-applied-left .account-info .avatar img {
    position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
}

.recruitment-applied-left .account-info .user-info {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    padding: 0 5px;
}

.recruitment-applied-left .nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: max-content;
}

.recruitment-applied-left .nav-list .nav-item {
    height: 60px;
    padding: 10px 20px;
    widows: 100%;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
}

.router-link-active.router-link-exact-active .nav-item p {
    font-family: Roboto-Bold;
}

.recruitment-applied-left .nav-list .nav-item:hover {
    border: 1px solid #a4e4cf;
    background-color: #edfbf5;
}

.recruitment-applied-center {
    flex: 1;
    width: 50%;
    border-radius: 8px;
    height: fit-content;
    animation: slideInDown 1s ease forwards;
}

.recruitment-applied-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 22%;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    height: max-content;
    animation: slideInRight 1s ease forwards;
}

.recruitment-applied-right .recruitment-related-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recruitment-applied-right .recruitment-related-list .recruitment-related-item {
    display: flex;
    gap: 10px;
    padding: 10px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
}

.recruitment-applied-right
    .recruitment-related-list
    .recruitment-related-item:hover {
    border: 1px solid #a4e4cf;
    background-color: #edfbf5;
}

.recruitment-applied-right
    .recruitment-related-list
    .recruitment-related-item:hover
    .recruitment-info
    div:first-child {
    color: #31c593;
}

.recruitment-applied-right
    .recruitment-related-list
    .recruitment-related-item
    .company-avatar {
    background-color: white;
    border-radius: 12px;
    width: 86px;
    height: 86px;
    padding: 4px;
    flex: 0 0 86px;
    outline: 1px solid #e9eaec;
}

.recruitment-applied-right
    .recruitment-related-list
    .recruitment-related-item
    .company-avatar
    img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: contain;
}

.recruitment-applied-right
    .recruitment-related-list
    .recruitment-related-item
    .recruitment-info {
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
