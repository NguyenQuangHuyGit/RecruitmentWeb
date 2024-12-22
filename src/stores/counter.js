import { ref, computed } from "vue";
import { defineStore } from "pinia";
import userservice from "@/services/userservice.js";
import { AxiosError } from "axios";
import { useToast } from "primevue/usetoast";

export const useUserStore = defineStore("user", () => {
    const isAuthenticated = computed(() => user.value !== null);

    const user = ref(null);

    const toast = useToast();

    async function getUser(callback = null, isRedirect = false) {
        try {
            var response = await userservice.getByUser();
            isAuthenticated.value = true;
            user.value = {
                ...response,
                dateOfBirth: response.dateOfBirth
                    ? new Date(response.dateOfBirth)
                    : null,
            };
        } catch (error) {
            isAuthenticated.value = false;
            user.value = null;
            if (error.response && error.response.status === 401) {
                if (isRedirect) {
                    throw new AxiosError(error);
                }
            }
        } finally {
            callback && callback();
        }
        return user.value;
    }

    return { isAuthenticated, getUser, user };
});
