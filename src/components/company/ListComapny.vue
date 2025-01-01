<template>
    <div class="list-company-container">
        <div class="list-company-header">
            <p class="title">Danh sách công ty</p>
            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="filterValue"
                    placeholder="Nhập tên công ty"
                    size="large"
                    @keypress.enter="handleReloadData"
                />
                <InputIcon class="pi pi-spin pi-spinner" />
            </IconField>
        </div>
        <main class="list-company-main">
            <div
                style="
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    height: max-content;
                "
            >
                <p>Số công ty đang tuyển dụng trên hệ thống</p>
                <Badge :value="companies.length" size="xlarge"></Badge>
            </div>
            <div class="list-company">
                <div
                    class="item-company"
                    v-for="item in companies"
                    :key="item.id"
                >
                    <div
                        class="company-bgi"
                        @click="handleClickDetailCompany(item.id)"
                    >
                        <img
                            :src="item.backGroundImagePath"
                            alt="Ảnh nền"
                            placeholder="blur"
                            loading="lazy"
                        />
                    </div>
                    <div class="company-main-info">
                        <div
                            class="company-logo"
                            @click="handleClickDetailCompany(item.id)"
                        >
                            <img
                                :src="item.imagePath"
                                alt="Ảnh đại diện"
                                placeholder="blur"
                                loading="lazy"
                            />
                        </div>
                        <div class="company-info">
                            <p
                                style="
                                    text-wrap: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                "
                                @click="handleClickDetailCompany(item.id)"
                            >
                                {{ item.name }}
                            </p>
                        </div>
                    </div>
                    <div class="about-company">
                        <p>
                            {{
                                item.aboutCompany
                                    ? `"${item.aboutCompany}"`
                                    : ""
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, inject, onBeforeMount } from "vue";
import companyservice from "@/services/companyservice";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

const setLoading = inject("setLoading");
const toast = useToast();
const router = useRouter();
const filterValue = ref("");

const companies = ref([]);

onBeforeMount(async () => {
    setLoading(true);
    var response = await companyservice.getAll(filterValue.value);
    companies.value = [...response];
    console.log(companies.value);
    setLoading(false);
});

const handleReloadData = async () => {
    setLoading(true);
    var response = await companyservice.getAll(filterValue.value);
    companies.value = [...response];
    setLoading(false);
};

const handleClickDetailCompany = (id) => {
    router.push({ name: "detail-company", params: { id: id } });
};
</script>

<style>
.list-company-container {
    padding: 20px 190px;
    background-color: #f9f9fa;
    height: max-content;
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.list-company-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.list-company-header .title {
    font-family: Roboto-Medium;
    font-size: 2.5em;
    color: rgb(0, 44, 85);
}

.list-company-main {
    background-color: #fff;
    flex: 1;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list-company-main > div > p {
    font-family: Roboto-Medium;
    font-size: 1.5em;
}

.list-company {
    display: grid;
    width: 100%;
    grid-template-columns: 32% 32% 32%;
    column-gap: 10px;
    justify-content: space-around;
}

.list-company .item-company {
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    height: 24rem;
    overflow: hidden;
}

.item-company:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.item-company .company-bgi {
    width: 100%;
    height: 0px;
    padding-top: calc(26.5625%);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.item-company .company-bgi img {
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
}

.company-main-info {
    display: flex;
    gap: 10px;
}

.company-main-info .company-logo {
    min-width: 88px;
    max-width: 88px;
    width: 88px;
    height: 88px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.26) 0px 1px 2px 0px;
    cursor: pointer;
}

.company-main-info .company-logo img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.company-main-info .company-info {
    overflow: hidden;
}

.company-main-info .company-info p {
    font-family: Roboto-Medium;
    font-size: 1.3em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    cursor: pointer;
}

.item-company .about-company {
    overflow: hidden;
    text-overflow: ellipsis;
}

.item-company .about-company p {
    color: #555;
    font-size: 0.85em;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
    -webkit-box-orient: vertical;
}
</style>
