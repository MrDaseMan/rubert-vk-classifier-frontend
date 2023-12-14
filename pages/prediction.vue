<template>
    <div class="results">
        <ClientOnly>
            <div class="warning" v-if="isLowPercent">
                <NuxtImg src="./img/hm.png" alt="hm" width="53px"/>
                <h1>
                    Нейросеть очень сомневается
                </h1>
                <p >
                    Похоже ты очень уникальная личность. Наша нейронная сеть сомневается в твоём случае. Однако мы все равно сделаем предположение.
                </p>
                <p>
                    Группа определялась на основании твоих подписок. Для определения конкретного направления предлагаем пройти тест.
                </p>
            </div>
            <div class="warning" v-else>
                <NuxtImg src="./img/hm.png" alt="smile" width="53px"/>
                <h1>
                    Нейросеть сделала свой выбор
                </h1>
                <p>
                    Группа определялась на основании твоих подписок.
                </p>
                <p>
                    Очередь за тобой. Если хочется получить конкретное направление, предлагаем пройти тест.
                </p>
            </div>
            <div class="list">
                <div class="wrapper" v-for="(group, index) in getGroups">
                    <div class="wrapper__title">
                        <span class="">{{ Intl.NumberFormat("ru-RU").format(group.probability * 100) }}%</span>
                        <h2>{{ group.group }}</h2>
                    </div>
                    <button @click="goToTest(index)" v-if="group.questions.length">Пройти тест</button>
                    <p v-else>Тест в разработке...</p>
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

const getGroups = computed(() => {
    return useGroup().value?.groups || [];
});

const isLowPercent = computed(() => {
    let isLow = true;
    for (let index = 0; index < useGroup().value?.groups?.length; index++) {
        if(parseFloat(useGroup().value.groups[index].probability) >= 0.25) {
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

    navigateTo('/test');
};

onBeforeMount(() => {
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

    & > h1 {
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 44px */
        letter-spacing: -1px;
    }

    & > p {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.5px;

        color: rgba(0, 0, 0, 0.60);
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

.list {
    display: flex;
    flex-direction: row;
    gap: 32px;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
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
}
</style>