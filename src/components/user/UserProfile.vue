<template>
    <div class="user-profile-container">
        <div class="user-main-infor">
            <div class="avatar">
                <img :src="srcAvatar" alt="" v-if="srcAvatar" />
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    class="ProfilePicture_userPlaceholder__YbFoJ"
                    viewBox="0 0 30 30"
                >
                    <path
                        d="M15 3a6 6 0 00-6 6v1a6 6 0 1012 0V9a6 6 0 00-6-6zm-.002 16c-4.006 0-9.146 2.167-10.625 4.09C3.459 24.279 4.329 26 5.828 26H24.17c1.499 0 2.369-1.721 1.455-2.91C24.146 21.168 19.004 19 14.998 19z"
                    ></path>
                </svg>
            </div>
            <div class="content">
                <div style="font-family: Roboto-Medium; font-size: 1.5em">
                    {{ user.fullName }}
                </div>
                <div style="font-size: 0.9em">
                    {{ user.position.toUpperCase() }}
                </div>
                <div style="display: flex; gap: 8px; align-items: center">
                    <svg
                        fill="#000000"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"
                        />
                    </svg>
                    <p>{{ user.email }}</p>
                </div>
                <div
                    style="display: flex; gap: 8px; align-items: center"
                    v-if="user.address"
                >
                    <svg
                        width="18px"
                        height="18px"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
                            fill="#000000"
                        />
                    </svg>
                    <p>{{ user.address }}</p>
                </div>
                <div
                    class="user-main-infor-control"
                    v-tooltip.top="'Chỉnh sửa'"
                    @click="handleOpenEditInfoForm"
                >
                    <i
                        class="pi pi-pencil"
                        style="font-size: 1rem; color: #767676"
                    ></i>
                </div>
            </div>
        </div>
        <div class="suitable-recruit">
            <div style="font-family: Roboto-Medium; font-size: 1.5em">
                Công việc mong muốn
            </div>
            <div class="suitable-recruit-content">
                <div class="suitable-recruit-item">
                    <p>Địa điểm làm việc mong muốn</p>
                    <p>Hà Nội</p>
                </div>
                <div class="suitable-recruit-item">
                    <p>Lĩnh vực yêu thích</p>
                    <p>Marketing</p>
                </div>
                <div class="suitable-recruit-item">
                    <p>Mức lương mong muốn (USD / tháng)</p>
                    <p>1000</p>
                </div>
            </div>
            <div
                class="suitable-recruit-control"
                v-tooltip.top="'Chỉnh sửa'"
                @click="suitableRecruitVisible = true"
            >
                <i
                    class="pi pi-pencil"
                    style="font-size: 1rem; color: #767676"
                ></i>
            </div>
        </div>
        <div class="config-account">
            <div style="font-family: Roboto-Medium; font-size: 1.5em">
                Quản lý tài khoản
            </div>
            <div class="config-account-content">
                <p>Email đăng nhập:</p>
                <p>nguyenquanghuy@gmail.com</p>
            </div>
            <div
                class="config-account-control"
                @click="toggle($event)"
                :class="[iShowMenu ? 'active' : '']"
                v-tooltip.top="'Tùy chọn'"
            >
                <i
                    class="pi pi-ellipsis-v"
                    style="font-size: 1rem; color: #767676"
                ></i>
                <Menu ref="menuConfigAccount" :model="items" :popup="true" />
            </div>
        </div>
    </div>
    <Dialog
        v-model:visible="mainInforVisible"
        modal
        header="Hồ sơ của bạn"
        :style="{ width: '50rem' }"
        @update:visible="handleCloseInforForm"
    >
        <template #header>
            <div>
                <span style="font-family: Roboto-Medium; font-size: 1.3em"
                    >Hồ sơ của bạn</span
                >
            </div>
        </template>

        <div class="main-info-form-container">
            <div class="fisrt-container">
                <div class="user-avatar-container">
                    <div class="user-avatar">
                        <img :src="srcAvatar" alt="" v-if="srcAvatar" />
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="120"
                            height="120"
                            class="ProfilePicture_userPlaceholder__YbFoJ"
                            viewBox="0 0 30 30"
                        >
                            <path
                                d="M15 3a6 6 0 00-6 6v1a6 6 0 1012 0V9a6 6 0 00-6-6zm-.002 16c-4.006 0-9.146 2.167-10.625 4.09C3.459 24.279 4.329 26 5.828 26H24.17c1.499 0 2.369-1.721 1.455-2.91C24.146 21.168 19.004 19 14.998 19z"
                            ></path>
                        </svg>
                    </div>
                    <div style="padding: 0 10px">
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
                </div>
                <div class="user-info">
                    <FloatLabel variant="on">
                        <InputText v-model="userForm.fullName" />
                        <label for="on_label">Họ tên</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText v-model="userForm.position" />
                        <label for="on_label">Vị trí công việc hiện tại</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Select
                            v-model="selectedlevelType"
                            :options="levelType"
                            optionLabel="name"
                            fluid
                        />
                        <label for="on_label">Cấp bậc hiện tại</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="second-container">
                <FloatLabel variant="on">
                    <InputText name="email" v-model="userForm.email" disabled />
                    <label for="email">Email</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText
                        name="phone"
                        v-model="userForm.phoneNumber"
                        v-keyfilter.int
                    />
                    <label for="phone">Số điện thoại</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <DatePicker
                        v-model="userForm.dateOfBirth"
                        showIcon
                        fluid
                        iconDisplay="input"
                        showButtonBar
                        dateFormat="dd/mm/yy"
                    />
                    <label for="dateOfbirth">Ngày sinh</label>
                </FloatLabel>
                <div
                    style="
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                    "
                >
                    <div class="gender-item">
                        <RadioButton
                            v-model="userForm.gender"
                            name="gender"
                            :value="0"
                        />
                        <label>Nam</label>
                    </div>
                    <div class="gender-item">
                        <RadioButton
                            v-model="userForm.gender"
                            name="gender"
                            :value="1"
                        />
                        <label>Nữ</label>
                    </div>
                    <div class="gender-item">
                        <RadioButton
                            v-model="userForm.gender"
                            name="gender"
                            :value="2"
                        />
                        <label>Khác</label>
                    </div>
                </div>
                <FloatLabel variant="on" style="grid-column: 1/3">
                    <InputText name="address" v-model="userForm.address" />
                    <label for="address">Địa chỉ</label>
                </FloatLabel>
                <FloatLabel variant="on" style="grid-column: 1/3">
                    <InputGroup>
                        <InputText name="ggMap" v-model="userForm.linkGgMap" />
                        <InputGroupAddon>
                            <Button
                                icon="pi pi-map-marker"
                                variant="text"
                                severity="secondary"
                                @click="handleOpenMap"
                            />
                        </InputGroupAddon>
                    </InputGroup>
                    <label for="ggMap" style="z-index: 99"
                        >Link Google Map</label
                    >
                </FloatLabel>
            </div>
        </div>

        <template #footer>
            <Button type="button" label="CV đính kèm" badge="2" />
            <Button
                label="Lưu"
                outlined
                severity="primary"
                @click="handleEditProfile"
                autofocus
            />
        </template>
    </Dialog>
    <Dialog
        v-model:visible="suitableRecruitVisible"
        modal
        header="Hồ sơ của bạn"
        :style="{ width: '40rem' }"
    >
        <template #header>
            <div>
                <span style="font-family: Roboto-Medium; font-size: 1.3em"
                    >Tiêu chí tìm việc</span
                >
            </div>
        </template>

        <div class="suitable-recruit-form-container">
            <div class="suitable-place">
                <FloatLabel variant="on">
                    <InputText id="on_label" v-model="value3" />
                    <label for="on_label">Nơi làm việc</label>
                </FloatLabel>
            </div>
            <div class="suitable-field">
                <FloatLabel variant="on">
                    <MultiSelect
                        v-model="selectedCities"
                        :options="cities"
                        optionLabel="name"
                        filter
                        :maxSelectedLabels="2"
                        fluid
                    />
                    <label for="on_label">Lĩnh vực</label>
                </FloatLabel>
            </div>
            <div class="suitable-position">
                <FloatLabel variant="on">
                    <Select
                        v-model="selectedCity"
                        :options="cities"
                        optionLabel="name"
                        fluid
                    />
                    <label for="on_label">Cấp bậc mong muốn</label>
                </FloatLabel>
            </div>
            <div class="suitable-salary">
                <Select
                    v-model="selectedCity"
                    :options="cities"
                    optionLabel="name"
                    placeholder="Không yêu cầu kinh ngiệm"
                    style="width: max-content"
                />
                <FloatLabel variant="on" style="flex: 1">
                    <InputText id="on_label" v-model="value3" v-keyfilter.int />
                    <label for="on_label">Mức lương mong muốn</label>
                </FloatLabel>
            </div>
        </div>

        <template #footer>
            <Button
                label="Lưu"
                outlined
                severity="primary"
                @click="suitableRecruitVisible = false"
                autofocus
            />
        </template>
    </Dialog>
</template>

<script setup>
import { useTemplateRef, ref, computed, onBeforeMount, inject } from "vue";
import { useUserStore } from "@/stores/counter";
import accountservice from "@/services/accountservice";
import fileservice from "@/services/fileservice";
import { useToast } from "primevue/usetoast";
import Common from "@/helper/common.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const toast = useToast();
const setLoading = inject("setLoading");
const authContext = useUserStore();

const user = ref({
    ...authContext.user,
});

const userForm = ref({ ...authContext.user });

const srcAvatar = ref(authContext.user.avatarPath ?? null);

async function onFileSelect(event) {
    const file = event.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            srcAvatar.value = e.target.result;
        };

        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        await fileservice.upload(0, formData);
        authContext.getUser(null, true);
    }
}

onBeforeMount(() => {
    console.log(authContext.user);
});

const menuConfigAccount = useTemplateRef("menuConfigAccount");
const items = ref([
    {
        label: "Cập nhật email đăng nhập",
    },
    {
        label: "Thay đổi mật khẩu",
    },
]);

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

const selectedlevelType = ref(
    levelType.find((e) => e.id === authContext.user.level) ?? null
);

const iShowMenu = computed(() => {
    return menuConfigAccount.value ? menuConfigAccount.value.focused : false;
});

const toggle = (event) => {
    menuConfigAccount.value.toggle(event);
    console.log(menuConfigAccount.value);
};

const mainInforVisible = ref(false);
const suitableRecruitVisible = ref(false);

const handleOpenEditInfoForm = () => {
    mainInforVisible.value = true;
};

const handleCloseInforForm = (value) => {
    if (!value) {
        userForm.value = { ...user.value };
    }
};

const handleEditProfile = async () => {
    setLoading(true);
    userForm.value.dateOfBirth = Common.convertToUTC(
        userForm.value.dateOfBirth
    );
    userForm.value.level = selectedlevelType.value.id;
    await accountservice.update(userForm.value);
    mainInforVisible.value = false;
    user.value = { ...userForm.value };
    setLoading(false);
    toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Cập nhật thông tin thành công",
        life: 3000,
    });
    authContext.getUser(null, true);
};

const handleOpenMap = () => {
    window.open("https://www.google.com/maps");
};
</script>

<style>
.user-profile-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background-color: #f1f2f4;
    border-radius: 8px;
}

.user-profile-container .user-main-infor {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    padding: 10px;
    gap: 10px;
    position: relative;
    align-items: center;
}

.user-profile-container .user-main-infor .avatar {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.user-profile-container .user-main-infor .avatar svg {
    fill: #eee;
}

.user-profile-container .user-main-infor .avatar img {
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
    object-position: center center;
    border-radius: 50%;
}


.user-profile-container .user-main-infor .content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 0;
}

.user-profile-container .user-main-infor-control {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    padding: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .user-main-infor:hover .user-main-infor-control {
    display: flex;
}

.user-profile-container .user-main-infor .user-main-infor-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .user-main-infor .user-main-infor-control:active {
    background-color: #ededed;
}

.user-profile-container .suitable-recruit .suitable-recruit-control {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    padding: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .suitable-recruit:hover .suitable-recruit-control {
    display: flex;
}

.user-profile-container .suitable-recruit .suitable-recruit-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .suitable-recruit .suitable-recruit-control:active {
    background-color: #ededed;
}

.user-profile-container .suitable-recruit {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

.user-profile-container .suitable-recruit .suitable-recruit-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item {
    display: flex;
    gap: 10px;
    align-items: center;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item
    p:first-child {
    width: max-content;
    min-width: 250px;
    color: #767676;
    font-size: 0.9em;
}

.user-profile-container
    .suitable-recruit
    .suitable-recruit-content
    .suitable-recruit-item
    p:last-child {
    flex: 1;
}

.user-profile-container .config-account {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

.user-profile-container .config-account .config-account-content {
    display: flex;
    gap: 10px;
    align-items: center;
}

.user-profile-container .config-account .config-account-content p:first-child {
    width: max-content;
    color: #767676;
    font-size: 0.9em;
}

.user-profile-container .config-account .config-account-control {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: none;
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
}

.user-profile-container .config-account:hover .config-account-control {
    display: flex;
}

.user-profile-container .config-account .config-account-control.active {
    display: flex;
}

.user-profile-container .config-account .config-account-control:hover {
    background-color: #f5f5f5;
}

.user-profile-container .config-account .config-account-control:active {
    background-color: #ededed;
}

.main-info-form-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;  
    height: max-content;
}

.main-info-form-container .fisrt-container {
    display: flex;
    gap: 16px;
    width: 100%;
    height: max-content;
}

.main-info-form-container .user-avatar {
    width: 120px;
    height: 120px;
    position: relative;
}

.main-info-form-container .user-avatar svg {
    fill: #eee;
}

.main-info-form-container .user-avatar img {
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
    object-position: center center;
    border-radius: 50%;
    margin-bottom: 10px;
}

.main-info-form-container .user-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    justify-content: space-between;
}

.main-info-form-container .second-container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 16px;
    row-gap: 16px;
}

.gender-item {
    display: flex;
    gap: 16px;
    align-items: center;
    cursor: pointer;
}

.suitable-recruit-form-container {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.suitable-recruit-form-container .suitable-salary {
    display: flex;
    gap: 8px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
