<template>
    <div class="search-recruit-container">
        <header>
            <IconField>
                <InputText
                    v-model="filter.name"
                    placeholder="Tìm kiếm tin tuyển dụng"
                    @keypress.enter="reloadData(false)"
                />
                <InputIcon class="pi pi-search" />
            </IconField>
        </header>
        <main>
            <div style="position: relative; width: 24%">
                <div class="filter">
                    <div
                        style="
                            position: sticky;
                            top: 0;
                            z-index: 2;
                            background-color: #f8f9fa;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        "
                    >
                        <p>Bộ lọc</p>
                        <Button
                            icon="pi pi-times"
                            severity="danger"
                            rounded
                            variant="text"
                            aria-label="Cancel"
                            size="small"
                            v-tooltip.top="'Xóa bộ lọc'"
                            @click="handleClearFilter"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Lĩnh vực công việc</label>
                        <Select
                            v-model="selectedField"
                            :options="fields"
                            showClear
                            filter
                            optionLabel="name"
                            placeholder="Chọn lĩnh vực"
                            @update:modelValue="reloadData(false)"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Địa điểm làm việc</label>
                        <Select
                            v-model="selectedProvince"
                            :options="provinces"
                            showClear
                            filter
                            optionLabel="name"
                            placeholder="Địa điểm"
                            @update:modelValue="reloadData(false)"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Kinh nghiệm làm việc</label>
                        <Select
                            v-model="selectedExperienceType"
                            :options="experienceType"
                            showClear
                            optionLabel="name"
                            placeholder="Kinh nghiệm"
                            @update:modelValue="reloadData(false)"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Mức lương mong muốn</label>
                        <Select
                            v-model="selectedMoneyType"
                            :options="moneyType"
                            showClear
                            optionLabel="name"
                            placeholder="Mức lương"
                            @update:modelValue="handleSelectMoney"
                        />
                        <div
                            style="
                                display: flex;
                                width: 100%;
                                gap: 8px;
                                align-items: center;
                                padding: 5px 0;
                            "
                            v-if="selectedMoneyType && selectedMoneyType.id"
                        >
                            <FloatLabel variant="on">
                                <InputText
                                    v-keyfilter.int
                                    v-model="filter.startSalary"
                                    @keypress.enter="reloadData(false)"
                                />
                                <label for="in_label">Từ</label>
                            </FloatLabel>
                            <p>-</p>
                            <FloatLabel variant="on">
                                <InputText
                                    v-keyfilter.int
                                    v-model="filter.endSalary"
                                    @keypress.enter="reloadData(false)"
                                />
                                <label for="in_label">Đến</label>
                            </FloatLabel>
                        </div>
                        <Message
                            v-if="selectedMoneyType && selectedMoneyType.id"
                            >Đơn vị: Triệu VNĐ</Message
                        >
                        <Button
                            label="Áp dụng"
                            outlined
                            v-if="selectedMoneyType && selectedMoneyType.id"
                            @click="reloadData(false)"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Cấp bậc tuyển dụng</label>
                        <Select
                            v-model="selectedlevelType"
                            :options="levelType"
                            showClear
                            optionLabel="name"
                            placeholder="Cấp bậc"
                            @update:modelValue="reloadData(false)"
                        />
                    </div>
                    <div class="filter-item-container">
                        <label>Hình thức làm việc</label>
                        <Select
                            v-model="selectedTypeWorking"
                            :options="typeWorkingType"
                            showClear
                            optionLabel="name"
                            placeholder="Hình thức"
                            @update:modelValue="reloadData(false)"
                        />
                    </div>
                    <!-- <div class="filter-item-container">
                        <label>Khoảng cách</label>
                        <Select
                            v-model="selectedCity"
                            :options="cities"
                            showClear
                            optionLabel="name"
                            placeholder="Khoảng cách"
                        />
                    </div> -->
                </div>
            </div>
            <div class="recruitment-list-container">
                <div
                    :key="item.id"
                    class="recruitment-item"
                    v-for="(item, index) in recruitmentData"
                    @click="handleChooseItem(item)"
                >
                    <div
                        class="recruitment-item-save-btn"
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
                            src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                            alt="Ảnh công ty"
                        />
                    </div>
                    <div class="recruitment-infomation">
                        <div
                            style="font-family: Roboto-Medium; font-size: 1.3em"
                            class="recruitment-name"
                        >
                            {{ item.title }}
                        </div>
                        <div>
                            <span style="font-family: Roboto-Medium">{{
                                handleSalaryData(item)
                            }}</span>
                            |
                            <span style="font-size: 0.9em; font-family: Roboto">
                                {{ handleProvinceData(item) }}</span
                            >
                        </div>
                        <div>
                            Ngày đăng:
                            {{ Common.formatDate(item.createdDate).result }}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, computed } from "vue";
import RecruitmentService from "@/services/recruitmentservice.js";
import FieldService from "@/services/fieldservice.js";
import ProvinceService from "@/services/provinceservice.js";
import { useRouter, useRoute } from "vue-router";
import Common from "@/helper/common.js";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();

const setLoading = inject("setLoading");

const recruitmentData = ref([]);

const fields = ref([]);
const selectedField = ref(null);

const provinces = ref([]);
const selectedProvince = ref(null);

const filter = ref({
    name: "",
    startSalary: null,
    endSalary: null,
});

const filterModel = computed(() => {
    return {
        name: filter.value.name,
        fieldId: computed(() =>
            selectedField.value ? selectedField.value.id : null
        ).value,
        provinceId: computed(() =>
            selectedProvince.value ? selectedProvince.value.id : null
        ).value,
        experience: computed(() =>
            selectedExperienceType.value
                ? selectedExperienceType.value.id
                : null
        ).value,
        startSalary: filter.value.startSalary,
        endSalary: filter.value.endSalary,
        level: computed(() =>
            selectedlevelType.value ? selectedlevelType.value.id : null
        ).value,
        typeWorking: computed(() =>
            selectedTypeWorking.value ? selectedTypeWorking.value.id : null
        ).value,
        money: computed(() =>
            selectedMoneyType.value ? selectedMoneyType.value.id : null
        ).value,
    };
});

const handleClearFilter = () => {
    // console.log(filterModel.value);
    filter.value = {
        name: "",
        startSalary: null,
        endSalary: null,
    };
    selectedField.value = null;
    selectedProvince.value = null;
    selectedExperienceType.value = null;
    selectedlevelType.value = null;
    selectedTypeWorking.value = null;
    selectedMoneyType.value = null;
    reloadData(false);
};

const experienceType = [
    {
        name: "Không yêu cầu kinh nghiệm",
        id: 0,
    },
    {
        name: "1 năm",
        id: 1,
    },
    {
        name: "2 năm",
        id: 2,
    },
    {
        name: "3 năm",
        id: 3,
    },
    {
        name: "4 năm",
        id: 4,
    },
    {
        name: "Từ 5 năm trở lên",
        id: 5,
    },
];
const selectedExperienceType = ref(null);

const levelType = [
    {
        name: "Nhân viên",
        id: 0,
    },
    {
        name: "Quản lý",
        id: 1,
    },
    {
        name: "Trưởng phòng / Phó phòng",
        id: 2,
    },
    {
        name: "Giám đốc",
        id: 3,
    },
];
const selectedlevelType = ref(null);

const typeWorkingType = [
    {
        name: "Toàn thời gian",
        id: 0,
    },
    {
        name: "Bán thời gian",
        id: 1,
    },
    {
        name: "Trực tuyến",
        id: 2,
    },
];
const selectedTypeWorking = ref(null);

const moneyType = [
    {
        name: "Thỏa thuận",
        id: 0,
    },
    {
        name: "Cụ thể",
        id: 1,
    },
];
const selectedMoneyType = ref(null);

const reloadData = async (isAgree = false) => {
    setLoading(true);
    filterModel.value.isAgree = isAgree;

    const response = await RecruitmentService.getAllWithFilter(
        filterModel.value
    );
    recruitmentData.value = [...response];
    setLoading(false);
};

const handleSelectMoney = async () => {
    if (selectedMoneyType.value == null) {
        return await reloadData(false);
    }
    if (selectedMoneyType.value.id === 0) {
        return await reloadData(true);
    }
};

onBeforeMount(async () => {
    setLoading(true);
    filterModel.value.isAgree = false;
    const response = await RecruitmentService.getAllWithFilter(
        filterModel.value
    );
    recruitmentData.value = [...response];

    const fieldResponse = await FieldService.getAll();
    fields.value = [...fieldResponse];

    const responseProvice = await ProvinceService.getProvince();
    provinces.value = responseProvice.data.map((item) => {
        return {
            id: item.id,
            name: item.name,
        };
    });
    setLoading(false);
});

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
</script>

<style scoped>
/* Ẩn thanh cuộn mặc định */
::-webkit-scrollbar {
    width: 2px; /* Đối với Chrome, Edge, and Safari */
}

/* Thanh cuộn tùy chỉnh */
::-webkit-scrollbar-track {
    background: transparent; /* Màu nền của track */
}

::-webkit-scrollbar-thumb {
    background: #ddd; /* Màu của thumb */
    border-radius: 10px; /* Bo tròn góc của thumb */
}

::-webkit-scrollbar-thumb:hover {
    background: #555; /* Màu của thumb khi hover */
}

.search-recruit-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px 200px;
    background-color: #f8f9fa;
    position: relative;
}

.search-recruit-container header {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.filter-container {
    display: flex;
    justify-content: space-around;
    padding: 8px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 8px;
}

.filter-container .p-select {
    max-width: 150px;
    overflow: hidden;
}

.search-recruit-container main {
    width: 100%;
    height: max-content;
    display: flex;
    gap: 25px;
}

.search-recruit-container main .filter {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    position: -webkit-sticky;
    top: 75px;
    max-height: calc(100vh - 190px);
    overflow: auto;
    padding-right: 6px;
    padding-bottom: 16px;
}

.filter-item-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.search-recruit-container main .filter div:first-child {
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
}

.search-recruit-container main .filter div:first-child p {
    font-family: Roboto-Medium;
    font-size: 1.5em;
}

.search-recruit-container .recruitment-list-container {
    width: 80%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    overflow: hidden;
}

.search-recruit-container .recruitment-list-container .recruitment-item {
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
}

.search-recruit-container .recruitment-list-container .recruitment-item:hover {
    background-color: #fafffd;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item
    .recruiment-image {
    width: 110px;
    height: 110px;
    padding: 4px;
    margin: auto;
    border-radius: 12px;
    background-color: #fff;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item
    .recruiment-image
    img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item
    .recruitment-infomation {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 20px;
    height: 100%;
    width: 50%;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item:hover
    .recruitment-infomation
    .recruitment-name {
    color: #31c593;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item
    .recruitment-infomation
    .recruitment-name {
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
}

.search-recruit-container
    .recruitment-list-container
    .recruitment-item:hover
    .recruiment-image {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
}

.recruitment-item-save-btn {
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

.recruitment-item-save-btn:hover {
    background-color: #ebfff8;
}
</style>
