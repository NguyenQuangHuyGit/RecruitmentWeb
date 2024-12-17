<template>
    <div class="recruit-form-container">
        <Form
            v-slot="$form"
            v-model:initialValues="initialValues"
            :resolver
            @submit="onFormSubmit"
            style="display: flex; flex-direction: column; gap: 16px"
        >
            <Accordion v-model:value="active" multiple>
                <AccordionPanel value="0">
                    <AccordionHeader
                        >Thông tin chung về tuyển dụng</AccordionHeader
                    >
                    <AccordionContent class="accordion-content flex-column">
                        <div class="control">
                            <FloatLabel variant="on">
                                <InputText
                                    name="name"
                                    type="text"
                                    fluid
                                    v-model="recruitModel.name"
                                />
                                <label for="name">Vị trí tuyển dụng</label>
                            </FloatLabel>
                            <Message
                                v-if="$form.name?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.name.error.message }}</Message
                            >
                        </div>
                        <div class="control">
                            <FloatLabel variant="on">
                                <DatePicker
                                    v-model="recruitModel.expiredDate"
                                    dateFormat="dd/mm/yy"
                                    name="expiredDate"
                                    showIcon
                                    fluid
                                />
                                <label for="expiredDate"
                                    >Hạn ứng tuyển công việc</label
                                >
                            </FloatLabel>
                            <Message
                                v-if="$form.expiredDate?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.expiredDate.error.message }}</Message
                            >
                        </div>
                        <div
                            class="control grid-column"
                            :style="{
                                'grid-template-columns':
                                    selectedSalaryType.id !== 2
                                        ? 'max-content max-content auto max-content auto'
                                        : 'max-content max-content auto',
                            }"
                        >
                            <div>
                                <Select
                                    name="salaryType"
                                    v-model="selectedSalaryType"
                                    :options="salaryType"
                                    optionLabel="name"
                                />
                            </div>
                            <div>
                                <Select
                                    :disabled="!selectedSalaryType.id"
                                    name="moneyType"
                                    v-model="selectedMoneyType"
                                    :options="moneyType"
                                    optionLabel="name"
                                />
                            </div>
                            <div>
                                <FloatLabel variant="on">
                                    <InputNumber
                                        :disabled="!selectedSalaryType.id"
                                        name="fromSalary"
                                        v-model="recruitModel.fromSalary"
                                        :min="0"
                                        fluid
                                    />
                                    <label for="fromSalary">Mức lương</label>
                                </FloatLabel>
                            </div>
                            <p
                                style="margin: auto; text-align: center"
                                v-show="selectedSalaryType.id !== 2"
                            >
                                Đến
                            </p>
                            <div v-show="selectedSalaryType.id !== 2">
                                <FloatLabel variant="on">
                                    <InputNumber
                                        :disabled="!selectedSalaryType.id"
                                        name="toSalary"
                                        v-model="recruitModel.toSalary"
                                        :min="0"
                                        fluid
                                    />
                                    <label for="toSalary">Mức lương</label>
                                </FloatLabel>
                            </div>
                        </div>
                        <div class="control grid-column">
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Select
                                        name="field"
                                        :options="fields"
                                        optionLabel="name"
                                        fluid
                                        filter
                                        v-model="selectedField"
                                    />
                                    <label for="field">Lĩnh vực</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.field?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.field.error.message }}</Message
                                >
                            </div>
                            <div>
                                <FloatLabel variant="on">
                                    <InputNumber
                                        name="recruitNumber"
                                        fluid
                                        :min="1"
                                        :useGrouping="false"
                                        v-model:modelValue="
                                            recruitModel.recruitNumber
                                        "
                                    />
                                    <label for="recruitNumber"
                                        >Số lượng tuyển</label
                                    >
                                </FloatLabel>
                            </div>
                        </div>
                        <div class="control grid-column">
                            <Select
                                name="experienceType"
                                v-model="selectedExperienceType"
                                :options="experienceType"
                                optionLabel="name"
                                placeholder="Yêu cầu kinh nghiệm"
                            />
                            <FloatLabel variant="on">
                                <InputNumber
                                    name="experience"
                                    fluid
                                    :disabled="!selectedExperienceType.id"
                                    :min="1"
                                    :max="50"
                                    :useGrouping="false"
                                    v-model="recruitModel.experience"
                                    v-tooltip.top="
                                        selectedExperienceType.id
                                            ? {
                                                  value: 'Từ 1 đến 50',
                                                  showDelay: 1000,
                                              }
                                            : null
                                    "
                                />
                                <label for="experience"
                                    >Số năm kinh nghiệm yêu cầu</label
                                >
                            </FloatLabel>
                        </div>
                        <div class="control grid-column">
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Select
                                        name="level"
                                        v-model="selectedlevelType"
                                        :options="levelType"
                                        optionLabel="name"
                                        fluid
                                    />
                                    <label for="level">Cấp bậc</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.level?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.level.error.message }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Select
                                        name="typeWorking"
                                        v-model="selectedTypeWorking"
                                        :options="typeWorkingType"
                                        optionLabel="name"
                                        fluid
                                    />
                                    <label for="typeWorking"
                                        >Hình thức làm việc</label
                                    >
                                </FloatLabel>
                                <Message
                                    v-if="$form.typeWorking?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{
                                        $form.typeWorking.error.message
                                    }}</Message
                                >
                            </div>
                        </div>
                        <div class="control flex">
                            <Checkbox
                                v-model="recruitModel.isDifferentAddess"
                                name="isDifferentAddess"
                                binary
                            />
                            <label for="isDifferentAddess">
                                Địa điểm làm việc trùng với địa chỉ công ty
                            </label>
                        </div>
                        <div
                            class="control"
                            v-show="!recruitModel.isDifferentAddess"
                        >
                            <FloatLabel variant="on">
                                <Select
                                    name="province"
                                    v-model="selectedProvince"
                                    :options="provincesData"
                                    optionLabel="name"
                                    fluid
                                    showClear
                                    filter
                                />
                                <label for="province">Thành phố</label>
                            </FloatLabel>
                            <Message
                                v-if="$form.province?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.province.error.message }}</Message
                            >
                        </div>
                        <div
                            class="control"
                            v-show="!recruitModel.isDifferentAddess"
                        >
                            <FloatLabel variant="on">
                                <InputText
                                    name="address"
                                    type="text"
                                    fluid
                                    v-model="recruitModel.address"
                                />
                                <label for="address">Địa chỉ làm việc</label>
                            </FloatLabel>
                            <Message
                                v-if="$form.address?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.address.error.message }}</Message
                            >
                        </div>
                        <div
                            class="control"
                            v-show="!recruitModel.isDifferentAddess"
                        >
                            <FloatLabel variant="on">
                                <InputText
                                    name="linkGGMap"
                                    type="text"
                                    fluid
                                    v-model="recruitModel.linkGGMap"
                                />
                                <label for="linkGGMap">Link Google Map</label>
                            </FloatLabel>
                            <Message
                                v-if="$form.linkGGMap?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.linkGGMap.error.message }}</Message
                            >
                        </div>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                    <AccordionHeader
                        >Mô tả chi tiết về công việc</AccordionHeader
                    >
                    <AccordionContent
                        class="accordion-content"
                        style="font-family: unset"
                    >
                        <quill-editor
                            theme="snow"
                            ref="myQuill"
                            :toolbar="toolbarOptions"
                        ></quill-editor>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                    <AccordionHeader>Thông tin phụ</AccordionHeader>
                    <AccordionContent class="accordion-content">
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <Button label="Lưu" type="submit" />
        </Form>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, useTemplateRef, inject, computed, onBeforeUpdate, onMounted } from "vue";
import FieldService from "@/services/fieldservice.js";
import ProvinceService from "@/services/provinceservice.js";
import RecruitmentService from "@/services/recruitmentservice.js";
import Common from "@/helper/common.js";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { z } from "zod";

const emit = defineEmits(["close"]);
const props = defineProps({
    data: Object,
    mode: Number,
});

const toast = useToast();

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
];

const active = ref(["0"]);
const selectedField = ref(null);
const setLoading = inject("setLoading");
const reloadData = inject("reloadData");
const myQuill = useTemplateRef("myQuill");

const schema = computed(() => {
    return z.object({
        name: z
            .string()
            .min(1, { message: "Vui lòng nhập vị trí ứng tuyển." })
            .max(250, { message: "Không quá 250 ký tự." }),
        address: recruitModel.value.isDifferentAddess
            ? z.any().optional()
            : z
                  .string()
                  .min(1, { message: "Vui lòng nhập địa chỉ." })
                  .max(250, { message: "Không quá 250 ký tự." }),
        province: recruitModel.value.isDifferentAddess
            ? z.any().optional()
            : z.union([
                  z.object({
                      name: z.string().min(1, "Vui lòng chọn thành phố."),
                  }),
                  z.any().refine((val) => false, {
                      message: "Vui lòng chọn thành phố.",
                  }),
              ]),
        field: z.union([
            z.object({
                name: z.string().min(1, "Vui lòng chọn lĩnh vực."),
            }),
            z
                .any()
                .refine((val) => false, { message: "Vui lòng chọn lĩnh vực." }),
        ]),
        level: z.union([
            z.object({
                name: z.string().min(1, "Vui lòng chọn cấp bậc."),
            }),
            z
                .any()
                .refine((val) => false, { message: "Vui lòng chọn cấp bậc." }),
        ]),
        typeWorking: z.union([
            z.object({
                name: z.string().min(1, "Vui lòng chọn hình thức làm việc."),
            }),
            z.any().refine((val) => false, {
                message: "Vui lòng chọn hình thức làm việc.",
            }),
        ]),
        expiredDate: z.union([
            z
                .string()
                .min(1, { message: "Vui lòng chọn hạn ứng tuyển." })
                .refine((val) => !val, {
                    message: "Vui lòng chọn hạn ứng tuyển.",
                }),
            z.date(),
            z.any().refine((val) => null, {
                message: "Vui lòng chọn hạn ứng tuyển.",
            }),
        ]),
    });
});

let resolver = computed(() => {
    return zodResolver(schema.value);
});

const moneyType = [
    {
        name: "VNĐ",
        id: 0,
    },
    {
        name: "USD",
        id: 1,
    },
];

const selectedMoneyType = ref({
    name: "VNĐ",
    id: 0,
});

const salaryType = [
    {
        name: "Thỏa thuận",
        id: 0,
    },
    {
        name: "Trong khoảng",
        id: 1,
    },
    {
        name: "Chính xác",
        id: 2,
    },
];

const selectedSalaryType = ref({
    name: "Thỏa thuận",
    id: 0,
});

const experienceType = [
    {
        name: "Không yêu cầu kinh nghiệm",
        id: 0,
    },
    {
        name: "Có kinh nghiệm",
        id: 1,
    },
];

const selectedExperienceType = ref({
    name: "Không yêu cầu kinh nghiệm",
    id: 0,
});

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
        name: "Full-time",
        id: 0,
    },
    {
        name: "Part-time",
        id: 1,
    },
    {
        name: "Online",
        id: 2,
    },
];

const selectedTypeWorking = ref(null);
const responseProvice = await ProvinceService.getProvince();
// provincesData.value = responseProvice.data.map((item) => {
//     return {
//         code: item.id,
//         name: item.name,
//     };
// });
const provincesData = ref(
    responseProvice.data.map((item) => {
        return {
            id: item.id,
            name: item.name,
        };
    })
);

const selectedProvince = ref(null);

var response = await FieldService.getAll();
const fields = ref([...response]);

// const initialValues = ref({
//     name: "",
//     fromSalary: 0,
//     toSalary: 0,
//     address: "",
//     content: "",
//     experience: 0,
//     recruitNumber: 1,
//     isDifferentAddess: false,
//     linkGGMap: "",
//     province: null,
//     field: null,
//     level: null,
//     typeWorking: null,
//     expiredDate: null,
// });

let initialValues = computed(() => {
    if (props.data) {
        const temp = { ...props.data };
        temp.name = props.data.title;
        temp.expiredDate = props.data.expiredDate
            ? new Date(props.data.expiredDate)
            : null;
        temp.field = fields.value.find(
            (item) => item.id === props.data.fieldId
        );
        temp.level = levelType.find((item) => item.id === props.data.level);
        temp.typeWorking = typeWorkingType.find(
            (item) => item.id === props.data.typeWorking
        );
        if (!recruitModel.value.isDifferentAddess) {
            temp.province = provincesData.value.find(
                (item) => item.id * 1 === props.data.provinceId * 1
            );
        }
        return temp;
    }
    return {
        name: "",
        fromSalary: 0,
        toSalary: 0,
        address: "",
        content: "",
        experience: 0,
        recruitNumber: 1,
        isDifferentAddess: false,
        linkGGMap: "",
        province: null,
        field: null,
        level: null,
        typeWorking: null,
        expiredDate: null,
    };
});

onBeforeMount(async () => {
    try {
        setLoading(true);
        if (props.data) {
            recruitModel.value = {
                ...props.data,
            };
            recruitModel.value.name = props.data.title;
            recruitModel.value.expiredDate = props.data.expiredDate
                ? new Date(props.data.expiredDate)
                : null;
            selectedField.value = fields.value.find(
                (item) => item.id === props.data.fieldId
            );
            selectedSalaryType.value = salaryType.find(
                (item) => item.id === props.data.salaryType
            );
            selectedlevelType.value = levelType.find(
                (item) => item.id === props.data.level
            );
            selectedExperienceType.value = experienceType.find(
                (item) => item.id === props.data.experienceType
            );
            selectedTypeWorking.value = typeWorkingType.find(
                (item) => item.id === props.data.typeWorking
            );
            selectedMoneyType.value = moneyType.find(
                (item) => item.id === props.data.moneyType
            );
            if (!recruitModel.value.isDifferentAddess) {
                selectedProvince.value = provincesData.value.find(
                    (item) => item.id * 1 === props.data.provinceId * 1
                );
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
});

onMounted(() => {
    if(props.data && recruitModel.value.content) {
        myQuill.value.setHTML(recruitModel.value.content);
    }
})

const onFormSubmit = async (e) => {
    try {
        if (e.valid) {
            setLoading(true);
            const requestModel = {
                ...recruitModel.value,
            };
            requestModel.title = recruitModel.value.name;
            requestModel.fieldId = selectedField.value.id;
            requestModel.level = selectedlevelType.value.id;
            requestModel.typeWorking = selectedTypeWorking.value.id;
            requestModel.content = myQuill.value.getHTML();
            requestModel.salaryType = selectedSalaryType.value.id;
            requestModel.moneyType = selectedMoneyType.value.id;
            requestModel.experienceType = selectedExperienceType.value.id;
            requestModel.expiredDate = Common.convertToUTC(
                recruitModel.value.expiredDate
            );

            if (requestModel.experienceType === 0) {
                requestModel.experience = 0;
            }

            if (!recruitModel.value.isDifferentAddess) {
                requestModel.provinceId = selectedProvince.value.id;
                requestModel.provinceName = selectedProvince.value.name;
            }

            if (props.mode) {
                const id = props.data.id;
                await RecruitmentService.update(id, requestModel);
                toast.add({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Sửa thành công tin tuyển dụng",
                    life: 3000,
                });
            } else {
                await RecruitmentService.create(requestModel);
                toast.add({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Tạo thành công tin tuyển dụng",
                    life: 3000,
                });
            }
            e.reset();
            reloadData();
            emit("close");
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

const recruitModel = ref({
    name: "",
    fromSalary: 0,
    toSalary: 0,
    address: "",
    experience: 0,
    recruitNumber: 1,
    isDifferentAddess: false,
    linkGGMap: "",
    expiredDate: null,
});
</script>

<style>
.recruit-form-container {
    padding: 10px 0;
    box-sizing: border-box;
}

.accordion-content.flex-column .p-accordioncontent-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.recruit-form-container .control.grid-column {
    display: grid;
    grid-template-columns: 60% auto;
    column-gap: 10px;
}

.recruit-form-container .control.flex {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.p-select-list .p-select-empty-message {
    display: none !important;
}
</style>
