<template>
    <div class="recruit-detail-container">
        <div class="col col-1">
            <div class="row recruitment-title">
                <h2>{{ data.title }}</h2>
                <div>
                    <p style="font-family: Roboto-Bold">
                        Mức lương: {{ handleSalaryData() }}
                    </p>
                </div>
                <div class="recruitment-more-info">
                    <Tag
                        :value="`Hạn nộp hồ sơ: ${
                            Common.formatDate(data.expiredDate).result
                        }`"
                        severity="secondary"
                        rounded
                    ></Tag>
                    <Tag
                        v-if="data.provinceName || data.company?.provinceName"
                        :value="`Địa điểm: ${handleProvinceData()}`"
                        severity="secondary"
                        rounded
                    ></Tag>
                    <Tag
                        :value="`Kinh nghiệm: ${handleExperienceData()}`"
                        severity="secondary"
                        rounded
                    ></Tag>
                </div>
                <div class="recruitment-control">
                    <Button
                        v-if="checkExpiredRecruitment()"
                        label="Nộp đơn ứng tuyển"
                        icon="pi pi-send"
                        style="width: 85%"
                        @click="handleBeforeAppy"
                    />
                    <Button
                        v-else
                        label="Hết hạn ứng tuyển"
                        icon="pi pi-ban"
                        style="width: 85%"
                        disabled
                    />
                    <Button
                        v-if="!data.isSaveByUser"
                        label="Lưu tin"
                        icon="pi pi-heart"
                        style="width: 20%"
                        @click="handleSaveRecruitment"
                    />
                    <Button
                        v-else
                        label="Bỏ lưu tin"
                        outlined
                        style="width: 20%"
                        @click="handleSaveRecruitment"
                    />
                </div>
            </div>
            <div class="row recruitment-detail" ref="detail"></div>
        </div>
        <div class="col col-2">
            <div class="row company-info">
                <div class="bg-image">
                    <img
                        :src="
                            data.company ? data.company.backGroundImagePath : ''
                        "
                        alt="Ảnh nền"
                    />
                    <div class="company-image">
                        <img
                            :src="data.company ? data.company.imagePath : ''"
                            alt="Ảnh đại diện"
                        />
                    </div>
                </div>
                <div class="company-detail-info">
                    <div
                        style="
                            font-family: Roboto-Medium;
                            font-size: 1.1em;
                            text-align: center;
                        "
                    >
                        {{
                            data.company ? data.company.name.toUpperCase() : ""
                        }}
                    </div>
                    <div style="display: flex; gap: 16px">
                        <p
                            style="
                                color: #7f878f;
                                width: 60px;
                                font-size: 0.9em;
                            "
                        >
                            Lĩnh vực:
                        </p>
                        <p style="font-size: 0.9em; flex: 1">
                            {{ data.fieldName }}
                        </p>
                    </div>
                    <div style="display: flex; gap: 16px">
                        <p
                            style="
                                color: #7f878f;
                                width: 60px;
                                font-size: 0.9em;
                            "
                        >
                            Địa chỉ:
                        </p>
                        <p style="font-size: 0.9em; flex: 1">
                            Symphony Building, Chu Huy Man Street, Hanoi,
                            Vietnam
                        </p>
                    </div>
                    <div style="display: flex; gap: 16px">
                        <p
                            style="
                                color: #7f878f;
                                width: 60px;
                                font-size: 0.9em;
                            "
                        >
                            Quy mô:
                        </p>
                        <p style="font-size: 0.9em; flex: 1">
                            10.000 - 19.999 nhân viên
                        </p>
                    </div>
                </div>
            </div>
            <div class="row google-map-container">
                <GoogleMap
                    :api-key="apiKey"
                    style="width: 100%; height: 100%"
                    :center="center"
                    :zoom="15"
                >
                    <Marker :options="{ position: center }" />
                </GoogleMap>
            </div>
            <div class="row recruiment-second-info">
                <p style="font-family: Roboto-Medium; font-size: 1.3em">
                    Thông tin chung
                </p>
                <div class="recruiment-second-info-item">
                    <div class="item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M17.81 5.49V6.23L14.27 4.18C12.93 3.41 11.06 3.41 9.73 4.18L6.19 6.24V5.49C6.19 3.24 7.42 2 9.67 2H14.33C16.58 2 17.81 3.24 17.81 5.49Z"
                                fill="white"
                            ></path>
                            <path
                                d="M17.84 7.96999L17.7 7.89999L16.34 7.11999L13.52 5.48999C12.66 4.98999 11.34 4.98999 10.48 5.48999L7.66 7.10999L6.3 7.90999L6.12 7.99999C4.37 9.17999 4.25 9.39999 4.25 11.29V15.81C4.25 17.7 4.37 17.92 6.16 19.13L10.48 21.62C10.91 21.88 11.45 21.99 12 21.99C12.54 21.99 13.09 21.87 13.52 21.62L17.88 19.1C19.64 17.92 19.75 17.71 19.75 15.81V11.29C19.75 9.39999 19.63 9.17999 17.84 7.96999ZM14.79 13.5L14.18 14.25C14.08 14.36 14.01 14.57 14.02 14.72L14.08 15.68C14.12 16.27 13.7 16.57 13.15 16.36L12.26 16C12.12 15.95 11.89 15.95 11.75 16L10.86 16.35C10.31 16.57 9.89 16.26 9.93 15.67L9.99 14.71C10 14.56 9.93 14.35 9.83 14.24L9.21 13.5C8.83 13.05 9 12.55 9.57 12.4L10.5 12.16C10.65 12.12 10.82 11.98 10.9 11.86L11.42 11.06C11.74 10.56 12.25 10.56 12.58 11.06L13.1 11.86C13.18 11.99 13.36 12.12 13.5 12.16L14.43 12.4C15 12.55 15.17 13.05 14.79 13.5Z"
                                fill="white"
                            ></path>
                        </svg>
                    </div>
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            justify-content: space-around;
                        "
                    >
                        <p style="color: #4d5965">Cấp bậc</p>
                        <p style="font-family: Roboto-Medium; font-size: 0.9em">
                            {{ handleLevelData() }}
                        </p>
                    </div>
                </div>
                <div class="recruiment-second-info-item">
                    <div class="item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M17.39 15.67L13.35 12H10.64L6.59998 15.67C5.46998 16.69 5.09998 18.26 5.64998 19.68C6.19998 21.09 7.53998 22 9.04998 22H14.94C16.46 22 17.79 21.09 18.34 19.68C18.89 18.26 18.52 16.69 17.39 15.67ZM13.82 18.14H10.18C9.79998 18.14 9.49998 17.83 9.49998 17.46C9.49998 17.09 9.80998 16.78 10.18 16.78H13.82C14.2 16.78 14.5 17.09 14.5 17.46C14.5 17.83 14.19 18.14 13.82 18.14Z"
                                fill="white"
                            ></path>
                            <path
                                d="M18.35 4.32C17.8 2.91 16.46 2 14.95 2H9.04998C7.53998 2 6.19998 2.91 5.64998 4.32C5.10998 5.74 5.47998 7.31 6.60998 8.33L10.65 12H13.36L17.4 8.33C18.52 7.31 18.89 5.74 18.35 4.32ZM13.82 7.23H10.18C9.79998 7.23 9.49998 6.92 9.49998 6.55C9.49998 6.18 9.80998 5.87 10.18 5.87H13.82C14.2 5.87 14.5 6.18 14.5 6.55C14.5 6.92 14.19 7.23 13.82 7.23Z"
                                fill="white"
                            ></path>
                        </svg>
                    </div>
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            justify-content: space-around;
                        "
                    >
                        <p style="color: #4d5965">Kinh nghiệm</p>
                        <p style="font-family: Roboto-Medium; font-size: 0.9em">
                            {{ handleExperienceData() }}
                        </p>
                    </div>
                </div>
                <div class="recruiment-second-info-item">
                    <div class="item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                                fill="white"
                            ></path>
                            <path
                                d="M14.08 14.15C11.29 12.29 6.74002 12.29 3.93002 14.15C2.66002 15 1.96002 16.15 1.96002 17.38C1.96002 18.61 2.66002 19.75 3.92002 20.59C5.32002 21.53 7.16002 22 9.00002 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
                                fill="white"
                            ></path>
                            <path
                                d="M19.99 7.34001C20.15 9.28001 18.77 10.98 16.86 11.21C16.85 11.21 16.85 11.21 16.84 11.21H16.81C16.75 11.21 16.69 11.21 16.64 11.23C15.67 11.28 14.78 10.97 14.11 10.4C15.14 9.48001 15.73 8.10001 15.61 6.60001C15.54 5.79001 15.26 5.05001 14.84 4.42001C15.22 4.23001 15.66 4.11001 16.11 4.07001C18.07 3.90001 19.82 5.36001 19.99 7.34001Z"
                                fill="white"
                            ></path>
                            <path
                                d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
                                fill="white"
                            ></path>
                        </svg>
                    </div>
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            justify-content: space-around;
                        "
                    >
                        <p style="color: #4d5965">Số lượng tuyển</p>
                        <p style="font-family: Roboto-Medium; font-size: 0.9em">
                            {{ data.recruitNumber }} người
                        </p>
                    </div>
                </div>
                <div class="recruiment-second-info-item">
                    <div class="item-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21.09 6.98002C20.24 6.04002 18.82 5.57002 16.76 5.57002H16.52V5.53002C16.52 3.85002 16.52 1.77002 12.76 1.77002H11.24C7.47998 1.77002 7.47998 3.86002 7.47998 5.53002V5.58002H7.23998C5.16998 5.58002 3.75998 6.05002 2.90998 6.99002C1.91998 8.09002 1.94998 9.57002 2.04998 10.58L2.05998 10.65L2.13743 11.4633C2.1517 11.6131 2.23236 11.7484 2.35825 11.8307C2.59806 11.9877 2.9994 12.2464 3.23998 12.38C3.37998 12.47 3.52998 12.55 3.67998 12.63C5.38998 13.57 7.26998 14.2 9.17998 14.51C9.26998 15.45 9.67998 16.55 11.87 16.55C14.06 16.55 14.49 15.46 14.56 14.49C16.6 14.16 18.57 13.45 20.35 12.41C20.41 12.38 20.45 12.35 20.5 12.32C20.8967 12.0958 21.3083 11.8195 21.6834 11.5489C21.7965 11.4673 21.8687 11.3413 21.8841 11.2028L21.9 11.06L21.95 10.59C21.96 10.53 21.96 10.48 21.97 10.41C22.05 9.40002 22.03 8.02002 21.09 6.98002ZM13.09 13.83C13.09 14.89 13.09 15.05 11.86 15.05C10.63 15.05 10.63 14.86 10.63 13.84V12.58H13.09V13.83ZM8.90998 5.57002V5.53002C8.90998 3.83002 8.90998 3.20002 11.24 3.20002H12.76C15.09 3.20002 15.09 3.84002 15.09 5.53002V5.58002H8.90998V5.57002Z"
                                fill="white"
                            ></path>
                            <path
                                d="M20.8735 13.7342C21.2271 13.5659 21.6344 13.8462 21.599 14.2362L21.24 18.19C21.03 20.19 20.21 22.23 15.81 22.23H8.19003C3.79003 22.23 2.97003 20.19 2.76003 18.2L2.41932 14.4522C2.38427 14.0667 2.78223 13.7868 3.13487 13.9463C4.27428 14.4618 6.37742 15.3764 7.6766 15.7167C7.8409 15.7597 7.9738 15.8773 8.04574 16.0312C8.65271 17.3293 9.96914 18.02 11.87 18.02C13.7521 18.02 15.0852 17.3027 15.6942 16.0014C15.7662 15.8474 15.8992 15.7299 16.0636 15.6866C17.4432 15.3236 19.6818 14.3013 20.8735 13.7342Z"
                                fill="white"
                            ></path>
                        </svg>
                    </div>
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            justify-content: space-around;
                        "
                    >
                        <p style="color: #4d5965">Hình thức làm việc</p>
                        <p style="font-family: Roboto-Medium; font-size: 0.9em">
                            {{ handleTypeWorkingData() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog
        v-model:visible="isShowApplyConfirm"
        modal
        header="Hoàn thiện hồ sơ của bạn"
        :style="{ width: '30em' }"
    >
        <div style="display: flex; flex-direction: column; gap: 20px">
            <p style="font-family: Roboto-Medium; font-size: 1.1em">
                Chọn 1 CV để ứng tuyển:
            </p>
            <div class="cv-list-container" v-if="cvPaths && cvPaths.length > 0">
                <div
                    class="cv-list-item"
                    v-for="(item, index) in cvPaths"
                    :key="index"
                >
                    <RadioButton
                        v-model="selectedCv"
                        name="cv"
                        :value="item.path"
                    />
                    <label
                        v-tooltip.right="{
                            value: 'Nhấn để cem CV',
                            showDelay: 1000,
                        }"
                        ><a
                            :href="item.path"
                            style="text-decoration: none; color: #000"
                            target="_blank"
                            >{{ item.name }}</a
                        ></label
                    >
                </div>
            </div>
            <FloatLabel variant="in">
                <Textarea
                    v-model="introduce"
                    rows="5"
                    cols="30"
                    fluid
                    style="resize: none"
                />
                <label>Lời giới thiệu ngắn gọn với nhà tuyển dụng</label>
            </FloatLabel>
            <Message v-if="messageError" severity="warn" :life="3000"
                >Bạn phải chọn 1 CV để ứng tuyển</Message
            >
            <div style="display: flex; flex-direction: row-reverse">
                <Button label="Ứng tuyển" @click="handleApplyRecruit" />
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import {
    onBeforeMount,
    ref,
    useTemplateRef,
    inject,
    onBeforeUpdate,
} from "vue";
import RecruitmentService from "@/services/recruitmentservice.js";
import Common from "@/helper/common.js";
import { useUserStore } from "@/stores/counter";
import { useToast } from "primevue/usetoast";
import { GoogleMap, Marker } from "vue3-google-map";
import { AxiosError } from "axios";

const apiKey = "AIzaSyANyLPiyzlvtu0Isph5IYSv6AIWWclVKkU";
const center = { lat: 21.0029075, lng: 105.863402 };
const authContext = useUserStore();
const cvPaths = ref([]);
const selectedCv = ref("");
const introduce = ref("");
const messageError = ref(false);
const setLoading = inject("setLoading");
const isShowApplyConfirm = ref(false);
const toast = useToast();
const props = defineProps({
    id: String,
});

const data = ref({});
const detail = useTemplateRef("detail");

onBeforeMount(async () => {
    if (props.id) {
        setLoading(true);
        const response = await RecruitmentService.getById(props.id);
        data.value = { ...response };
        setLoading(false);
    }
});

onBeforeUpdate(() => {
    if (data.value.content && detail.value) {
        detail.value.innerHTML = "";
        const element = document.createElement("div");
        element.classList.add("content-container");
        element.innerHTML = `
            <p style="font-family: Roboto-Medium; font-size: 1.4em; margin-bottom: 20px;">Thông tin chi tiết tuyển dụng</p>
            <div class="content-detail">
                ${data.value.content}
            </div>
        `;
        detail.value.append(element);
    }
});

const handleBeforeAppy = () => {
    if (!authContext.user) {
        return false;
    }
    isShowApplyConfirm.value = true;
    const cvLists = authContext.user.cvPaths;
    cvPaths.value = [...cvLists];
};

const checkExpiredRecruitment = () => {
    const now = new Date();
    const utcNow = new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
        )
    );
    const expiredDate = new Date(data.value.expiredDate + "Z");
    if (expiredDate < utcNow) {
        return false;
    }
    return true;
};

const handleSaveRecruitment = async () => {
    await RecruitmentService.saveRecruitment(data.value.id);
    data.value.isSaveByUser = !data.value.isSaveByUser;
    if (data.value.isSaveByUser) {
        toast.add({
            severity: "success",
            summary: "Lưu tin thành công",
            detail: "Truy cập: Việc làm của bạn >> Công việc của tôi >> Việc đã lưu để xem danh sách",
            life: 3000,
        });
    }
};

const handleApplyRecruit = async () => {
    if (!selectedCv.value) {
        messageError.value = true;
        setTimeout(() => {
            messageError.value = false;
        }, 3000);
        return;
    }
    try {
        setLoading(true);
        const payload = {
            recruitmentId: data.value.id,
            introduce: introduce.value,
            cvApplyLink: selectedCv.value,
        };
        await RecruitmentService.createUserRecruitment(payload);
        toast.add({
            severity: "success",
            summary: "Thành công",
            detail: "Nộp đơn ứng tuyển thành công",
            life: 3000,
        });
    } catch (error) {
        if (error.status === 400) {
            toast.add({
                severity: "error",
                summary: "Thất bại",
                detail: error?.response?.data?.Message || "Lỗi nhập liệu",
                life: 3000,
            });
        } else {
            throw new AxiosError(error);
        }
    } finally {
        setLoading(false);
        isShowApplyConfirm.value = false;
    }
};

const handleSalaryData = () => {
    var currency = data.value.moneyType === 0 ? "VNĐ" : "USD";
    if (data.value.salaryType === 0) {
        return "Thỏa thuận";
    } else if (data.value.salaryType === 1) {
        return `${Common.formatNumberWithDots(
            data.value.fromSalary
        )} - ${Common.formatNumberWithDots(data.value.toSalary)} ${currency}`;
    } else {
        return `${Common.formatNumberWithDots(
            data.value.fromSalary
        )} ${currency}`;
    }
};

const handleTypeWorkingData = () => {
    switch (data.value.typeWorking) {
        case 0:
            return "Toàn thời gian";
        case 1:
            return "Bán thời gian";
        case 2:
            return "Trực tuyến / Online";
        default:
            return "Toàn thời gian";
    }
};

const handleLevelData = () => {
    switch (data.value.level) {
        case 0:
            return "Nhân viên";
        case 1:
            return "Quản lý";
        case 2:
            return "Trưởng phòng / Phó phòng";
        case 3:
            return "Giám đốc";
        default:
            return "Nhân viên";
    }
};

const handleProvinceData = () => {
    if (data.value.isDifferentAddess) {
        return data.value.company.provinceName;
    } else {
        return data.value.provinceName;
    }
};

const handleExperienceData = () => {
    if (data.value.experienceType === 0) {
        return "Không yêu cầu kinh nghiệm";
    } else {
        return `${data.value.experience} năm`;
    }
};
</script>

<style>
.recruit-detail-container {
    width: 100%;
    height: max-content;
    min-height: 100%;
    display: flex;
    gap: 20px;
    padding: 20px 200px;
    background-color: #f1f2f4;
}

.recruit-detail-container h2 {
    font-weight: normal;
    font-family: Roboto-Medium;
    font-size: 1.5em;
}

.recruit-detail-container .col-1 {
    width: 70%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    gap: 30px;
}

.recruitment-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 4px;
}

.recruitment-more-info {
    display: flex;
    gap: 20px;
    align-items: center;
}

.recruitment-control {
    display: flex;
    gap: 10px;
    align-items: center;
}

.recruitment-detail {
    height: 500px;
}

.recruit-detail-container .col-2 {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.company-info {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.recruit-detail-container .company-image {
    position: absolute;
    width: 100px;
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    top: 40px;
    left: calc(50% - 50px);
    background-color: #fff;
    border-radius: 8px;
}

.recruit-detail-container .bg-image {
    position: relative;
    width: 100%;
    z-index: 1;
    aspect-ratio: 64 / 17;
}

.recruit-detail-container .bg-image img {
    border-radius: 8px 8px 0 0;
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
    object-fit: contain;
}

.recruit-detail-container .company-detail-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px 30px 20px 30px;
    width: 100%;
}

.recruit-detail-container .company-image img {
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
    object-fit: contain;
}

.recruiment-second-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    height: max-content;
}

.recruiment-second-info-item {
    display: flex;
    gap: 20px;
    align-items: center;
}

.recruiment-second-info-item .item-icon {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #10b981;
    border-radius: 50%;
}

.content-container .content-detail {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.content-container .content-detail li {
    color: #333;
    font-size: 14px;
    line-height: 1.42857143;
}

.content-container .content-detail h1,
.content-container .content-detail h2,
.content-container .content-detail h3 {
    font-weight: normal;
    font-family: Roboto-Medium;
    line-height: 24px;
}

.google-map-container {
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
}

.cv-list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cv-list-container .cv-list-item {
    display: flex;
    gap: 10px;
    align-items: center;
}

.cv-list-container .cv-list-item a:hover {
    color: #10b981 !important;
}
</style>
