<template>
    <div class="container-signup-recruiter">
        <div class="container-left">
            <img src="@/assets/images/signUpRecruit.png" alt="" />
        </div>
        <div class="container-right">
            <div class="container-right-temp">
                <p class="title">Đăng ký tài khoản nhà tuyển dụng</p>
                <p>
                    Đăng ký tài khoản ngay để khiến việc tìm kiếm ứng viên tài
                    năng cho công ty của bạn trở nên dễ dàng
                </p>
                <div class="control-container">
                    <Form
                        v-slot="$form"
                        :initialValues
                        :resolver
                        @submit="onFormSubmit"
                        style="display: flex; flex-direction: column; gap: 16px"
                    >
                        <Fieldset
                            legend="Thông tin tài khoản"
                            class="control-container-legend"
                        >
                            <div class="control">
                                <FloatLabel variant="on">
                                    <InputText
                                        name="email"
                                        type="text"
                                        fluid
                                        size="large"
                                        v-model="signUpValues.email"
                                    />
                                    <label for="email">Email *</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.email?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.email.error.message }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Password
                                        name="password"
                                        :feedback="false"
                                        toggleMask
                                        fluid
                                        size="large"
                                        v-model="signUpValues.password"
                                    />
                                    <label for="phone">Mật khẩu *</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.password?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                >
                                    <ul class="password-option">
                                        <li
                                            v-for="(error, index) of $form
                                                .password.errors"
                                            :key="index"
                                        >
                                            {{ error.message }}
                                        </li>
                                    </ul>
                                </Message>
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Password
                                        name="confirmPassword"
                                        :feedback="false"
                                        toggleMask
                                        fluid
                                        size="large"
                                    />
                                    <label for="phone"
                                        >Xác nhận mật khẩu *</label
                                    >
                                </FloatLabel>
                                <Message
                                    v-if="$form.confirmPassword?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{
                                        $form.confirmPassword.error.message
                                    }}</Message
                                >
                            </div>
                        </Fieldset>
                        <Fieldset
                            legend="Thông tin người tuyển dụng"
                            class="control-container-legend"
                        >
                            <div class="control">
                                <FloatLabel variant="on">
                                    <InputText
                                        name="fullName"
                                        type="text"
                                        v-model="signUpValues.fullName"
                                        fluid
                                        size="large"
                                    />
                                    <label for="fullName"
                                        >Họ tên nhà tuyển dụng *</label
                                    >
                                </FloatLabel>
                                <Message
                                    v-if="$form.fullName?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.fullName.error.message }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <InputText
                                        name="phoneNumber"
                                        type="text"
                                        fluid
                                        v-model="signUpValues.phoneNumber"
                                        size="large"
                                    />
                                    <label for="phoneNumber"
                                        >Số điện thoại *</label
                                    >
                                </FloatLabel>
                                <Message
                                    v-if="$form.phoneNumber?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{
                                        $form.phoneNumber.error.message
                                    }}</Message
                                >
                            </div>
                        </Fieldset>
                        <Fieldset
                            legend="Thông tin công ty"
                            class="control-container-legend"
                        >
                            <div class="control">
                                <FloatLabel variant="on">
                                    <InputText
                                        name="companyName"
                                        type="text"
                                        v-model="signUpValues.companyName"
                                        fluid
                                        size="large"
                                    />
                                    <label for="companyName"
                                        >Tên công ty *</label
                                    >
                                </FloatLabel>
                                <Message
                                    v-if="$form.companyName?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{
                                        $form.companyName.error.message
                                    }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Select
                                        name="province"
                                        v-model="signUpValues.province"
                                        :options="provincesData"
                                        optionLabel="name"
                                        fluid
                                        showClear
                                        editable
                                        size="large"
                                    />
                                    <label for="province">Thành phố *</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.province?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.province.error.message }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <Select
                                        name="district"
                                        v-model="signUpValues.district"
                                        :options="districtsData"
                                        optionLabel="name"
                                        fluid
                                        editable
                                        showClear
                                        size="large"
                                        :loading="isLoadingDistrict"
                                        :disabled="
                                            !checkValidProvince ||
                                            isLoadingDistrict
                                        "
                                    />
                                    <label for="district">Quận/Huyện *</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.district?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.district.error.message }}</Message
                                >
                            </div>
                            <div class="control">
                                <FloatLabel variant="on">
                                    <InputText
                                        name="address"
                                        type="text"
                                        fluid
                                        v-model="signUpValues.address"
                                        size="large"
                                    />
                                    <label for="address">Địa chỉ *</label>
                                </FloatLabel>
                                <Message
                                    v-if="$form.address?.invalid"
                                    severity="error"
                                    size="small"
                                    variant="simple"
                                    >{{ $form.address.error.message }}</Message
                                >
                            </div>
                        </Fieldset>
                        <Button type="submit" label="Đăng ký" />
                    </Form>
                </div>
                <div class="control-footer">
                    <p>Đã có tài khoản</p>
                    <Button
                        label="Đăng nhập ngay"
                        variant="link"
                        @click="router.push({ name: 'recruiter-sign-in' })"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import router from "@/router";
import ProvinceService from "@/services/provinceservice.js";
import AuthService from "@/services/authservice.js";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const initialValues = ref({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    province: null,
    district: null,
    address: "",
});

const signUpValues = ref({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    phoneNumber: "",
    province: null,
    district: null,
    address: "",
});

const isLoadingDistrict = ref(false);

watch(
    () => signUpValues.value.province,
    async (province) => {
        if (province && typeof province === "object") {
            try {
                isLoadingDistrict.value = true;
                const response = await ProvinceService.getDistrictByProvinceId(
                    province.code
                );
                districtsData.value = response.data.map((item) => {
                    return {
                        code: item.id,
                        name: item.name,
                    };
                });
            } catch (error) {
                isLoadingDistrict.value = false;
                districtsData.value = [];
            } finally {
                isLoadingDistrict.value = false;
            }
        } else {
            province = { name: "" };
            districtsData.value = [];
            signUpValues.value.district = "";
        }
    }
);

const provincesData = ref();
const districtsData = ref();

onMounted(async () => {
    const response = await ProvinceService.getProvince();
    provincesData.value = response.data.map((item) => {
        return {
            code: item.id,
            name: item.name,
        };
    });
});

const validatePasswordConfirmation = (confirmPassword) => {
    return signUpValues.value.password === confirmPassword;
};

const checkValidProvince = computed(() => {
    if (
        !signUpValues.value.province ||
        typeof signUpValues.value.province === "string"
    ) {
        return false;
    }
    return true;
});

const signUpSchema = computed(() => {
    return z.object({
        fullName: z
            .string()
            .min(1, { message: "Vui lòng nhập họ tên." })
            .max(250, { message: "Không quá 250 ký tự." }),
        companyName: z
            .string()
            .min(1, { message: "Vui lòng nhập tên công ty." })
            .max(250, { message: "Không quá 250 ký tự." }),
        email: z
            .string()
            .min(1, { message: "Vui lòng nhập Email." })
            .email({ message: "Email không hợp lệ." }),
        password: z
            .string()
            .min(8, { message: "Chứa tối thiểu 8 ký tự." })
            .max(16, { message: "Chứa tối đa 16 ký tự." })
            .refine((value) => /[a-z]/.test(value), {
                message: "Chứa ít nhất 1 ký tự thường.",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Chứa ít nhất 1 ký tự hoa.",
            })
            .refine((value) => /^(?=.*\d).*$/.test(value), {
                message: "Chứa ít nhất 1 ký tự số.",
            })
            .refine(
                (value) =>
                    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*/.test(value),
                {
                    message: "Chứa ít nhất 1 ký tự đặc biệt.",
                }
            ),
        confirmPassword: z
            .string()
            .refine((value) => validatePasswordConfirmation(value), {
                message: "Mật khẩu xác nhận không khớp",
            }),
        phoneNumber: z
            .string()
            .min(1, { message: "Vui lòng nhập Số điện thoại." })
            .refine((value) => /^\d+$/.test(value), {
                message: "Chỉ chứa kí tự số.",
            })
            .refine((value) => /.{7,}/.test(value), {
                message: "Chứa tối thiểu 7 ký tự.",
            })
            .refine((value) => /^.{0,15}$/.test(value), {
                message: "Chứa tối đa 15 ký tự.",
            }),
        province: z.union([
            z.object({
                name: z
                    .string()
                    .min(1, { message: "Vui lòng chọn thành phố." }),
            }),
            z
                .string()
                .min(1, { message: "Vui lòng chọn thành phố." })
                .refine((val) => !val, {
                    message: "Dữ liệu thành phố không khớp.",
                }),
            z
                .any()
                .refine((val) => null, { message: "Vui lòng chọn thành phố." }),
        ]),
        district: checkValidProvince.value
            ? z.union([
                  z.object({
                      name: z.string().min(1, "Vui lòng chọn quận/huyện."),
                  }),
                  z
                      .string()
                      .min(1, { message: "Vui lòng chọn quận/huyện." })
                      .refine((val) => !val, {
                          message: "Dữ liệu quận/huyện không khớp.",
                      }),
                  z.any().refine((val) => null, {
                      message: "Vui lòng chọn quận/huyện.",
                  }),
              ])
            : z.any().optional(),
        address: z
            .string()
            .min(1, { message: "Vui lòng nhập địa chỉ công ty." })
            .max(250, { message: "Không quá 250 ký tự." }),
    });
});

let resolver = computed(() => {
    return zodResolver(signUpSchema.value);
});

const onFormSubmit = async ({ valid }) => {
    if (valid) {
        try {
            var data = {
                fullName: signUpValues.value.fullName,
                email: signUpValues.value.email,
                password: signUpValues.value.password,
                phoneNumber: signUpValues.value.phoneNumber,
                company: {
                    name: signUpValues.value.companyName,
                    province: signUpValues.value.province.code,
                    district: signUpValues.value.district.code,
                    address: signUpValues.value.address,
                },
            };
            await AuthService.signUpRecruiter(data);
            toast.add({
                severity: "success",
                summary: "Thành công",
                detail: "Bạn đã tạo thành công tài khoản nhà tuyển dụng",
                life: 3000,
            });
        } catch (error) {
            if (error.status) {
                switch (error.status) {
                    case 409:
                        toast.add({
                            severity: "error",
                            summary: "Lỗi nhập liệu",
                            detail: "Email đã tồn tại",
                            life: 3000,
                        });
                        break;
                    default:
                        toast.add({
                            severity: "error",
                            summary: "Lỗi hệ thống",
                            detail: "Vui lòng thử lại sau ít phút",
                            life: 3000,
                        });
                        break;
                }
            } else {
                toast.add({
                    severity: "error",
                    summary: "Lỗi hệ thống",
                    detail: "Vui lòng thử lại sau ít phút",
                    life: 3000,
                });
            }
            console.log(error);
        }
    }
};
</script>

<style>
.container-signup-recruiter .control-container-legend .p-fieldset-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
}

.container-signup-recruiter .control {
    box-sizing: border-box;
}

.container-signup-recruiter {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
}

.container-signup-recruiter .container-left {
    background-color: #f5f5f9;
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
}

.container-signup-recruiter .container-left img {
    object-fit: contain;
}

.container-signup-recruiter .container-right {
    flex: 1;
    padding: 20px 50px;
    overflow: auto;
    box-sizing: border-box;
}

.container-right-temp {
    height: 100%;
    min-height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    box-sizing: border-box;
}

@media only screen and (max-width: 1000px) {
    .container-signup-recruiter .container-left {
        width: 0;
    }

    .container-signup-recruiter .container-left img {
        width: 0;
        height: 0;
    }
}

@media only screen and (max-width: 400px) {
    .container-signup-recruiter .container-right {
        padding: 20px 15px;
    }
}

.container-signup-recruiter .container-right .title {
    color: #00b14f;
    font-size: 2em;
}

.container-signup-recruiter .container-right p {
    color: #212f3f;
    font-size: 0.9em;
}

.container-signup-recruiter .control-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.container-signup-recruiter .control-footer button {
    padding: 0;
}

.container-signup-recruiter .control-footer p {
    font-size: 1em;
}
</style>
