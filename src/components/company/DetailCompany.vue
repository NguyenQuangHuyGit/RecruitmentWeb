<template>
    <div class="detail-company-container">
        <div class="detail-company-header">
            <div class="detail-company-bgi">
                <img
                    :src="company?.backGroundImagePath"
                    class="cp_herro_banner_image"
                    alt="Ảnh đại diện"
                />
            </div>
            <div class="detail-company-info">
                <div class="detail-company-logo">
                    <img :src="company?.imagePath" alt="Ảnh đại diện" />
                </div>
                <div class="detail-info">
                    <p style="font-family: Roboto-Medium; font-size: 1.5em">
                        {{ company?.name }}
                    </p>
                    <div style="display: flex; gap: 10px; align-items: center">
                        <p>{{ company?.provinceName }}</p>
                        <p>|</p>
                        <a
                            class="link-website"
                            :href="company?.linkWebsite"
                            style="text-decoration: none; font-size: 0.9em"
                            target="_blank"
                            >{{ company?.linkWebsite }}</a
                        >
                    </div>
                    <p>{{ company?.companyField }}</p>
                </div>
            </div>
        </div>
        <div class="detail-company-main">
            <div class="detail-main-left">
                <div class="detail-company-about">
                    <p class="detail-company-about-header">
                        Giới thiệu về công ty
                    </p>
                    <p style="padding: 0 20px">
                        {{ company?.aboutCompany }}
                    </p>
                </div>
                <div class="recruitment-company">
                    <p class="recruitment-company-header">
                        Công ty đang tuyển dụng
                    </p>
                    <div class="recruitment-company-list" v-if="recruitmentData && recruitmentData.length > 0">
                        <div
                            class="recruitment-company-item"
                            :key="item.id"
                            v-for="(item, index) in recruitmentData"
                            @click="handleChooseItem(item)"
                        >
                            <div
                                class="recruitment-company-item-save-btn"
                                v-tooltip.top="'Lưu tin tuyển dụng'"
                                @click.stop="handleSaveRecruiment(item, index)"
                            >
                                <i
                                    v-if="item.isSaveByUser"
                                    class="pi pi-heart-fill"
                                    style="color: #31c593; font-size: 1.5rem"
                                ></i>
                                <i
                                    v-else
                                    class="pi pi-heart"
                                    style="color: #31c593; font-size: 1.5rem"
                                ></i>
                            </div>
                            <div class="recruiment-image">
                                <img
                                    :src="company?.imagePath"
                                    alt="Ảnh công ty"
                                />
                            </div>
                            <div class="recruitment-infomation">
                                <div
                                    style="
                                        font-family: Roboto-Medium;
                                        font-size: 1.2em;
                                        text-wrap: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    "
                                    class="recruitment-name"
                                >
                                    {{ item.title }}
                                </div>
                                <div>
                                    <span style="font-family: Roboto-Medium">{{
                                        handleSalaryData(item)
                                    }}</span>
                                    |
                                    <span
                                        style="
                                            font-size: 0.9em;
                                            font-family: Roboto;
                                        "
                                    >
                                        {{ handleProvinceData(item) }}</span
                                    >
                                </div>
                                <div>
                                    Ngày đăng:
                                    {{
                                        Common.formatDate(item.createdDate)
                                            .result
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-main-right">
                <p class="detail-main-right-header">Thông tin liên hệ</p>
                <div class="address-company">
                    <p>Địa chỉ công ty:</p>
                    <p style="color: #555">
                        {{ company?.address }}
                    </p>
                </div>
                <div class="google-map-container">
                    <p>Hiện thị trên bản đồ:</p>
                    <div class="google-map"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onBeforeMount } from "vue";
const setLoading = inject("setLoading");
import RecruitmentService from "@/services/recruitmentservice.js";
import companyservice from "@/services/companyservice";
import Common from "@/helper/common.js";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const recruitmentData = ref([]);
const toast = useToast();

const company = ref();

const props = defineProps({
    id: String,
});

onBeforeMount(async () => {
    setLoading(true);
    var companyRes = await companyservice.getById(props.id);
    company.value = { ...companyRes };
    var recruitmentRes = await RecruitmentService.getByCompanyId(props.id);
    recruitmentData.value = [...recruitmentRes];
    setLoading(false);
});

const handleSalaryData = (data) => {
    var currency = data.moneyType === 0 ? "VNĐ" : "USD";
    if (data.salaryType === 0) {
        return "Thỏa thuận";
    } else if (data.salaryType === 1) {
        return `${Common.formatNumberWithDots(
            data.fromSalary
        )} - ${Common.formatNumberWithDots(data.toSalary)} ${currency}`;
    } else {
        return `${Common.formatNumberWithDots(data.fromSalary)} ${currency}`;
    }
};

const handleProvinceData = (data) => {
    if (data.isDifferentAddess) {
        return data.company.provinceName;
    } else {
        return data.provinceName;
    }
};

const handleChooseItem = (data) => {
    router.push({ name: "recruiter-detail", params: { id: data.id } });
};

const handleSaveRecruiment = async (data, index) => {
    await RecruitmentService.saveRecruitment(data.id);
    recruitmentData.value[index].isSaveByUser = !data.isSaveByUser;
    if (data.isSaveByUser) {
        toast.add({
            severity: "success",
            summary: "Lưu tin thành công",
            detail: "Truy cập: Việc làm của bạn >> Công việc của tôi >> Việc đã lưu để xem danh sách",
            life: 3000,
        });
    }
};
</script>

<style>
.detail-company-container {
    background-color: #f9f9fa;
    padding: 20px 180px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: max-content;
    min-height: calc(100vh - 50px);
}

.detail-company-header {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.detail-company-header .detail-company-bgi {
    width: 100%;
    border-radius: 8px;
}

.detail-company-header .detail-company-bgi img {
    width: 100%;
    border: 0;
    vertical-align: middle;
    border-radius: 8px;
}

.detail-company-info {
    display: flex;
    gap: 10px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
}

.detail-company-info .detail-company-logo {
    position: relative;
    width: 170px;
    height: 85px;
    background-color: #fff;
    position: relative;
    text-align: center;
    line-height: 80px;
}

.detail-company-info .detail-company-logo img {
    max-width: 100%;
    max-height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    vertical-align: middle;
    margin: auto;
}

.detail-company-info .detail-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
}

.detail-company-main {
    display: flex;
    gap: 20px;
    width: 100%;
}

.detail-company-main .detail-main-left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 67%;
}

.detail-company-main .detail-main-left .detail-company-about {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 0 20px 0;
    height: 25em;
    overflow: hidden;
}

.detail-company-about-header {
    font-family: Roboto-Medium;
    font-size: 1.3em;
    background: #50c9c3;
    background: -webkit-linear-gradient(to left, #96deda, #50c9c3);
    background: linear-gradient(to left, #96deda, #50c9c3);
    padding: 20px 20px;
    border-radius: 8px 8px 0 0;
    color: #fff;
}

.detail-company-main .detail-main-right {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 0 20px 0;
    height: max-content;
    flex: 1;
}

.detail-main-right-header {
    font-family: Roboto-Medium;
    font-size: 1.3em;
    background: #50c9c3;
    background: -webkit-linear-gradient(to left, #96deda, #50c9c3);
    background: linear-gradient(to left, #96deda, #50c9c3);
    padding: 20px 20px;
    border-radius: 8px 8px 0 0;
    color: #fff;
}

.detail-company-main .detail-main-right .address-company {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.detail-company-main .detail-main-right .google-map-container {
    padding: 0 20px;
    height: max-content;
}

.detail-company-main .detail-main-right .google-map {
    margin-top: 8px;
    width: 100%;
    height: 300px;
    background-color: #eee;
}

/* ------------------------------------------------------------- */

.recruitment-company {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 0 20px 0;
    background-color: #fff;
    border-radius: 8px;
}

.recruitment-company-header {
    font-family: Roboto-Medium;
    font-size: 1.3em;
    background: #50c9c3;
    background: -webkit-linear-gradient(to left, #96deda, #50c9c3);
    background: linear-gradient(to left, #96deda, #50c9c3);
    padding: 20px 20px;
    border-radius: 8px 8px 0 0;
    color: #fff;
}

.recruitment-company .recruitment-company-list {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
}

.recruitment-company .recruitment-company-list .recruitment-company-item {
    height: max-content;
    background-color: #fff;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #31c593;
    background-color: #f0fdf9;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;
    position: relative;
    overflow: hidden;
    padding-right: 50px;
    box-sizing: border-box;
}

.recruitment-company .recruitment-company-list .recruitment-company-item:hover {
    background-color: #fafffd;
}

.recruitment-company
    .recruitment-company-list
    .recruitment-company-item
    .recruiment-image {
    width: 110px;
    height: 110px;
    padding: 4px;
    margin: auto;
    border-radius: 12px;
    background-color: #fff;
}

.recruitment-company
    .recruitment-company-list
    .recruitment-company-item
    .recruiment-image
    img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

.recruitment-company
    .recruitment-company-list
    .recruitment-company-item
    .recruitment-infomation {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 20px;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.recruitment-company
    .recruitment-company-list
    .recruitment-company-item:hover
    .recruitment-infomation
    .recruitment-name {
    color: #31c593;
}

.recruitment-company
    .recruitment-company-list
    .recruitment-company-item:hover
    .recruiment-image {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
}

.recruitment-company-item-save-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.recruitment-company-item-save-btn:hover {
    background-color: #ebfff8;
}

.link-website {
    color: #000;
}

.link-website:hover {
    color: #31c593;
}
</style>
