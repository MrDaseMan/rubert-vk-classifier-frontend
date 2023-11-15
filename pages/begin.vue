<template>
    <div class="wrapper">
        <transition name="slide-fade">
            <h1 v-if="isLoadedTitle">Осталось всего несколько <span>простых шагов</span></h1>
        </transition>
        <transition name="slide-fade">
            <div class="wrapper__step" ref="step1" v-if="isStep1">
                <h2>1. Необходимо получить твой <span>VK ID</span></h2>
                <p>Нажми на кнопку ниже и авторизируйся в нашем приложении при помощи VK (рекомендуем предварительно поработать с настройками приватности, чтобы у нашей нейросети был доступ к твоим подпискам).</p>
                <span class="error" v-if="isError">Что-то пошло не так. Попробуйте ещё раз!</span>
                <button @click="auth" v-if="!useUser().value.id">Войти</button>
                <p v-else>Твой VK ID: <span>{{ useUser().value.id }}</span></p>
            </div>
        </transition>

        <transition name="slide-fade">
            <div class="wrapper__step" ref="step2" v-if="useUser().value.id && isStep2">
                <h2>2. Наша нейросеть определит твою группу направлений</h2>
                <p>Нажми на кнопку ниже и мы определим группу направлений, которая подходит тебе. Группа определяется на основе твоих предпочтений (подписок на твоей странице) и ещё некоторых факторов.</p>
                <button @click="getGroups" v-if="!predicted_group && !isPredictionLoading">Получить группу</button>
                <p v-else-if="!isPredictionLoading">Твоя группа: <span>{{ predicted_group }}</span></p>
                <Loader v-else/>
            </div>
        </transition>

        <transition name="slide-fade">
            <div class="wrapper__step" ref="step3" v-if="useUser().value.id && predicted_group">
                <h2>3. Пройди небольшой тест ниже</h2>
                <p>Так ты получишь подробный отчет и рекомендации по выбору направления.</p>

                <form @submit.prevent v-for="(question, index) in questions" :key="question.question">
                    <h3 id="form-title">{{ question.question }}</h3>
                    <div id="test-amount-slider">
                        <input type="radio" :name="`question-${index}`" :id="`question-${index}-1`" value="1" required @click="question.answer = 1">
                        <label :for="`question-${index}-1`" data-test-amount="Точно нет"></label>
                        <input type="radio" :name="`question-${index}`" :id="`question-${index}-2`" value="2" required @click="question.answer = 2">
                        <label :for="`question-${index}-2`" data-test-amount=""></label>
                        <input type="radio" :name="`question-${index}`" :id="`question-${index}-3`" value="3" required checked @click="question.answer = 3">
                        <label :for="`question-${index}-3`" data-test-amount="Затрудняюсь ответить"></label>
                        <input type="radio" :name="`question-${index}`" :id="`question-${index}-4`" value="4" required @click="question.answer = 4">
                        <label :for="`question-${index}-4`" data-test-amount=""></label>
                        <input type="radio" :name="`question-${index}`" :id="`question-${index}-5`" value="5" required @click="question.answer = 5">
                        <label :for="`question-${index}-5`" data-test-amount="Точно да"></label>
                        <div id="test-amount-pos"></div>
                    </div>
                </form>

                <button @click="getReport">Отправить результаты</button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { useResults } from '~/composables/useResults';

const isError = ref(false);
const predicted_group = ref("");
const questions = ref([]);
const result = ref(null);

const step1 = ref(null);
const step2 = ref(null);
const step3 = ref(null);

const isLoadedTitle = ref(false);
const isStep1 = ref(false);
const isStep2 = ref(false);

const isPredictionLoading = ref(false);

onMounted(() => {
    isLoadedTitle.value = true;

    setTimeout(() => {
        isStep1.value = true;
    }, 250)

    if(useUser().value.id) {
        setTimeout(() => {
            isStep2.value = true;
            setTimeout(() => {
                step2.value.scrollIntoView({ behavior: 'smooth' });
            }, 500)
        }, 500)
    }
})

const auth = () => {
    isError.value = false;
    VK.Auth.login((response) => {
        if (response.status === 'connected') {
            useUser().value = response.session.user;
            console.log(useUser().value);
    
            isStep2.value = true;
            // scroll to step-2
            setTimeout(() => {
                step2.value.scrollIntoView({ behavior: 'smooth' });
            }, 500)
        } else {
            console.log(response);
            isError.value = true;
        }
    }, 2);
}

const getGroups = async () => {
    isPredictionLoading.value = true;
    let result = await useGetGroups();
    if (result.result.group && result.result.questions) {
        predicted_group.value = ('00'+result.result.group).slice(-2);
        console.log(result.result.questions);
        result.result.questions.forEach(question => {
            questions.value.push({
                question: question.question,
                group: ('00' + question.group).slice(-2),
                answer: 0
            })
        })
    }

    setTimeout(() => {
        step3.value.scrollIntoView({ behavior: 'smooth' });
    }, 500)

    isPredictionLoading.value = false;
}

const getReport = async () => {
    //TODO: Remove
    result.value = {
        edu_program: "Тестовое направление",
        subjects: ["Тестовый предмет 1", "Тестовый предмет 2", "Тестовый предмет 3"]
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
.error {
    color: var(--yw-clr-red);
    font-weight: bold;

    font-size: 16px;
}

.wrapper__step {
    margin-top: 32px;

    display: flex;

    flex-direction: column;

    gap: 20px;

    & > button {
        align-self: flex-start;
    }
}
</style>