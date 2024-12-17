<template>
    <div class="sign-in">
        <div class="overlay-template" v-if="isDelay"></div>
        <div class="container" :class="{ 'right-panel-active': isSignIn }">
            <div class="container-left sign-up-container">
                <h2>Đăng ký</h2>
                <div class="form-control">
                    <Form
                        v-slot="$form"
                        :initialValues
                        :resolver
                        @submit="onFormSubmit"
                        style="display: flex; flex-direction: column; gap: 16px"
                    >
                        <div class="control">
                            <InputText
                                name="fullName"
                                type="text"
                                placeholder="Họ tên"
                                fluid
                                v-model="signUpValues.fullName"
                            />
                            <Message
                                v-if="$form.fullName?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.fullName.error.message }}</Message
                            >
                        </div>
                        <div class="control">
                            <InputText
                                name="email"
                                type="text"
                                placeholder="Email"
                                fluid
                                v-model="signUpValues.email"
                            />
                            <Message
                                v-if="$form.email?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form.email.error.message }}</Message
                            >
                        </div>
                        <div class="control">
                            <Password
                                name="password"
                                placeholder="Mật khẩu"
                                :feedback="false"
                                toggleMask
                                fluid
                                v-model="signUpValues.password"
                            />
                            <Message
                                v-if="$form.password?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                            >
                                <ul class="password-option">
                                    <li
                                        v-for="(error, index) of $form.password
                                            .errors"
                                        :key="index"
                                    >
                                        {{ error.message }}
                                    </li>
                                </ul>
                            </Message>
                        </div>
                        <div class="control">
                            <Password
                                name="confirmPassword"
                                placeholder="Xác nhận mật khẩu"
                                :feedback="false"
                                toggleMask
                                fluid
                            />
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
                        <Button type="submit" label="Đăng ký" />
                    </Form>
                </div>
            </div>
            <div class="container-right sign-in-container">
                <h2>Đăng Nhập</h2>
                <div class="form-control">
                    <Form
                        v-slot="$form1"
                        :initialValues="initialValuesSignIn"
                        :resolver="resolverSignIn"
                        @submit="onSignInFormSubmit"
                        style="display: flex; flex-direction: column; gap: 16px"
                    >
                        <div class="control">
                            <InputText
                                name="email"
                                type="text"
                                placeholder="Email"
                                fluid
                                v-model="signInValues.email"
                            />
                            <Message
                                v-if="$form1.email?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form1.email.error.message }}</Message
                            >
                        </div>
                        <div class="control">
                            <Password
                                name="password"
                                placeholder="Mật khẩu"
                                :feedback="false"
                                toggleMask
                                fluid
                                v-model="signInValues.password"
                            />
                            <Message
                                v-if="$form1.password?.invalid"
                                severity="error"
                                size="small"
                                variant="simple"
                                >{{ $form1.password.error.message }}</Message
                            >
                        </div>
                        <Button type="submit" label="Đăng nhập" />
                    </Form>
                </div>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Chào mừng trở lại!</h1>
                        <p>
                            Hãy đăng nhập để bắt đầu tìm kiếm việc làm ngày nào
                        </p>
                        <Button
                            label="Chưa có tài khoản"
                            @click="test($event)"
                            style="
                                background-color: transparent;
                                border-color: #fff;
                            "
                        />
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Chào bạn mới!</h1>
                        <p>
                            Đăng ký thông tin tài khoản ngay để tìm kiếm việc
                            làm mong muốn nhé
                        </p>
                        <Button
                            label="Đã có tài khoản"
                            @click="test($event)"
                            style="
                                background-color: transparent;
                                border-color: #fff;
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import AuthService from "@/services/authservice.js";
import { useRoute } from "vue-router";
import router from "@/router";
import { useToast } from "primevue/usetoast";

const setLoading = inject("setLoading");

const toast = useToast();

const route = useRoute();
const props = defineProps(["isSignIn"]);

const isDelay = ref(true);
const isSignIn = ref(props.isSignIn ?? false);

onMounted(() => {
    setTimeout(() => {
        isDelay.value = false;
    }, 500);
});

const test = () => {
    isSignIn.value = !isSignIn.value;
    router.replace({
        path: route.path,
        query: { isSignIn: isSignIn.value },
    });
};

const initialValues = ref({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const initialValuesSignIn = ref({
    email: "",
    password: "",
});

const signUpValues = ref({
    fullName: "",
    email: "",
    password: "",
});

const signInValues = ref({
    email: "",
    password: "",
});

const validatePasswordConfirmation = (confirmPassword) => {
    return signUpValues.value.password === confirmPassword;
};

const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Vui lòng nhập Email." })
        .email({ message: "Email không hợp lệ." }),
    password: z.string().min(1, { message: "Vui lòng nhập mật khẩu." }),
});

const resolverSignIn = zodResolver(signInSchema);

const signUpSchema = z.object({
    fullName: z.string().min(1, { message: "Vui lòng nhập họ tên." }),
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
            (value) => /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*/.test(value),
            {
                message: "Chứa ít nhất 1 ký tự đặc biệt.",
            }
        ),
    confirmPassword: z
        .string()
        .refine((value) => validatePasswordConfirmation(value), {
            message: "Mật khẩu xác nhận không khớp",
        }),
});

const resolver = zodResolver(signUpSchema);

const onFormSubmit = async (e) => {
    if (e.valid) {
        try {
            setLoading(true);
            await AuthService.signUp(signUpValues.value);
            router.push({ name: 'main' });
            toast.add({
                severity: "success",
                summary: "Thành công",
                detail: "Bạn đã tạo thành công tài khoản",
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
        } finally {
            setLoading(false);
        }
    }
};

const onSignInFormSubmit = async ({ valid }) => {
    if (valid) {
        try {
            setLoading(true);
            const requestModel = { ...signInValues.value };
            requestModel.roleValid = "user";
            await AuthService.signIn(requestModel);
            router.push({ name: 'main' });
        } catch (error) {
            if (error.status) {
                switch (error.status) {
                    case 400:
                        toast.add({
                            severity: "error",
                            summary: "Lỗi nhập liệu",
                            detail: "Tài khoản hoặc mật khẩu không đúng",
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
        } finally {
            setLoading(false);
        }
    }
};
</script>

<style>
.sign-in {
    width: 100%;
    height: 100vh;
    background-color: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sign-in .overlay-template {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f6f5f7;
    z-index: 101;
}

.sign-in .container {
    position: relative;
    width: 50%;
    height: max-content;
    min-height: 70%;
    background-color: #ffffff;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 8px;
}

.control {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@media only screen and (max-width: 1400px) {
    .sign-in .container {
        width: 70%;
    }
}

@media only screen and (max-width: 1200px) {
    .sign-in .container {
        width: 80%;
    }
}

@media only screen and (max-width: 1000px) {
    .sign-in .container {
        width: 90%;
    }
}

.sign-in .container-left {
    background-color: #fff;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 15px;
    box-sizing: border-box;
    border-radius: 8px 0 0 8px;
    gap: 20px;
    justify-content: center;
    transition: all 0.6s ease-in-out;
    position: absolute;
}

@media only screen and (max-width: 600px) {
    .sign-in .container {
        width: 90%;
    }
}

.form-control {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 20px;
}

.form-control-username,
.form-control-password {
    width: 100%;
}

input {
    width: 100% !important;
}

.sign-in .container-right {
    position: absolute;
    justify-content: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 15px;
    box-sizing: border-box;
    border-radius: 0 8px 8px 0;
    gap: 20px;
    background-color: #fff;
    transition: all 0.6s ease-in-out;
}

.sign-in .container h2 {
    color: #000;
    font-family: Roboto-Medium;
}

.password-option {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style-type: none;
    padding: 0;
    font-size: 0.9em;
    padding-left: 5px;
}

.sign-in .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 2;
    height: 100%;
}

.sign-in .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
}

.sign-in .sign-in-container {
    left: 0;
    opacity: 0;
    z-index: 1;
    height: 100%;
    width: 50%;
}

.sign-in .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.sign-in .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.sign-in .overlay {
    background: #ff416c;
    background: linear-gradient(to right, #43e97b, #38f9d7);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.sign-in .container.right-panel-active .overlay {
    transform: translateX(50%);
}

.sign-in .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.sign-in .overlay-panel h1,
.sign-in .overlay-panel p {
    font-family: Roboto-Medium;
}

.sign-in .overlay-left {
    transform: translateX(-20%);
}

.sign-in .container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.sign-in .overlay-right {
    right: 0;
    transform: translateX(0);
}

.sign-in .container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
</style>
