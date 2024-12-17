<template>
    <div class="recruitment-of-user-container">
        <div class="header">
            <p>Việc làm của tôi</p>
        </div>
        <div class="body">
            <Tabs value="0">
                <TabList>
                    <Tab
                        value="0"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Việc đã ứng tuyển</Tab
                    >
                    <Tab
                        value="1"
                        style="
                            font-family: Roboto-Bold !important;
                            font-weight: unset !important;
                        "
                        >Việc đã lưu</Tab
                    >
                </TabList>
                <TabPanels
                    style="
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    "
                >
                    <TabPanel value="0">
                        <div class="recruitment-list-container">
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-status-info"
                                    @click.stop="toggle($event)"
                                >
                                    <i
                                        class="pi pi-info-circle"
                                        style="font-size: 1.2rem"
                                        v-tooltip.top="'Trạng thái hồ sơ'"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="recruitment-list-container">
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                >
                                    <i
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                >
                                    <i
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                >
                                    <i
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                >
                                    <i
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                            <div class="recruitment-item">
                                <div class="company-avatar">
                                    <img
                                        src="https://images.vietnamworks.com/pictureofcompany/25/10816736.png"
                                        alt=""
                                    />
                                </div>
                                <div class="recruitment-info">
                                    <p
                                        style="
                                            font-family: Roboto-Medium;
                                            font-size: 1.2em;
                                        "
                                    >
                                        Chuyên viên triển khai phần mềm
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        1c Vietnam LLC
                                    </p>
                                    <p
                                        style="
                                            color: rgb(119, 119, 119);
                                            font-size: 0.8em;
                                        "
                                    >
                                        Hà Nội
                                    </p>
                                    <p style="font-size: 0.8em">Thương lượng</p>
                                </div>
                                <div
                                    class="recruitment-control-save"
                                    v-tooltip.top="'Lưu tin tuyển dụng'"
                                >
                                    <i
                                        class="pi pi-heart"
                                        style="
                                            color: #31c593;
                                            font-size: 1.2rem;
                                        "
                                    ></i>
                                </div>
                                <Button
                                    label="Ứng tuyển"
                                    style="
                                        position: absolute;
                                        bottom: 10px;
                                        right: 10px;
                                    "
                                />
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
    <Popover ref="op" class="user-popover" position="left" alignOverlay="left">
        <div class="recruitment-status-container">
            <Timeline :value="events">
                <template #opposite="slotProps">
                    <small>{{
                        slotProps.item.date
                    }}</small>
                </template>
                <template #content="slotProps">
                    {{ slotProps.item.status }}
                </template>
            </Timeline>
        </div>
    </Popover>
</template>

<script setup>
import { useTemplateRef, ref } from "vue";

const op = useTemplateRef("op");

const toggle = (event) => {
    op.value.toggle(event);
};

const events = ref([
    {
        status: "Ứng tuyển",
        date: "15/10/2020 10:30",
        icon: "pi pi-shopping-cart",
        color: "#9C27B0",
    },
    {
        status: "NTD xem hồ sơ",
        date: "15/10/2020 14:00",
        icon: "pi pi-cog",
        color: "#673AB7",
    },
    {
        status: "NTD đánh giá hồ sơ",
        date: "15/10/2020 16:15",
        icon: "pi pi-shopping-cart",
        color: "#FF9800",
    },
]);
</script>

<style>
.recruitment-of-user-container {
    flex: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recruitment-of-user-container .header {
    background-color: #fff;
    border-radius: 8px;
    width: 100%;
    height: max-content;
    padding: 30px;
}

.recruitment-of-user-container .header p {
    font-family: Roboto-Medium;
    font-size: 1.9em;
}

.recruitment-of-user-container .body {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    padding: 10px;
}

.recruitment-list-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recruitment-list-container .recruitment-item {
    display: flex;
    position: relative;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 8px;
    padding: 16px 35px 16px 16px;
    align-items: center;
    gap: 16px;
    cursor: pointer;
}

.recruitment-list-container .recruitment-item:hover {
    border: 1px solid #a4e4cf;
    background-color: #edfbf5;
}

.recruitment-list-container .recruitment-item .company-avatar {
    flex: 0 0 70px;
    height: 70px;
    padding: 8px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
    background-color: white !important;
}

.recruitment-list-container .recruitment-item .company-avatar img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: white !important;
}

.recruitment-list-container .recruitment-item .recruitment-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.recruitment-list-container
    .recruitment-item:hover
    .recruitment-info
    p:first-child {
    color: #31c593;
}

.recruitment-list-container .recruitment-item .recruitment-control-save {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.recruitment-list-container .recruitment-item .recruitment-control-save:hover {
    background-color: #ebfff8;
}

.recruitment-list-container .recruitment-item .recruitment-status-info {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.user-popover.p-popover::before,
.user-popover.p-popover::after {
  transform: translateX(-5px) !important;
}

.user-popover.p-popover {
    transform: translateX(-10px) !important;
}

.recruitment-status-container {
    padding: 10px 0;
}
</style>
