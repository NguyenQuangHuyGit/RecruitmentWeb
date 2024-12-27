<template>
    <div class="list-user-container">
        <div class="list-user-toolbar">
            <IconField class="search-input">
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="filterData.name"
                    placeholder="Tìm kiếm theo tên ứng viên"
                    @keypress.enter="handleFilterData"
                />
            </IconField>
            <Select
                v-model="selectedState"
                :options="state"
                showClear
                optionLabel="name"
                placeholder="Trạng thái hồ sơ"
                @update:modelValue="handleFilterData"
            />
        </div>
        <div class="list-user-table">
            <DataTable
                :data-key="id"
                :value="userRecruiments"
                tableStyle="min-width: 50rem; cursor: pointer"
                editMode="cell"
                @cell-edit-complete="onCellEditComplete"
            >
                <Column field="userName" header="Họ tên"></Column>
                <Column field="applyDate" header="Ngày ứng tuyển">
                    <template #body="slotProps">
                        {{ Common.formatDate(slotProps.data.applyDate).result }}
                    </template></Column
                >
                <Column field="status" header="Trạng thái hồ sơ">
                    <template #body="slotProps">
                        <div>
                            {{ handleStatusData(slotProps.data.status) }}
                        </div>
                    </template>
                    <template #editor="{ data }">
                        <Select
                            v-if="data.status !== 0"
                            v-model="selectedStatelist[data.id]"
                            :options="state"
                            optionLabel="name"
                            fluid
                            optionDisabled="disabled"
                            @blur="handleUpdateStatus(data)"
                        />
                        <p v-else>Chưa xem</p>
                    </template>
                </Column>
                <Column header="Xem chi tiết hồ sơ" style="width: 20%">
                    <template #body="slotProps">
                        <div>
                            <Button
                                type="button"
                                icon="pi pi-search"
                                severity="secondary"
                                rounded
                                @click="handleOpenUserInfo(slotProps.data)"
                            ></Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, computed } from "vue";
import UserService from "@/services/userservice.js";
import Common from "@/helper/common";
import recruitmentservice from "@/services/recruitmentservice";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const setLoading = inject("setLoading");

const props = defineProps({
    id: String,
});

const userRecruiments = ref([]);

const filterData = ref({
    name: "",
    status: null,
});

const selectedState = ref(null);

const state = [
    {
        id: 0,
        name: "Chưa xem",
        disabled: true,
    },
    {
        id: 1,
        name: "Đã xem",
    },
    {
        id: 2,
        name: "Hồ sơ phù hợp",
    },
    {
        id: 3,
        name: "Hồ sơ chưa phù hợp",
    },
    {
        id: 4,
        name: "Hồ sơ đánh giá cao",
    },
];

const selectedStatelist = ref();

const handleFilterData = async () => {
    filterData.value.status = selectedState.value
        ? selectedState.value.id
        : null;
    var response = await UserService.getByRecruitmentId(
        props.id,
        filterData.value
    );
    userRecruiments.value = [...response];

    var temp = {};
    userRecruiments.value.forEach((item) => {
        temp[item.id] = {
            id: item.status,
            name: handleStatusData(item.status),
        };
    });
    selectedStatelist.value = { ...temp };
};

onBeforeMount(async () => {
    try {
        setLoading(true);
        var response = await UserService.getByRecruitmentId(
            props.id,
            filterData.value
        );
        userRecruiments.value = [...response];

        var temp = {};
        userRecruiments.value.forEach((item) => {
            temp[item.id] = {
                id: item.status,
                name: handleStatusData(item.status),
            };
        });
        selectedStatelist.value = { ...temp };
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
});

const handleStatusData = (status) => {
    switch (status) {
        case 0:
            return "Chưa xem";
        case 1:
            return "Đã xem";
        case 2:
            return "Hồ sơ phù hợp";
        case 3:
            return "Hồ sơ chưa phù hợp";
        case 4:
            return "Hồ sơ đánh giá cao";
        default:
            return "Chưa xem";
    }
};

const handleOpenUserInfo = async (data) => {
    const response = await UserService.getUserById(data.userId);
    if (data.status === 0) {
        await recruitmentservice.updateStatusUserRecruitment(data.id, 1);
        data.status = 1;
        selectedStatelist.value[data.id] = {
            id: 1,
            name: handleStatusData(1),
        };
    }
    console.log(response);
};

const handleUpdateStatus = async (data) => {
    data.status = selectedStatelist.value[data.id].id;
    const temp = userRecruiments.value.find((r) => r.id == data.id);
    temp.status = selectedStatelist.value[data.id].id;
};

const onCellEditComplete = async (event) => {
    if (event.newValue === 0) return;
    setLoading(true);
    await recruitmentservice.updateStatusUserRecruitment(
        event.data.id,
        event.newValue
    );
    setLoading(false);
    toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Cập nhật trạng thái ứng viên thành công",
        life: 3000,
    });
};
</script>

<style>
.list-user-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.list-user-toolbar {
    display: flex;
    gap: 16px;
}

.list-user-toolbar .search-input {
    width: 300px;
}
</style>
