<template>
    <div class="info">
        <UINotification :isVisible="isNotificationVisible" :isError="false" :error_text="notification_text"/>
        <div class="result">
            <h1>Возможно, тебе подойдёт</h1>
            <div class="wrapper" v-if="isLoaded" v-for="spec in getSpecs">
                <div class="wrapper__block">
                    <h2>Направление подготовки</h2>
                    <div class="wrapper__list">
                        <div class="wrapper__list__item">
                            {{ getEduProgram }} ({{ getEduSpec(spec) }})
                        </div>
                    </div>
                </div>

                <div class="wrapper__block" v-if="spec.profile">
                    <h2>Профиль</h2>
                    <div class="wrapper__list">
                        <div class="wrapper__list__item">
                            {{ spec.profile }}
                        </div>
                    </div>
                </div>

                <div class="wrapper__block">
                    <h2>Профессии</h2>
                    <div class="wrapper__list">
                        <div class="wrapper__list__item" v-for="profession in getProfessions">
                            {{ profession }}
                        </div>
                    </div>
                </div>

                <div class="wrapper__block">
                    <h2>Предметы ЕГЭ</h2>
                    <div class="wrapper__list">
                        <div class="wrapper__list__item" v-for="subject in spec.subjects_ege">
                            {{ subject.subject }}
                            <div :class="subject.is_required ? 'wrapper__list__item__marker--red' : 'wrapper__list__item__marker--blue'"></div>
                        </div>
                    </div>
                </div>

                <div class="wrapper__block">
                    <h2>Предметы СПО</h2>
                    <div class="wrapper__list">
                        <div class="wrapper__list__item" v-for="subject in spec.subjects_spo">
                            {{ subject }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons" v-if="isDataExist">
                <button @click="$router.push('/prediction')">
                    Вернуться к нейросети
                </button>
                <button @click="$router.push('/test')">
                    Вернуться к тесту
                </button>
            </div>
            <button @click="storeInUrl()">
                Поделиться результатами
            </button>
        </div>
    </div>
</template>

<script setup>
const getEduProgram = computed(() => useResults().value?.edu_program || "");
const getSubjects = computed(() => useResults().value?.subjects || []);
const getProfessions = computed(() => useResults().value?.professions || []);
const getSpecs = computed(() => useResults().value?.profiles || []);
const getEduSpec = (spec) => {
    let specs = [];
    if (spec?.is_ochno) {
        specs.push("очно");
    }
    if (spec?.is_zaochno) {
        specs.push("заочно");
    }
    if (spec?.is_ochzaoch) {
        specs.push("очно-заочно");
    }

    // return specs divided by commas
    return specs.join(", ");
}

const isLoaded = ref(false);

const isNotificationVisible = ref(false);
const notification_text = ref("Ссылка на результат скопирована в буфер обмена");

onNuxtReady(async () => {
    isLoaded.value = false;

    const query = {
        program: useResults().value?.edu_program || useRoute().query?.program || "",
    }

    let result = await usePostProgramByName(query.program);

    if(result.status)
        useResults().value = result.result;

    useRouter().push({
        query
    });

    isLoaded.value = true;
})

const isDataExist = computed(() => {
    return useResults().value && useGroup().value && useUser().value;
})

const storeInUrl = () => {

    // copy to clipboard
    navigator.clipboard.writeText(window.location.href);

    isNotificationVisible.value = true;

    setTimeout(() => {
        isNotificationVisible.value = false;
    }, 10000);
}

definePageMeta({
    layout: 'centered',
})
</script>

<style lang="scss" scoped>

span {
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.6px;

    @media (max-width: 480px) {
        font-size: 18px;
        line-height: 110%;
        /* 20.8px */

        letter-spacing: -0.3px;
    }
}

ul {
    margin-top: 12px;
    padding: 0;
    li {
        margin: 0;
        padding: 0;

        & > span {
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.5px;
            color: rgba(0, 0, 0, 0.60);

            @media (max-width: 480px) {
                font-size: 18px;
                line-height: 110%;
                /* 20.8px */   

                letter-spacing: -0.3px;
            }
        }

        height: fit-content;

        list-style: none;
    }
}

.wrapper {
    &__block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        gap: 8px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 2px;

        &__item {
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 120%;
            letter-spacing: -0.5px;
            color: rgba(0, 0, 0, 0.60);

            @media (max-width: 480px) {
                font-size: 18px;
                line-height: 110%;
                /* 20.8px */

                letter-spacing: -0.3px;
            }

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;

            &__marker {
                &--blue {
                    width: 16px;
                    height: 16px;
                    background: var(--yw-clr-blue);
                    border-radius: 100%;

                    position: relative;

                    &::before {
                        content: '';
                        position: absolute;
                        width: max-content;
                        opacity: 0;
                        transform: translate3d(calc(-50% + 8px), 0, 0);

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }

                    &:hover::before {
                        // display on center of circle
                        content: 'Предмет по выбору';
                        transform: translate3d(calc(-50% + 8px), -3px, 0);
                        top: -36px;

                        background: var(--yw-clr-blue);

                        color: var(--yw-clr-white);
                        font-size: 12px;
                        font-weight: 700;

                        padding: 4px 8px;
                        border-radius: 4px;

                        opacity: 1;

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }
                    
                    &::after {
                        content: '';
                        position: absolute;
                        transform: translate3d(0, 0, 0);

                        opacity: 0;

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }

                    &:hover::after {
                        // triangle under before
                        width: 0;
                        height: 0;

                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-top: 8px solid var(--yw-clr-blue);

                        transform: translate3d(0, -3px, 0);

                        top: -8px;

                        opacity: 1;
                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }
                }

                &--red {
                    width: 16px;
                    height: 16px;
                    background: var(--yw-clr-red);
                    border-radius: 100%;

                    position: relative;

                    &::before {
                        content: '';
                        position: absolute;
                        width: max-content;
                        opacity: 0;
                        transform: translate3d(calc(-50% + 8px), 0, 0);

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }

                    &:hover::before {
                        // display on center of circle
                        content: 'Обязательный предмет';
                        transform: translate3d(calc(-50% + 8px), -3px, 0);
                        top: -36px;

                        background: var(--yw-clr-red);

                        color: var(--yw-clr-white);
                        font-size: 12px;
                        font-weight: 700;

                        padding: 4px 8px;
                        border-radius: 4px;

                        opacity: 1;

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }
                    
                    &::after {
                        content: '';
                        position: absolute;
                        transform: translate3d(0, 0, 0);

                        opacity: 0;

                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }

                    &:hover::after {
                        // triangle under before
                        width: 0;
                        height: 0;

                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-top: 8px solid var(--yw-clr-red);

                        transform: translate3d(0, -3px, 0);

                        top: -8px;

                        opacity: 1;
                        transition: opacity ease 0.3s, transform ease 0.3s;
                    }
                }
            }
        }
    }
}

.result {
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    

    & > button {
        width: 100%;
        margin-bottom: 64px;
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 44px */
        letter-spacing: -1px;

        text-align: center;

        @media (max-width: 480px) {
            font-size: 32px;
            line-height: 110%;
            /* 36px */

            letter-spacing: -0.8px;
        }
    }

    h2 {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.6px;

        @media (max-width: 480px) {
            font-size: 18px;
            line-height: 110%;
            /* 20.8px */

            letter-spacing: -0.4px;
        }
    }
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    margin-bottom: 8px;

    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    & > button {
        width: 100%;

        background: #E5F3FB;
        color: black;

        &::before {
            background: rgba(69,180,242,1);
        }
    }
}
</style>