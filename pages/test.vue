<template>
    <div class="wrapper">
        <Transition name="notification-slide-fade">
            <div v-if="isError" class="notify-error">
                Произошла ошибка при отправке запроса, пожалуйста, повторите попытку позже!
            </div>
        </Transition>
        <ClientOnly>
            <form v-for="(question, index) in getQuestions" :key="question.question" :id="`test-question-${index}`" class="question-wrapper" :class="{'question-wrapper-active': active_question === index}">
                <p class="question">{{ question.question }}</p>
                <div class="test-question">
                    <span>Нет</span>
                    <div class="test-question__answers">
                        <label :for="`question-${index}-1`" :class="{'test-question__answers-checked': question.answer === 1}">
                            <SvgCheck v-if="question.answer === 1"/>
                        </label>
                        <input type="radio" :name="`question-${index}-1`" :id="`question-${index}-1`" value="1" required @click="question.answer = 1; goToNextQuestion(index)">
                        <label :for="`question-${index}-2`" :class="{'test-question__answers-checked': question.answer === 2}">
                            <SvgCheck v-if="question.answer === 2"/>
                        </label>
                        <input type="radio" :name="`question-${index}-2`" :id="`question-${index}-2`" value="2" required @click="question.answer = 2; goToNextQuestion(index)">
                        <label :for="`question-${index}-3`" :class="{'test-question__answers-checked': question.answer === 3}">
                            <SvgCheck v-if="question.answer === 3"/>
                        </label>
                        <input type="radio" :name="`question-${index}-3`" :id="`question-${index}-3`" value="3" required checked @click="question.answer = 3; goToNextQuestion(index)">
                        <label :for="`question-${index}-4`" :class="{'test-question__answers-checked': question.answer === 4}">
                            <SvgCheck v-if="question.answer === 4"/>
                        </label>
                        <input type="radio" :name="`question-${index}-4`" :id="`question-${index}-4`" value="4" required @click="question.answer = 4; goToNextQuestion(index)">
                        <label :for="`question-${index}-5`" :class="{'test-question__answers-checked': question.answer === 5}">
                            <SvgCheck v-if="question.answer === 5"/>
                        </label>
                        <input type="radio" :name="`question-${index}-5`" :id="`question-${index}-5`" value="5" required @click="question.answer = 5; goToNextQuestion(index)">
                    </div>
                    <span>Да</span>
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

const goToNextQuestion = (index) => {
    const nextQuestion = document.getElementById(`test-question-${index + 1}`);
    if(nextQuestion) {
        nextQuestion.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        active_question.value = index + 1;
    }
}

const active_question = ref(0);

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

    nextTick(() => {
        const firstQuestion = document.getElementById(`test-question-1`);
        if(firstQuestion) {
            firstQuestion.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
    })
});


const isError = ref(false);

const getQuestions = computed(() => {
    return useGroup().value?.groups[useGroup().value.selected_id].questions;
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

        display: flex;
        flex-direction: column;
        gap: 24px;

        & > p {
            color: var(--yw-clr-black);
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%; /* 26.4px */
            letter-spacing: -0.6px;

            text-align: center;

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

.test-question {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px; 
    
    @media (max-width: 568px) {
        flex-wrap: wrap;
    }

    & > span {
        width: 100%;
        max-width: 142px;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.5px;

        color: rgba(0, 0, 0, 0.60);

        text-align: center;

        @media (max-width: 568px) {
            width: fit-content;

            font-size: 14px;
            line-height: 110%;

            &:first-child {
                text-align: start;
            }

            &:last-child {
                text-align: end;
            }
        }
    }

    &__answers {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 16px;

        @media (max-width: 568px) {
            order: 3;
        }

        & > input {
            display: none;
        }

        & > label {
            position: relative;

            width: 32px;
            height: 32px;
            border-radius: 50%;

            margin: 0;

            display: flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;
        }

        & > label:nth-child(1 of label) { 
            border: 2px solid var(--yw-clr-red);

            width: 64px;
            height: 64px;
            
            padding: 20px;

            &.test-question__answers-checked {
                background: var(--yw-clr-red);
            }

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0) scale(0);
                width: 64px;
                height: 64px;
                background: var(--yw-clr-red);
                border-radius: 50%;
                transition: 0.25s;
                z-index: -1;
            }

            &:hover {
                &::before {
                    z-index: -1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }
        }

        & > label:nth-child(2 of label) {
            border: 2px solid var(--yw-clr-red);

            width: 44px;
            height: 44px;

            padding: 10px;

            padding: 4px;

            &.test-question__answers-checked {
                background: var(--yw-clr-red);
            }

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0) scale(0);
                width: 44px;
                height: 44px;
                background: var(--yw-clr-red);
                border-radius: 50%;
                transition: 0.25s;
                z-index: -1;
            }

            &:hover {
                &::before {
                    z-index: -1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }
        }

        & > label:nth-child(3 of label) {
            border: 2px solid var(--yw-clr-black);

            &.test-question__answers-checked {
                background: var(--yw-clr-black);
            }

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0) scale(0);
                width: 32px;
                height: 32px;
                background: var(--yw-clr-black);
                border-radius: 50%;
                transition: 0.25s;
                z-index: -1;
            }

            &:hover {
                &::before {
                    z-index: -1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }
        }

        & > label:nth-child(4 of label) {
            border: 2px solid #44B4F2;

            width: 44px;
            height: 44px;

            padding: 10px;

            &.test-question__answers-checked {
                background: #44B4F2;
            }

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0) scale(0);
                width: 44px;
                height: 44px;
                background: #44B4F2;
                border-radius: 50%;
                transition: 0.25s;
                z-index: -1;
            }

            &:hover {
                &::before {
                    z-index: -1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }
        }

        & > label:nth-child(5 of label) {
            border: 2px solid #44B4F2;

            width: 64px;
            height: 64px;

            padding: 20px;

            &.test-question__answers-checked {
                background: #44B4F2;
            }

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0) scale(0);
                width: 64px;
                height: 64px;
                background: #44B4F2;
                border-radius: 50%;
                transition: 0.25s;
                z-index: -1;
            }

            &:hover {
                &::before {
                    z-index: -1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }
        }
    }
}

.question-wrapper {
    opacity: 0.5;

    transition: opacity 0.25s;

    &-active {
        opacity: 1;  
        transition: opacity 0.25s;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.1s;
    }
}
</style>