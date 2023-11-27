<template>
    <div>
        <div class="wrapper">
            <h1>
                Войдите в свою страницу ВК
            </h1>
            <p>
                Мы проанализируем данные с вашей страницы и передадим их в нейронную сеть
            </p>
            <div class="error" v-if="isError">
                Произошла ошибка при авторизации, пожалуйста, повторите попытку позже.
            </div>
            <button @click="auth">
                Войти
            </button>
        </div>
        <LazySvgBgVkDark class="bg"/>
    </div>
</template>

<script setup>
//Set layout
definePageMeta({
    layout: 'centered',
})

const isError = ref(false);

const questions = ref([]);
const result = ref(null);


const auth = () => {
    isError.value = false;
    VK.Auth.login((response) => {
        if (response.status === 'connected') {
            useUser().value = response.session.user;
            navigateTo('/prediction');
        } else {
            isError.value = true;
        }
    }, 2);
}

const getReport = async () => {
    //TODO: Remove
    result.value = {
        edu_program: "Тестовое направление",
        subjects: ["Тестовый предмет 1", "Тестовый предмет 2", "Тестовый предмет 3"],
        professions: ["Тестовая профессия 1", "Тестовая профессия 2", "Тестовая профессия 3"]
    };
    useResults().value = result.value;
    useRouter().push('/results');
    return;

    result.value = (await usePostProgram(questions.value)).result;
    
    useResults().value = result.value;
    useRouter().push('/results');
}
</script>

<style lang="scss" scoped>
.bg {
    position: absolute;
    left: -4%;
    bottom: 0;
    width: 50%;
    height: 50%;

    z-index: 0;

    @media (max-width: 768px) {
        display: none;        
    }
}
</style>