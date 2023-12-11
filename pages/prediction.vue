<template>
    <div>
        <div class="wrapper">
            <h1>{{ getPredictedGroup }}</h1>
        </div>
        <div class="wrapper">
            <p>Группа определяется на основе ваших подписок. Для более точного результата предлагаем пройти тест.</p>
            <button @click="$router.push('/test')">Пройти тест</button>
        </div>
        <SvgBgWayDark class="bg"/>
        <SvgBgStarsDark class="bg__stars-1"/>
        <SvgBgStarsDark class="bg__stars-2"/>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "centered"
});

const getPredictedGroup = computed(() => {
    return useGroup().value?.group || "...";
});

onBeforeMount(() => {
    if(!useUser().value?.id) {
        navigateTo('/auth');
        return;
    }

    if(!useGroup().value?.group) {
        navigateTo('/auth');
        return;
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
}

.bg {
    position: absolute;
    bottom: 0;
    right: 0;

    &__stars-1 {
        position: absolute;
        top: 15%;
        right: 20%;

        @media (max-width: 768px) {
            display: none;
        }
    }

    &__stars-2 {
        position: absolute;
        bottom: 15%;
        left: 20%;

        @media (max-width: 768px) {
            display: none;
        }
    }
}
</style>