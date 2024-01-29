<template>
    <div class="results">
        <ClientOnly>
            <div class="warning" v-if="isLowPercent">
                <img src="~/assets/images/hm.png" alt="hm" width="53px" style="width: 53px;"/>
                <h1>
                    Нейросеть очень сомневается
                </h1>
                <p >
                    <i>{{ getUserName }}</i>, похоже, ты очень уникальная личность. Наша нейронная сеть сомневается в твоём случае, однако мы всё равно сделаем предположение.
                </p>
                <p>
                    Группа определялась на основании твоих подписок. Чтобы попытаться определить направление, предлагаем пройти тест.
                </p>
            </div>
            <div class="warning" v-else>
                <img src="~/assets/images/hm.png" alt="smile" width="53px" style="width: 53px;"/>
                <h1>
                    Нейросеть сделала свой выбор
                </h1>
                <p>
                    <i>{{ getUserName }}</i>, очередь за тобой. Если хочется получить конкретное направление, предлагаем пройти тест.
                </p>
                <p>
                    Группа определялась на основании твоих подписок.
                </p>
            </div>
            <div class="results__list">
                <div class="wrapper" v-for="(group, index) in getGroups">
                    <div class="wrapper__title">
                        <span class="">{{ Intl.NumberFormat("ru-RU").format(getRealProbability(group.probability) * 100) }}%</span>
                        <h2>{{ group.group }}</h2>
                    </div>
                    <button @click="goToTest(index)" v-if="group.questions.length">Пройти тест</button>
                    <p v-else>Тест отсутствует...</p>
                </div>
            </div>

            <template #fallback>
                <Loader/>
            </template>
        </ClientOnly>
        <SvgBgWayDark class="bg"/>
        <SvgBgStarsDark class="bg__stars-1"/>
        <SvgBgStarsDark class="bg__stars-2"/>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default"
});

const getUserName = computed(() => {
    return useUser().value?.first_name;
});

const getGroups = computed(() => {
    return useGroup().value?.groups || [];
});

const getRealProbability = (probability) => {
    // find the value of probability from 100%

    let sum_probability = 0;

    for (let index = 0; index < useGroup().value?.groups?.length; index++) {
        sum_probability += parseFloat(useGroup().value.groups[index].probability);
    }

    let real_probability = parseFloat(probability) / sum_probability;


    return real_probability;
};

const isLowPercent = computed(() => {
    let isLow = true;

    let sum_probability = 0;

    for (let index = 0; index < useGroup().value?.groups?.length; index++) {
        sum_probability += parseFloat(useGroup().value.groups[index].probability);
    }

    for (let index = 0; index < useGroup().value?.groups?.length; index++) {
        if(parseFloat(useGroup().value.groups[index].probability) / sum_probability >= 0.5) {
            isLow = false;
        }
    }

    return isLow;
});

const goToTest = (group_id) => {
    if(!useGroup().value.groups) {
        return;
    }

    useGroup().value.selected_id = group_id;

    useGroup().value?.groups[useGroup().value.selected_id].questions.forEach(question => {
        question.answer = 3;
    })

    useGroup().value?.groups[useGroup().value.selected_id].questions.sort(function(){
        return Math.random() - 0.5;
    });

    navigateTo('/test');
};

onNuxtReady(() => {
    if(!useUser().value?.id) {
        navigateTo('/auth');
        return;
    }

    if(!useGroup().value?.groups) {
        navigateTo('/auth');
        return;
    }
})
</script>

<style lang="scss" scoped>
.warning {
    position: relative;
    margin-top: 128px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    z-index: 10;

    width: min(100%, 618px);

    @media (max-width: 480px) {
        margin-top: 64px;
    }

    & > h1 {
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 44px */
        letter-spacing: -1px;

        @media (max-width: 480px) {
            font-size: 32px;
            line-height: 110%;
        }
    }

    & > p {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.5px;

        color: rgba(0, 0, 0, 0.60);

        @media (max-width: 480px) {
            font-size: 18px;
            line-height: 110%;
        }
    }
}

.content {
    width: 100%;
}

.wrapper {
    width: min(100%, 514px);
    min-height: 391px;
    margin: 0;
    padding: 32px 36px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 480px) {
        padding: 24px 24px;
        min-height: 300px;
    }

    &__title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;

        width: 100%;

        & > h2 {
            font-size: 36px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%; /* 39.6px */
            letter-spacing: -0.9px;

            @media (max-width: 480px) {
                font-size: 24px;
                line-height: 110%;
            }
        }

        & > span {
            border-radius: 24px;
            background: #E9F5FC;
            padding: 10px 24px;
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%; /* 26.4px */
            letter-spacing: -0.6px;

            @media (max-width: 480px) {
                font-size: 18px;
                line-height: 110%;
            }
        }
    }

    & > p {
        width: 100%;
        padding: 16px 32px;
        border-radius: 46px;
        border: 1px solid rgba(0, 0, 0, 0.20);

        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.5px;

        cursor: not-allowed;
    }
}

.bg {
    position: fixed;
    bottom: 0;
    right: 0;

    &__stars-1 {
        position: fixed;
        top: 15%;
        right: 20%;

        @media (max-width: 768px) {
            display: none;
        }
    }

    &__stars-2 {
        position: fixed;
        bottom: 15%;
        left: 20%;

        @media (max-width: 768px) {
            display: none;
        }
    }
}

.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 64px;

    padding: 32px;

    @media (max-width: 768px) {
        gap: 32px;
        padding: 16px;
    }

    &__list {
        display: flex;
        flex-direction: row;
        gap: 32px;
        flex-wrap: wrap;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
}
</style>