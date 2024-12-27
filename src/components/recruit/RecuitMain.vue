<template>
    <div class="recruitment-container">
        <div class="toolbar">
            <div class="toolbar-left">
                <IconField class="search-input">
                    <InputIcon class="pi pi-search" />
                    <InputText
                        v-model="filterValue"
                        placeholder="Tìm kiếm theo tên tin tuyển dụng"
                        @keypress.enter="reloadData"
                    />
                </IconField>
                <MultiSelect
                    v-model="selectedCities"
                    :options="fields"
                    optionLabel="name"
                    filter
                    placeholder="Chọn lĩnh vực"
                    display="chip"
                    :maxSelectedLabels="1"
                    empty-message="Không có dữ liệu"
                >
                    <template #value="data" v-if="selectedCities.length > 1">
                        {{ data.value.length }} mục đã chọn
                    </template>
                    <template #emptyfilter> Không có kết quả phù hợp </template>
                </MultiSelect>
                <DatePicker
                    showIcon
                    iconDisplay="input"
                    v-model="dateRange"
                    selectionMode="range"
                    :manualInput="false"
                    showButtonBar
                    placeholder="Chọn hạn ứng tuyển"
                    dateFormat="dd/mm/yy"
                />
                <Button
                    icon="pi pi-refresh"
                    @click="reloadData"
                    v-tooltip.top="'Tải lại dữ liệu'"
                />
            </div>
            <div class="toolbar-right">
                <Button
                    label="Thêm tin tuyển dụng"
                    @click="handlerShowFormAdd"
                />
            </div>
        </div>
        <div class="container-main">
            <div class="recruit-table">
                <ContextMenu
                    ref="cm"
                    :model="menuModel"
                    @hide="selectedRecruitment = null"
                />
                <DataTable
                    :value="recruitments"
                    tableStyle="min-width: 50rem; cursor: pointer"
                    contextMenu
                    v-model:contextMenuSelection="selectedRecruitment"
                    @rowContextmenu="onRowContextMenu"
                >
                    <Column
                        field="title"
                        header="Vị trí đăng tuyển"
                        style="width: 25%"
                    ></Column>
                    <Column field="fieldName" header="Lĩnh vực"></Column>
                    <Column field="salary" header="Lương" style="width: 20%">
                        <template #body="slotProps">
                            {{ handlerSalaryData(slotProps.data) }}
                        </template>
                    </Column>
                    <Column field="experience" header="Kinh nghiệm">
                        <template #body="slotProps">
                            {{ handlerExperienceData(slotProps.data) }}
                        </template>
                    </Column>
                    <Column field="expiredDate" header="Hạn ứng tuyển">
                        <template #body="slotProps">
                            {{
                                Common.formatDate(slotProps.data.expiredDate)
                                    .result
                            }}
                        </template>
                    </Column>
                    <Column header="Chi tiết">
                        <template #body="slotProps">
                            <Button
                                type="button"
                                @click="displayRecruit($event, slotProps.data)"
                                icon="pi pi-search"
                                severity="secondary"
                                rounded
                            ></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <Suspense>
            <Dialog
                v-model:visible="visible"
                maximizable
                modal
                :header="formData.title"
                :style="{ width: '50rem' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
                <AddRecruitForm
                    @close="handleHideForm"
                    :data="formData.data"
                    :mode="formData.mode"
                    @initialValues="formData.initData"
                />
            </Dialog>
            <template #fallback>
                <div class="overlay">
                    <ProgressSpinner
                        style="width: 50px; height: 50px"
                        strokeWidth="8"
                        fill="transparent"
                    />
                </div>
            </template>
        </Suspense>
    </div>
    <Popover ref="op">
        <div v-if="selectedRecruitmentTemp" class="popover-container">
            <div class="apply-information">
                <div>Số lượng ứng viên đã ứng tuyển:</div>
                <strong>{{ selectedRecruitmentTemp.totalUserApplied }}</strong>
            </div>
            <div style="display: flex; gap: 10px; align-items: center">
                <div>Trạng thái:</div>
                <div style="color: #10b981">
                    {{
                        selectedRecruitmentTemp.isActive
                            ? "Kích hoạt"
                            : "Tạm ẩn"
                    }}
                </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center">
                <div>Thay đổi trạng thái:</div>
                <ToggleSwitch v-model="selectedRecruitmentTemp.isActive" />
            </div>
            <div class="apply-control">
                <Button
                    label="Xem danh sách ứng viên"
                    @click="handleShowListUser"
                />
            </div>
        </div>
    </Popover>
</template>

<script setup>
import {
    ref,
    onBeforeMount,
    inject,
    provide,
    nextTick,
    useTemplateRef,
} from "vue";
import AddRecruitForm from "./AddRecruitForm.vue";
import FieldService from "@/services/fieldservice.js";
import RecruitmentService from "@/services/recruitmentservice.js";
import Common from "@/helper/common.js";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const setLoading = inject("setLoading");

const dateRange = ref(null);

// --------------
const menuModel = ref([
    {
        label: "Chỉnh sửa",
        icon: "pi pi-fw pi-pen-to-square",
        command: () => handlerShowFormEdit(selectedRecruitment.value),
    },
    {
        label: "Xóa",
        icon: "pi pi-fw pi-times",
        command: () => handlerDeleteRecruitment(selectedRecruitment.value.id),
    },
]);

const cm = ref();
const op = useTemplateRef("op");
const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};

const selectedRecruitment = ref();

const selectedRecruitmentTemp = ref();

// ------------
const displayRecruit = async (e, data) => {
    try {
        op.value.hide();
        if (selectedRecruitmentTemp.value?.id === data.id) {
            selectedRecruitmentTemp.value = null;
        } else {
            selectedRecruitmentTemp.value = data;
            nextTick(() => {
                op.value.show(e);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const handleShowListUser = () => {
    router.push({
        name: "user-list",
        params: { id: selectedRecruitmentTemp.value.id },
    });
};

const handleHideForm = () => {
    visible.value = false;
};

const handlerShowFormAdd = () => {
    formData.value.mode = 0;
    formData.value.title = "Thêm mới tin tuyển dụng";
    formData.value.data = null;
    visible.value = true;
};

const handlerShowFormEdit = (data) => {
    formData.value.mode = 1;
    formData.value.title = "Thông tin tuyển dụng";
    formData.value.data = { ...data };
    visible.value = true;
};

const handlerDeleteRecruitment = async (id) => {
    try {
        setLoading(true);
        await RecruitmentService.delete(id);
        toast.add({
            severity: "success",
            summary: "Thành công",
            detail: "Xóa thành công tin tuyển dụng",
            life: 3000,
        });
        reloadData();
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

const selectedCities = ref([]);
const visible = ref(false);
const fields = ref([]);
const recruitments = ref([]);
const filterValue = ref("");
const formData = ref({
    mode: 0,
    title: "",
    data: null,
});

onBeforeMount(async () => {
    try {
        setLoading(true);
        var response = await FieldService.getAll();
        fields.value = [...response];

        var queryModel = {
            name: filterValue.value,
            fieldId: [],
            startDate: null,
            endDate: null,
        };

        response = await RecruitmentService.getByRecruiter(queryModel);
        recruitments.value = [...response];
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
});

const reloadData = async () => {
    try {
        setLoading(true);
        var queryModel = {
            name: filterValue.value,
            fieldId: selectedCities.value.map((x) => x.id),
            startDate: dateRange.value
                ? Common.convertToUTC(dateRange.value[0])
                : null,
            endDate: dateRange.value
                ? Common.convertToUTC(dateRange.value[1])
                : null,
        };
        var response = await RecruitmentService.getByRecruiter(queryModel);
        recruitments.value = [...response];
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

provide("reloadData", reloadData);

const handlerSalaryData = (data) => {
    const currency = data.moneyType === 0 ? "VNĐ" : "USD";

    if (data.salaryType == 0) {
        return "Thỏa thuận";
    } else if (data.salaryType == 1) {
        return `Từ ${Common.formatNumberWithDots(
            data.fromSalary
        )} ${currency} đến ${Common.formatNumberWithDots(
            data.toSalary
        )} ${currency}`;
    } else {
        return `${Common.formatNumberWithDots(data.fromSalary)} ${currency}`;
    }
};

const handlerExperienceData = (data) => {
    if (data.experienceType == 0 || data.experience === 0) {
        return "Không yêu cầu kinh nghiệm";
    } else {
        return `${data.experience} năm kinh nghiệm`;
    }
};
</script>

<style>
.recruitment-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
}

.recruitment-container .search-input {
    width: 25%;
    min-width: 300px;
}

.recruitment-container .toolbar {
    display: flex;
    align-items: center;
    height: max-content;
    width: 100%;
    gap: 10px;
    justify-content: space-between;
}

.recruitment-container .toolbar .toolbar-left,
.recruitment-container .toolbar .toolbar-right {
    display: flex;
    gap: 10px;
}

.container-main {
    flex: 1;
    width: 100%;
}

.container-main .recruit-table {
    width: 100%;
    height: 100%;
}

.popover-container {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 5px;
}

.apply-information {
    display: flex;
    gap: 10px;
}
</style>
