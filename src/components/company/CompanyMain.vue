<template>
    <div class="company-manager-container">
        <div class="company-info-background">
            <p
                style="
                    font-family: Roboto-Medium;
                    font-size: 1.2em;
                    text-align: center;
                "
            >
                Ảnh nền của công ty
            </p>
            <div class="img-container">
                <img
                    :src="backGroundSrc"
                    alt="Ảnh nền"
                />
            </div>
            <FileUpload
                mode="basic"
                @select="onBgFileSelect"
                customUpload
                auto
                accept="image/*"
                severity="secondary"
                class="p-button-outlined"
                chooseLabel="Tải lên"
            />
        </div>
        <div class="company-image">
            <p
                style="
                    font-family: Roboto-Medium;
                    font-size: 1.2em;
                    text-align: center;
                "
            >
                Ảnh đại diện công ty
            </p>
            <div class="img-container">
                <img
                    :src="avatarSrc"
                    alt="Ảnh đại diện"
                />
            </div>
            <FileUpload
                mode="basic"
                @select="onFileSelect"
                customUpload
                auto
                accept="image/*"
                severity="secondary"
                class="p-button-outlined"
                chooseLabel="Tải lên"
            />
        </div>
        <div class="company-main-info">
            <div class="company-info-item full-name">
                <label for="fullName">Tên nhà tuyển dụng</label>
                <InputText name="fullName" v-model="recruiter.fullName" />
            </div>
            <div class="company-info-item email">
                <label for="email">Email</label>
                <InputText name="email" v-model="recruiter.email" />
            </div>
            <div class="company-info-item companyName">
                <label for="companyName">Tên công ty</label>
                <InputText
                    name="companyName"
                    v-model="recruiter.company.name"
                />
            </div>
            <div class="company-info-item address">
                <label for="address">Đia chỉ</label>
                <InputText name="address" v-model="recruiter.company.address" />
            </div>
            <div class="company-info-item province">
                <label for="province">Thành phố</label>
                <Select
                    v-model="selectedProvince"
                    :options="provincesData"
                    filter
                    optionLabel="name"
                    name="province"
                />
            </div>
            <div class="company-info-item district">
                <label for="district">Quận huyện</label>
                <Select
                    v-model="selectedDistrict"
                    :options="districtsData"
                    filter
                    optionLabel="name"
                    name="province"
                />
            </div>
            <div class="company-info-item scale">
                <label for="district">Quy mô</label>
                <Select
                    v-model="selectedScale"
                    :options="scales"
                    optionLabel="name"
                    name="scale"
                />
            </div>
            <div class="company-info-item ggMap">
                <label for="linkGgMap">Link GoogleMap</label>
                <InputText
                    name="linkGgMap"
                    v-model="recruiter.company.linkGgMap"
                />
            </div>
            <div class="company-info-item website">
                <label for="linkWebsite">Link Website</label>
                <InputText
                    name="linkWebsite"
                    v-model="recruiter.company.linkWebsite"
                />
            </div>
            <div class="company-info-item field">
                <label for="companyField">Lĩnh vực của công ty</label>
                <InputText
                    name="companyField"
                    v-model="recruiter.company.companyField"
                />
            </div>
            <div class="company-info-item phoneNumber">
                <label for="phoneNumber">Số điện thoại</label>
                <InputText
                    name="phoneNumber"
                    v-model="recruiter.company.phoneNumber"
                />
            </div>
            <div class="company-info-item about">
                <label for="aboutCompany">Giới thiệu công ty</label>
                <Textarea
                    name="aboutCompany"
                    v-model="recruiter.company.aboutCompany"
                    rows="8"
                    style="resize: none"
                />
            </div>
        </div>
        <Button
            label="Cập nhật thông tin"
            style="grid-area: saveBtn"
            @click="handleUpdateCompany"
        />
    </div>
</template>

<script setup>
import { inject, onBeforeMount, onMounted, ref, watch } from "vue";
import provinceservice from "@/services/provinceservice";
import accountservice from "@/services/accountservice";
import fileservice from "@/services/fileservice";

import { useToast } from "primevue/usetoast";

const toast = useToast();

const setLoading = inject("setLoading");

const selectedProvince = ref();
const provincesData = ref([]);

const selectedDistrict = ref();
const districtsData = ref([]);

const selectedScale = ref();
const scales = ref([
    {
        id: 0,
        name: "10 đến 50 nhân sự",
    },
    {
        id: 1,
        name: "50 đến 100 nhân sự",
    },
    {
        id: 2,
        name: "100 đến 500 nhân sự",
    },
    {
        id: 3,
        name: "1000+ nhân sự",
    },
]);

const recruiter = ref({
    fullName: "",
    email: "",
    company: {
        name: "",
        address: "",
        linkGgMap: "",
        linkWebsite: "",
        companyField: "",
        phoneNumber: "",
        aboutCompany: "",
    },
});

const avatarSrc = ref();
const backGroundSrc = ref();

async function onFileSelect(event) {
    const file = event.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            avatarSrc.value = e.target.result;
        };

        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        await fileservice.upload(0, formData);
    }
}

async function onBgFileSelect(event) {
    const file = event.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            backGroundSrc.value = e.target.result;
        };

        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        await fileservice.upload(1, formData);
    }
}

onBeforeMount(async () => {
    setLoading(true);
    const response = await provinceservice.getProvince();
    provincesData.value = response.data.map((item) => {
        return {
            id: item.id,
            name: item.name,
        };
    });

    const recruiterRes = await accountservice.getCompanyByRecruiter();
    console.log(recruiterRes);
    recruiter.value = {
        fullName: recruiterRes.fullName,
        email: recruiterRes.email,
        company: {
            ...recruiterRes.company,
        },
    };

    selectedScale.value = scales.value.find(
        (s) => s.id === recruiterRes.company.scale
    );

    selectedProvince.value = recruiterRes.company.provinceId
        ? {
              id: recruiterRes.company.provinceId.toString(),
              name: recruiterRes.company.provinceName,
          }
        : null;

    selectedDistrict.value = recruiterRes.company.districtId
        ? {
              id: recruiterRes.company.districtId.toString(),
              name: recruiterRes.company.districtName,
          }
        : null;

    if (selectedProvince.value) {
        const districts = await provinceservice.getDistrictByProvinceId(
            selectedProvince.value.id
        );
        districtsData.value = districts.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
            };
        });
    }

    avatarSrc.value = recruiterRes.company.imagePath;
    backGroundSrc.value = recruiterRes.company.backGroundImagePath;
    setLoading(false);
});

const handleUpdateCompany = async () => {
    setLoading(true);
    const requestMode = {
        ...recruiter.value,
    };
    requestMode.company.provinceId = selectedProvince.value?.id;
    requestMode.company.provinceName = selectedProvince.value?.name
    requestMode.company.districtId = selectedDistrict.value?.id;
    requestMode.company.districtName = selectedDistrict.value?.name;
    requestMode.company.scale = selectedScale.value?.id;
    await accountservice.updateCompanyByRecruiter(requestMode);
    toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Cập nhật thông tin thành công",
        life: 3000,
    });
    setLoading(false);
};

watch(
    () => selectedProvince.value,
    async (province) => {
        if (province) {
            const response = await provinceservice.getDistrictByProvinceId(
                province.id
            );
            districtsData.value = response.data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                };
            });
        } else {
            districtsData.value = [];
        }
    }
);
</script>

<style>
.company-manager-container {
    width: 100%;
    /* height: 100%; */
    padding: 16px;
    border-radius: 4px;
    display: grid;
    grid-template-areas:
        "content background"
        "content image"
        "content saveBtn";
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 43% 43% auto;
    gap: 8px;
    overflow: hidden;
    height: calc(100vh - 180px);
}

.company-manager-container .company-info-background {
    grid-area: background;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.company-manager-container .company-info-background .img-container {
    width: 100%;
    border-radius: 8px;
    height: max-content;
    box-sizing: border-box;
    flex: 1;
    height: 30%;
}

.company-manager-container .company-info-background .img-container img {
    width: 100%;
    height: 100%;
    border: 0;
    vertical-align: middle;
    border-radius: 8px;
}

.company-manager-container .company-image {
    grid-area: image;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.company-manager-container .company-image .img-container {
    width: 100%;
    border-radius: 8px;
    height: max-content;
    box-sizing: border-box;
    flex: 1;
    height: 30%;
}

.company-manager-container .company-image .img-container img {
    width: 100%;
    height: 100%;
    border: 0;
    vertical-align: middle;
    border-radius: 8px;
}

.company-manager-container .company-main-info {
    position: relative;
    overflow: auto;
    grid-area: content;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 10px;
    display: grid;
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    grid-template-areas:
        "fullName phoneNumber email"
        "companyName field scale"
        "province district ggMap"
        "address address website"
        "about about about"
        "about about about"
        "about about about"
        "about about about"
        "about about about"
        "about about about";
}

.company-main-info .company-info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.company-main-info .company-info-item.full-name {
    grid-area: fullName;
}

.company-main-info .company-info-item.email {
    grid-area: email;
}

.company-main-info .company-info-item.company-name {
    grid-area: companyName;
}

.company-main-info .company-info-item.phoneNumber {
    grid-area: phoneNumber;
}

.company-main-info .company-info-item.scale {
    grid-area: scale;
}

.company-main-info .company-info-item.province {
    grid-area: province;
}

.company-main-info .company-info-item.district {
    grid-area: district;
}

.company-main-info .company-info-item.field {
    grid-area: field;
}

.company-main-info .company-info-item.address {
    grid-area: address;
}

.company-main-info .company-info-item.ggMap {
    grid-area: ggMap;
}

.company-main-info .company-info-item.website {
    grid-area: website;
}

.company-main-info .company-info-item.about {
    grid-area: about;
}

/* Ẩn thanh cuộn mặc định */
::-webkit-scrollbar {
    width: 5px; /* Đối với Chrome, Edge, and Safari */
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
</style>
