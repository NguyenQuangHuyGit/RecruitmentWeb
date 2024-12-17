<template>
    <div class="search-recruit-container">
        <header>
            <IconField>
                <InputText
                    v-model="filterValue"
                    placeholder="Tìm kiếm tin tuyển dụng"
                />
                <InputIcon class="pi pi-search" />
            </IconField>

            <div class="filter-container">
                <Select
                    v-model="selectedField"
                    :options="fields"
                    showClear
                    filter
                    optionLabel="name"
                    placeholder="Lĩnh vực"
                    class="filter-item"
                />
                <Select
                    v-model="selectedProvince"
                    :options="provinces"
                    showClear
                    filter
                    optionLabel="name"
                    placeholder="Địa điểm"
                    class="filter-item"
                />
                <Select
                    v-model="selectedExperienceType"
                    :options="experienceType"
                    showClear
                    optionLabel="name"
                    placeholder="Kinh nghiệm"
                    class="filter-item"
                />
                <Select
                    v-model="selectedCity"
                    :options="cities"
                    showClear
                    optionLabel="name"
                    placeholder="Mức lương"
                    class="filter-item"
                />
                <Select
                    v-model="selectedlevelType"
                    :options="levelType"
                    showClear
                    optionLabel="name"
                    placeholder="Cấp bậc"
                    class="filter-item"
                />
                <Select
                    v-model="selectedTypeWorking"
                    :options="typeWorkingType"
                    showClear
                    optionLabel="name"
                    placeholder="Hình thức"
                    class="filter-item"
                />
                <Select
                    v-model="selectedCity"
                    :options="cities"
                    showClear
                    optionLabel="name"
                    placeholder="Khoảng cách"
                    class="filter-item"
                />
            </div>
        </header>
        <body>
            <div class="recruitment-list-container">
                <div
                    :key="item.id"
                    class="recruitment-item"
                    v-for="item in recruitmentData"
                    @click="handleChooseItem(item)"
                >
                    <div
                        class="recruitment-item-save-btn"
                        v-tooltip.top="'Lưu tin tuyển dụng'"
                    >
                        <i
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
        </body>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, inject } from "vue";
import RecruitmentService from "@/services/recruitmentservice.js";
import FieldService from "@/services/fieldservice.js";
import ProvinceService from "@/services/provinceservice.js";
import { useRouter, useRoute } from "vue-router";
import Common from "@/helper/common.js";

const router = useRouter();

const setLoading = inject("setLoading");

const filterValue = ref("");
const recruitmentData = ref([]);

const fields = ref([]);
const provinces = ref([]);

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
        name: "5 năm",
        id: 5,
    },
    {
        name: "Trên 5 năm",
        id: 6,
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

onBeforeMount(async () => {
    try {
        setLoading(true);
        const response = await RecruitmentService.getAll();
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
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
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
</script>

<style scoped>
.search-recruit-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px 200px;
    background-color: #f8f9fa;
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

.search-recruit-container body {
    width: 100%;
    height: max-content;
}

.search-recruit-container .recruitment-list-container {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
