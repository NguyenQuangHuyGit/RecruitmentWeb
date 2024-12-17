<template>
    <div class="container-recruiter">
        <div class="container-left">
            <img src="@/assets/images/signInRecruit.png" alt="" />
        </div>
        <div class="container-right">
            <h2>Chào mừng nhà tuyển dụng quay trở lại</h2>
            <p>Hãy đăng nhập để bắt đầu tuyển dụng ngay</p>
            <div class="control-container">
                <Form
                    v-slot="$form"
                    :initialValues
                    :resolver
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
                            v-model="signInValues.password"
                        />
                        <Message
                            v-if="$form.password?.invalid"
                            severity="error"
                            size="small"
                            variant="simple"
                            >{{ $form.password.error.message }}</Message
                        >
                    </div>
                    <Button type="submit" label="Đăng nhập" />
                </Form>
            </div>
            <div class="control-footer">
                <p>Chưa có tài khoản?</p>
                <Button label="Đăng ký ngay" variant="link" @click="router.push({ name: 'recruiter-sign-up' })"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import router from "@/router";
import { useToast } from "primevue/usetoast";
import AuthService from "@/services/authservice.js";

const setLoading = inject('setLoading');

const toast = useToast();

const initialValues = ref({
    email: "",
    password: "",
});

const signInValues = ref({
    email: "",
    password: "",
});

const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Vui lòng nhập Email." })
        .email({ message: "Email không hợp lệ." }),
    password: z.string().min(1, { message: "Vui lòng nhập mật khẩu." }),
});
 
const resolver = zodResolver(signInSchema);

const onSignInFormSubmit = async ({ valid }) => {
    if (valid) {
        try {
            setLoading(true);
            const requestModel = { ...signInValues.value };
            requestModel.roleValid = "recruiter";
            await AuthService.signIn(requestModel);
            router.push({ name: 'recruiter' });
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
        }finally{
            setLoading(false);
        }
    }
};
</script>

<style>
.container-recruiter {
    display: flex;
    width: 100%;
    height: 100vh;
}

.container-recruiter .container-left {
    background-color: #f5f5f9;
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-recruiter .container-left img {
    object-fit: contain;
}

.container-recruiter .container-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    padding: 20px 50px;
    box-sizing: border-box;
}

@media only screen and (max-width: 960px) {
    .container-recruiter .container-left {
        width: 0;
    }

    .container-recruiter .container-left img {
        width: 0;
        height: 0;
    }
}

@media only screen and (max-width: 400px) {
    .container-recruiter .container-right {
        padding: 20px 15px;
    }
}

.container-recruiter .container-right h2 {
    color: #00b14f;
    font-size: 2em;
}

.container-recruiter .container-right p {
    color: #212f3f;
    font-size: 0.9em;
}

.container-recruiter .control-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.container-recruiter .control-footer button {
    padding: 0;
}

.container-recruiter .control-footer p {
    font-size: 1em;
}
</style>
