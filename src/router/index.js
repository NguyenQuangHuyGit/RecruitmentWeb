import { createRouter, createWebHistory } from "vue-router";
import SingIn from "@/views/auth/SignIn.vue";
import Main from "@/layouts/main/Main.vue";
import SignInRecuiter from "@/views/auth/SignInRecuiter.vue"
import SignUpRecuiter from "@/views/auth/SignUpRecruiter.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Main,
        },
        {
            path: "/user/auth",
            name: "user-auth",
            component: SingIn,
            props: to => ({ isSignIn: to.query.isSignIn || false })
        },
        {
            path: "/recruiter/sign-in",
            name: "recruiter-sign-in",
            component: SignInRecuiter
        },
        {
            path: "/recruiter/sign-up",
            name: "recruiter-sign-up",
            component: SignUpRecuiter
        },
    ],
});

export default router;
