<template>
    <div class="list-user-container">
        <div class="list-user-toolbar">
            <IconField class="search-input">
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="filterValue"
                    placeholder="Tìm kiếm theo tên ứng viên"
                />
            </IconField>
            <Select
                v-model="selectedState"
                :options="state"
                showClear
                optionLabel="name"
                placeholder="Trạng thái hồ sơ"
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
                <Column field="user.fullName" header="Họ tên"></Column>
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
                            v-model="selectedStatelist[data.id]"
                            :options="state"
                            optionLabel="name"
                            fluid
                        />
                    </template>
                </Column>
                <Column header="Xem chi tiết hồ sơ" style="width: 20%">
                    <template #body="">
                        <div>
                            <Button
                                type="button"
                                icon="pi pi-search"
                                severity="secondary"
                                rounded
                                @click="console.log(selectedStatelist)"
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
const setLoading = inject("setLoading");

const props = defineProps({
    id: String,
});

// const initData = async () => {
//     try {
//         setLoading(true);
//         var response = await UserService.getByRecruitmentId(props.id);
//         return response;
//     } catch (error) {
//         console.error(error);
//     } finally {
//         setLoading(false);
//     }
// };

// const response = await initData();

const userRecruiments = ref([]);

const filterValue = ref("");

const selectedState = ref(null);

const state = [
    {
        id: 0,
        name: "Chưa xem",
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

onBeforeMount(async () => {
    try {
        setLoading(true);
        var response = await UserService.getByRecruitmentId(props.id);
        userRecruiments.value = [...response];

        var temp = {};
        userRecruiments.value.forEach((item) => {
            temp[item.id] = {
                id: item.status,
                name: handleStatusData(item.status),
            };
        });
        selectedStatelist.value = {...temp };
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

// const selectedStatelist = ref(() => {
//     var temp = {};
//     userRecruiments.value.forEach((item) => {
//         temp[item.id] = {
//             id: item.status,
//             name: handleStatusData(item.status),
//         };
//     });
//     return temp;
// });
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
