<template>
    <div class="list-user-container">
        <div class="list-user-toolbar">
            <IconField class="search-input">
                <InputIcon class="pi pi-search" />
                <InputText
                    v-model="filterData.name"
                    placeholder="Tìm kiếm theo tên ứng viên"
                    @keydown.enter="handleFilterData"
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
    <Dialog
        v-model:visible="userInfoDialog"
        modal
        header="Thông tin ứng viên"
        :style="{ width: '50em', height: '100em' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        maximizable 
        position="center"
    >
        <div class="user-apply-info-container">
            <div class="row-1">
                <div class="col-1">
                    <IftaLabel>
                        <InputText
                            name="fullName"
                            variant="outlined"
                            readonly
                            size="small"
                            v-model="selectedUser.userInfo.fullName"
                        />
                        <label for="fullName">Họ tên</label>
                    </IftaLabel>
                    <IftaLabel>
                        <InputText
                            name="phoneNumber"
                            variant="outlined"
                            readonly
                            size="small"
                            v-model="selectedUser.userInfo.phoneNumber"
                        />
                        <label for="phoneNumber">Số điện thoại</label>
                    </IftaLabel>
                    <IftaLabel>
                        <InputText
                            name="email"
                            variant="outlined"
                            size="small"
                            v-model="selectedUser.userInfo.email"
                            readonly
                        />
                        <label for="email">Email</label>
                    </IftaLabel>
                    <IftaLabel>
                        <InputText
                            name="dateOfBirth"
                            variant="outlined"
                            v-model="dob"
                            size="small"
                            readonly
                        />
                        <label for="dateOfBirth">Ngày sinh</label>
                    </IftaLabel>
                    <IftaLabel>
                        <InputText
                            name="address"
                            variant="outlined"
                            v-model="selectedUser.userInfo.address"
                            size="small"
                            readonly
                        />
                        <label for="address">Địa chỉ</label>
                    </IftaLabel>
                </div>
                <div class="col-2">
                    <Skeleton
                        height="20rem"
                        width="210px"
                        :class="[isLoadingCv ? '' : 'notLoading']"
                    ></Skeleton>
                    <div
                        :class="[!isLoadingCv ? '' : 'notLoading']"
                        v-tooltip.top="'Nhấn để xem CV'"
                        style="
                            cursor: pointer;
                            height: 19.5rem;
                            overflow: hidden;
                            border-radius: 8px;
                            padding: 10px;
                            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px
                                0px;
                            width: 100%;
                        "
                        @click="handleOpenCV"
                    >
                        <VuePdfEmbed
                            @rendered="isLoadingCv = false"
                            v-if="selectedUser.cvApplyLink"
                            annotation-layer
                            :source="selectedUser.cvApplyLink"
                            :page="1"
                            :width="210"
                        />
                    </div>
                </div>
            </div>
            <div class="row-2">
                <IftaLabel>
                    <InputText
                        name="gender"
                        variant="outlined"
                        readonly
                        size="small"
                        v-model="selectedUser.userInfo.gender"
                    />
                    <label for="gender">Giới tính</label>
                </IftaLabel>
                <IftaLabel>
                    <InputText
                        name="degree"
                        variant="outlined"
                        readonly
                        size="small"
                        v-model="selectedUser.userInfo.degree"
                    />
                    <label for="degree">Bằng cấp cao nhất</label>
                </IftaLabel>
                <IftaLabel>
                    <InputText
                        name="fieldName"
                        variant="outlined"
                        readonly
                        size="small"
                        v-model="selectedUser.userInfo.fieldName"
                    />
                    <label for="fieldName">Lĩnh vực làm việc</label>
                </IftaLabel>
                <IftaLabel>
                    <InputText
                        name="level"
                        variant="outlined"
                        readonly
                        size="small"
                        v-model="selectedUser.userInfo.level"
                    />
                    <label for="level">Cấp bậc hiện tại</label>
                </IftaLabel>
                <IftaLabel style="grid-column: 1/3;">
                    <Textarea 
                        style="resize: none;"
                        name="introduce"
                        variant="outlined"
                        readonly
                        size="small"
                        fluid
                        rows="3"
                        v-model="selectedUser.introduce"
                    />
                    <label for="introduce">Lời giới thiệu của ứng viên</label>
                </IftaLabel>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { onBeforeMount, ref, inject, computed } from "vue";
import UserService from "@/services/userservice.js";
import Common from "@/helper/common";
import recruitmentservice from "@/services/recruitmentservice";
import VuePdfEmbed from "vue-pdf-embed";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const setLoading = inject("setLoading");

const props = defineProps({
    id: String,
});

const userInfoDialog = ref(false);
const selectedUser = ref();
const isLoadingCv = ref(false);
const isUpdateStatus = ref(true);

const userRecruiments = ref([]);

const dob = computed(
    () => Common.formatDate(selectedUser.value.userInfo.dateOfBirth).result
);

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
        disabled: true,
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
    isLoadingCv.value = true;
    selectedUser.value = data;
    userInfoDialog.value = true;
    if (data.status === 0) {
        await recruitmentservice.updateStatusUserRecruitment(data.id, 1);
        data.status = 1;
        selectedStatelist.value[data.id] = {
            id: 1,
            name: handleStatusData(1),
        };
    }
};

const handleOpenCV = () => {
    window.open(selectedUser.value.cvApplyLink, "_blank");
};

const handleUpdateStatus = async (data) => {
    if (data.status == selectedStatelist.value[data.id].id){
        isUpdateStatus.value = false;
        return;
    }else {
        isUpdateStatus.value = true;
    }
    data.status = selectedStatelist.value[data.id].id;
    const temp = userRecruiments.value.find((r) => r.id == data.id);
    temp.status = selectedStatelist.value[data.id].id;
};

const onCellEditComplete = async (event) => {        
    if (event.newValue === 0 || !isUpdateStatus.value){
        isUpdateStatus.value = true;
        return;
    };
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

.user-apply-info-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.user-apply-info-container .row-1 {
    display: flex;
    gap: 16px;
}

.user-apply-info-container .row-1 .col-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    flex: 1;
}

.user-apply-info-container .row-1 .col-2 {
    max-width: 40%;
    width: max-content;
}

.user-apply-info-container .row-1 .col-2 .notLoading {
    display: none;
}

.user-apply-info-container .row-2 {
    display: grid;
    grid-template-columns: auto auto;
    gap: 16px;
}
</style>
