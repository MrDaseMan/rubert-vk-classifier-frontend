<template>
    <div class="wrapper">
        <Transition name="notification-slide-fade">
            <div v-if="isError" class="notify-error">
                Произошла ошибка при отправке запроса, пожалуйста, повторите попытку позже!
            </div>
        </Transition>
        <ClientOnly>
            <form v-for="(question, index) in getQuestions" :key="question.question">
                <p class="question">{{ question.question }}</p>
                <div id="test-amount-slider">
                    <input type="radio" :name="`question-${index}`" :id="`question-${index}-1`" value="1" required @click="question.answer = 1">
                    <label class="first" :for="`question-${index}-1`" data-test-amount="Нет"></label>
                    <input type="radio" :name="`question-${index}`" :id="`question-${index}-2`" value="2" required @click="question.answer = 2">
                    <label class="second" :for="`question-${index}-2`" data-test-amount=""></label>
                    <input type="radio" :name="`question-${index}`" :id="`question-${index}-3`" value="3" required checked @click="question.answer = 3">
                    <label class="third" :for="`question-${index}-3`" data-test-amount="Может быть"></label>
                    <input type="radio" :name="`question-${index}`" :id="`question-${index}-4`" value="4" required @click="question.answer = 4">
                    <label class="fourth" :for="`question-${index}-4`" data-test-amount=""></label>
                    <input type="radio" :name="`question-${index}`" :id="`question-${index}-5`" value="5" required @click="question.answer = 5">
                    <label class="fifth" :for="`question-${index}-5`" data-test-amount="Да"></label>
                    <div id="test-amount-pos"></div>
                </div>
            </form>

            <template #fallback>
                <Loader/>
            </template>
        </ClientOnly>
        <div class="buttons">
            <button @click="$router.push('/prediction')">Назад</button>
            <button @click="answer()">Ответить</button>
        </div>
    </div>
</template>

<script setup>
//Set layout
definePageMeta({
    layout: 'centered',
})

onMounted(() => {

    if(!useUser().value?.id) {
        navigateTo('/auth');
        return;
    }

    if(!useGroup().value?.selected_id === undefined || useGroup().value?.selected_id === null) {
        navigateTo('/auth');
        return;
    }

    if(!useGroup().value?.groups.length) {
        navigateTo('/auth');
        return;
    }

    if(!useGroup().value?.groups[useGroup().value.selected_id].questions?.length) {
        navigateTo('/auth');
        return;
    }

    useGroup().value?.groups[useGroup().value.selected_id].questions.forEach(question => {
        question.answer = 3;
    })
});


const isError = ref(false);

const getQuestions = computed(() => {
    // return randomized array
    return useGroup().value?.groups[useGroup().value.selected_id].questions.sort(function(){
        return Math.random() - 0.5;
    });
})

const answer = async () => {
    let result = await usePostProgram(getQuestions.value);

    if(!result || !result.status) {
        // useError().value = result.error;
        // navigateTo('/error');
        // return;

        isError.value = true;
        isFetching.value = false;

        setTimeout(() => {
            isError.value = false;
        }, 10000);
        return;
    }

    useResults().value = result.result;
    navigateTo('/results')
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    margin-top: 48px;
    margin-bottom: 48px;

    & > form {
        border: none;
        box-shadow: none;

        & > p {
            color: var(--yw-clr-black);
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%; /* 26.4px */
            letter-spacing: -0.6px;

            text-align: start;

            @media (max-width: 480px) {
                font-size: 18px;
                line-height: 110%; /* 20.8px */
                letter-spacing: -0.4px;
            }
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;

    width: 100%;

    gap: 20px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
    
    & > button {
        width: 100%;

        &:first-child {
            background: #E5F3FB;
            color: black;

            &::before {
                background: rgba(69,180,242,1);
            }
        }
    }
}
</style>