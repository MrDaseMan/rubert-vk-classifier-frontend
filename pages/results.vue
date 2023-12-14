<template>
    <div>
        <Transition name="notification-slide-fade">
            <div class="notify" v-if="isNotificationVisible">
                {{ notification_text }}
            </div>
        </Transition>
        <div class="result">
            <h1>Результат</h1>
            <div class="wrapper" v-if="isLoaded">
                <span>{{ getEduProgram }}</span>

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
                        <div class="wrapper__list__item" v-for="subject in getSubjects">
                            {{ subject }}
                        </div>
                    </div>
                </div>

                <!-- <p>Более подробно с направлениями подготовками, а также программами обучения вы сможете ознакомиться на сайте <a href="https://asu.edu.ru/sveden/education/" target="_blank">университета</a>.</p> -->
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

const isLoaded = ref(false);

const isNotificationVisible = ref(false);
const notification_text = ref("Ссылка на результат скопирована в буфер обмена");

onMounted(() => {
    isLoaded.value = false;

    //read query

    if(useRoute().query?.program && useRoute().query?.subjects && useRoute().query?.professions) {
        useResults().value = {
            edu_program: useRoute().query.program,
            subjects: JSON.parse(useRoute().query.subjects),
            professions: JSON.parse(useRoute().query.professions)
        }
    }

    console.log(useResults());

    if(!useResults().value) {
        useRouter().push("/auth");
        return;
    }
    
    const query = {
        program: useResults().value?.edu_program,
        subjects: JSON.stringify(useResults().value?.subjects),
        professions: JSON.stringify(useResults().value?.professions),
    }

    useRouter().push({
        query
    });

    isLoaded.value = true;
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
</style>