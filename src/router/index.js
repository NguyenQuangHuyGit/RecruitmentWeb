import { createRouter, createWebHistory } from "vue-router";
import SingIn from "@/views/auth/SignIn.vue";
import Main from "@/layouts/main/Main.vue";
import SignInRecuiter from "@/views/auth/SignInRecuiter.vue";
import SignUpRecuiter from "@/views/auth/SignUpRecruiter.vue";
import TheRecruit from "@/views/recruit/TheRecruit.vue";
import RecruitDetail from "@/components/recruit/RecruitDetail.vue";
import Home from "@/views/home/Home.vue";
import RecuitMain from '@/components/recruit/RecuitMain.vue';
import ListUserApply from '@/components/user/ListUserApply.vue';
import SearchRecruit from "@/components/home/SearchRecruit.vue";
import RecruitmentApplied from "@/components/home/RecruitmentApplied.vue";
import RecruimentUser from "@/components/user/RecruimentUser.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import ListComapny from "@/components/company/ListComapny.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            components: {
                root: Main
            },
            children: [
                {
                    path: '',
                    name: "main",
                    components: {
                        mainview: Home
                    },
                },
                {
                    path: "/recruitment/:id",
                    name: "recruiter-detail",
                    props: (to) => ({ id: to.params.id }),
                    components: {
                        mainview: RecruitDetail
                    }
                },
                {
                    path: "/recruitment",
                    name: "recruiter-search",
                    components: {
                        mainview: SearchRecruit
                    }
                },
                {
                    path: "/profile",
                    name: "profile",
                    props: (to) => ({ id: to.params.id }),
                    components: {
                        mainview: RecruitmentApplied
                    },
                    children: [
                        {
                            path: "",
                            name:"user-profile",
                            components: {
                                "user-profile": UserProfile
                            }
                        },
                        {
                            path: "/profile/job",
                            name: "user-job",
                            components: {
                                "user-profile": RecruimentUser
                            }
                        },
                        {
                            path: "/profile/company",
                            name: "list-company",
                            components: {
                                "user-profile": ListComapny
                            }
                        },
                    ]
                },
            ]
        },
        {
            path: "/user/auth",
            name: "user-auth",
            components: {
                root: SingIn
            },
            props: (to) => ({ isSignIn: to.query.isSignIn || false }),
        },
        {
            path: "/recruiter/sign-in",
            name: "recruiter-sign-in",
            components: {
                root: SignInRecuiter
            },
        },
        {
            path: "/recruiter/sign-up",
            name: "recruiter-sign-up",
            components: {
                root: SignUpRecuiter
            },
        },
        {
            path: "/recruiter",
            name: "recruiter",
            components: {
                root: TheRecruit,
                recruiterview: RecuitMain
            },
            children: [
                {
                    path: '',
                    name: "recruiter-mannage",
                    components: {
                        recruiterview: RecuitMain
                    },
                },
                {
                    path: "/recruitment/:id/user-list",
                    name: "user-list",
                    props: (to) => ({ id: to.params.id }),
                    components: {
                        recruiterview: ListUserApply
                    }
                },
            ]
        },
    ],
});

export default router;
