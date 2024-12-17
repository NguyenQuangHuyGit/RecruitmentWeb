<template>
    <div class="home-container">
        <header>
            <InputGroup class="search-toolbar">
                <InputGroupAddon>
                    <InputIcon class="pi pi-search" size="large" />
                </InputGroupAddon>
                <InputText
                    v-model="filterValue"
                    placeholder="Tìm kiếm tin tuyển dụng"
                    size="large"
                />
                <InputGroupAddon>
                    <Button type="button" label="Tìm kiếm" size="large" />
                </InputGroupAddon>
            </InputGroup>
        </header>
        <body>
            <div class="new-container">
                <h3>Việc làm mới dành cho bạn</h3>
                <div class="recruitment-list">
                    <Carousel
                        :value="recruitmentData"
                        :numVisible="3"
                        :numScroll="3"
                        containerClass="container-class"
                        :responsiveOptions="
                            screenWidth > 800 ? responsiveOptions : null
                        "
                        :orientation="
                            screenWidth <= 800 ? 'vertical' : 'horizontal'
                        "
                        verticalViewPortHeight="380px"
                        circular
                        :autoplayInterval="3000"
                    >
                        <template #item="slotProps">
                            <div
                                class="recruitment-item"
                                @click="handleClickItem(slotProps.data)"
                            >
                                <div class="company-image">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt="Ảnh công ty"
                                    />
                                </div>
                                <div class="recruitment-content">
                                    <div class="recruitment-name">
                                        {{ slotProps.data.title }}
                                    </div>
                                    <div class="company-name">
                                        {{ slotProps.data.company.name }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Carousel>
                </div>
            </div>
            <div class="hot-container">
                <h3>Việc làm nổi bật</h3>
            </div>
        </body>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref, inject } from "vue";
import RecruitmentService from "@/services/recruitmentservice.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const setLoading = inject("setLoading");

const filterValue = ref("");
const recruitmentData = ref([]);

const screenWidth = ref(window.innerWidth);

const setScreenWidth = () => {
    screenWidth.value = window.innerWidth;
}

onMounted(() => {
    window.addEventListener("resize", setScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener("resize", setScreenWidth);
});

onBeforeMount(async () => {
    try {
        setLoading(true);
        const response = await RecruitmentService.getAll();
        recruitmentData.value = [...response];
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
});

const handleClickItem = (data) => {
    router.push({ name: "recruiter-detail", params: { id: data.id } });
};

const responsiveOptions = ref([
    {
        breakpoint: "1270px",
        numVisible: 2,
        numScroll: 2,
    },
    {
        breakpoint: "750px",
        numVisible: 1,
        numScroll: 1,
    },
]);
</script>

<style>
.home-container {
    padding: 40px 150px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f1f2f4;
}

.search-toolbar {
    width: max-content;
    margin: 0 auto;
}

.search-toolbar .p-button-label {
    width: max-content;
    min-width: 80px;
}

.search-toolbar .p-inputgroupaddon {
    width: max-content;
    min-width: 40px;
    position: relative;
}

.home-container h3 {
    font-weight: normal;
    font-family: Roboto-Bold;
    font-size: 1.5em;
    color: #10b981;
}

.home-container body {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.new-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
}

.new-container .recruitment-list {
    width: 100%;
    box-sizing: border-box;
    margin: auto;
}

.new-container .recruitment-list .recruitment-item {
    display: flex;
    min-height: 120px;
    border: 1px solid rgb(241, 241, 241);
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    max-width: 350px;
    margin: 5px;
    cursor: pointer;
    padding: 0 10px;
}

.new-container .recruitment-list .recruitment-item:hover {
    background-color: #f5fffc;
    border: 1px solid #31c593;
}

.home-container .company-image {
    width: 86px;
    height: 86px;
    padding: 4px;
    margin: auto;
    border-radius: 12px;
    background-color: #fff;
}

.home-container .company-image img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

.recruitment-content {
    flex: 1;
    display: flex;
    width: 70%;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
}

.recruitment-content div {
    width: 100%;
}

.container-class {
    gap: 10px;
}

.recruitment-content .recruitment-name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 1400px) {
    .home-container {
        padding: 40px 50px;
    }
}

@media only screen and (max-width: 1270px) {
    .new-container .recruitment-list .recruitment-item {
        max-width: 500px;
    }
}

@media only screen and (max-width: 1200px) {
    .new-container .recruitment-list .recruitment-item {
        max-width: 400px;
    }
}

@media only screen and (max-width: 1000px) {
    .new-container .recruitment-list .recruitment-item {
        max-width: 350px;
    }
}

@media only screen and (max-width: 800px) {
    .new-container .recruitment-list .recruitment-item {
        max-width: unset;
        margin: unset;
    }
}
</style>
