<template>
    <div class="recruitment-of-user-container">
        <div class="header">
            <p>Việc làm của tôi</p>
        </div>
        <div class="body">
            <Tabs v-model:value="tabActive">
                <TabList>
                    <Tab
                        value="0"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Việc đã ứng tuyển</Tab
                    >
                    <Tab
                        value="1"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Việc đã lưu</Tab
                    >
                </TabList>
                <TabPanels
                    style="
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    "
                >
                    <TabPanel value="0">
                        <div class="recruitment-list-container">
                            <div
                                class="recruitment-item"
                                v-for="item in recuitments"
                                :key="item.id"
                                @click="handleRecruitmentClick(item)"
                            >
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                            text-wrap: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            padding-right: 10px;
                                        "
                                    >
                                        {{ item.title }}
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        {{ item.company.name }}
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        {{ handleProvinceData(item) }}
                                    </p>
                                    <p style="font-size: 0.8em">
                                        {{ handleSalaryData(item) }}
                                    </p>
                                </div>
                                <div
                                    class="recruitment-status-info"
                                    @click.stop="displayRecruit($event, item)"
                                >
                                    <i
                                        class="pi pi-info-circle"
                                        style="font-size: 1.2rem"
                                        v-tooltip.top="'Trạng thái hồ sơ'"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="recruitment-list-container">
                            <div
                                class="recruitment-item"
                                v-for="(item, index) in saveRecruiment"
                                :key="item.id"
                                @click="handleRecruitmentClick(item)"
                            >
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                            text-wrap: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            padding-right: 10px;
                                        "
                                    >
                                        {{ item.title }}
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        {{ item.company.name }}
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        {{ handleProvinceData(item) }}
                                    </p>
                                    <p style="font-size: 0.8em">
                                        {{ handleSalaryData(item) }}
                                    </p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                    @click.stop="handleSaveRecruiment(item, index)"
                                >
                                    <i
                                        v-if="item.isSaveByUser"
                                        class="pi pi-heart-fill"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                    <i
                                        v-else
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
    <Popover ref="op" class="user-popover" position="left" alignOverlay="left">
        <div class="recruitment-status-container">
            <Timeline :value="events">
                <template #opposite="slotProps">
                    <small v-if="slotProps.item.active">{{
                        slotProps.item.date
                    }}</small>
                </template>
                <template #content="slotProps">
                    {{ slotProps.item.active ? slotProps.item.status : "" }}
                </template>
            </Timeline>
        </div>
    </Popover>
</template>

<script setup>
import {
    useTemplateRef,
    ref,
    onBeforeMount,
    watch,
    nextTick,
    inject,
    computed,
} from "vue";
import recruitmentservice from "@/services/recruitmentservice";
import { useRouter, useRoute } from "vue-router";
import Common from "@/helper/common.js";

const router = useRouter();
const setLoading = inject("setLoading");

const op = useTemplateRef("op");

const selectedRecruitmentTemp = ref();

const handleHideOp = () => {
    selectedRecruitmentTemp.value = null;
    op.value.hide();
};

const displayRecruit = async (e, data) => {
    handleHideOp();
    selectedRecruitmentTemp.value = data;
    nextTick(() => {
        op.value.show(e);
    });
};

const recuitments = ref();

const saveRecruiment = ref();

const tabActive = ref("0");

watch(tabActive, async (value) => {
    setLoading(true);
    if (value === "0") {
        var response = await recruitmentservice.getUserRecruitment();
        recuitments.value = { ...response };
    } else {
        var response = await recruitmentservice.getSaveRecruitment();
        saveRecruiment.value = { ...response };
    }
    setLoading(false);
});

onBeforeMount(async () => {
    setLoading(true);
    var response = await recruitmentservice.getUserRecruitment();
    recuitments.value = { ...response };
    console.log(recuitments.value);
    setLoading(false);
});

const handleRecruitmentClick = (data) => {
    router.push({ name: "recruiter-detail", params: { id: data.id } });
};

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

const handleSaveRecruiment = async (data, index) => {
    await recruitmentservice.saveRecruitment(data.id);
    saveRecruiment.value[index].isSaveByUser = !data.isSaveByUser;
    if (data.isSaveByUser) {
        toast.add({
            severity: "success",
            summary: "Lưu tin thành công",
            detail: "Truy cập: Việc làm của bạn >> Công việc của tôi >> Việc đã lưu để xem danh sách",
            life: 3000,
        });
    }
}

const events = computed(() => {
    const result = [
        {
            status: "Ứng tuyển",
            date: Common.formatDate(
                selectedRecruitmentTemp.value.userRecruitment.applyDate
            ).result,
            active: true,
        },
    ];

    if (selectedRecruitmentTemp.value.userRecruitment.status >= 1) {
        result.push({
            status: "NTD xem hồ sơ",
            date: Common.formatDate(
                selectedRecruitmentTemp.value.userRecruitment.openCvDate
            ).result,
            active:
                selectedRecruitmentTemp.value.userRecruitment.openCvDate !==
                null,
        });
    }

    if (selectedRecruitmentTemp.value.userRecruitment.status >= 2) {
        result.push({
            status: "NTD đánh giá hồ sơ",
            date: Common.formatDate(
                selectedRecruitmentTemp.value.userRecruitment.changeStateDate
            ).result,
            active:
                selectedRecruitmentTemp.value.userRecruitment
                    .changeStateDate !== null,
        });
    }
    return result;
});
</script>

<style>
.recruitment-of-user-container {
    flex: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recruitment-of-user-container .header {
    background-color: #fff;
    border-radius: 8px;
    width: 100%;
    height: max-content;
    padding: 30px;
}

.recruitment-of-user-container .header p {
    font-family: Roboto-Medium;
    font-size: 1.9em;
}

.recruitment-of-user-container .body {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    padding: 10px;
}

.recruitment-list-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recruitment-list-container .recruitment-item {
    display: flex;
    position: relative;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 8px;
    padding: 16px 35px 16px 16px;
    align-items: center;
    gap: 16px;
    cursor: pointer;
}

.recruitment-list-container .recruitment-item:hover {
    border: 1px solid #a4e4cf;
    background-color: #edfbf5;
}

.recruitment-list-container .recruitment-item .company-avatar {
    flex: 0 0 70px;
    height: 70px;
    padding: 8px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
    background-color: white !important;
}

.recruitment-list-container .recruitment-item .company-avatar img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: white !important;
}

.recruitment-list-container .recruitment-item .recruitment-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: hidden;
}

.recruitment-list-container
    .recruitment-item:hover
    .recruitment-info
    p:first-child {
    color: #31c593;
}

.recruitment-list-container .recruitment-item .recruitment-control-save {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.recruitment-list-container .recruitment-item .recruitment-control-save:hover {
    background-color: #ebfff8;
}

.recruitment-list-container .recruitment-item .recruitment-status-info {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.user-popover {
    width: 270px;
}

.user-popover.p-popover::before,
.user-popover.p-popover::after {
    transform: translateX(-5px) !important;
}

.user-popover.p-popover {
    transform: translateX(-10px) !important;
}

.recruitment-status-container {
    padding: 10px 0;
}
</style>
