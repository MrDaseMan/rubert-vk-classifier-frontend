<template>
    <div class="wrapper">
        <h1>{{ getPredictedGroup }}</h1>
    </div>
    <div class="wrapper">
        <p>Группа определяется на основе ваших подписок. Для более точного результата предлагаем пройти тест.</p>
        <button @click="$router.push('/test')">Пройти тест</button>
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
</style>