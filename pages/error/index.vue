<template>
    <div class="wrapper">
        <h1>Произошла ошибка</h1>
        <div class="wrapper__error-text">{{ getError }}</div>
        <button @click="$router.push('/')">На главную</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'centered'
})

onMounted(() => {
    if(!useCustomError().value) {
        navigateTo('/');
    }
})

onBeforeUnmount(() => {
    useCustomError().value = null;
})

const getError = computed(() => {
    return useCustomError().value
})
</script>

<style lang="scss" scoped>
.wrapper {
    &__error-text {
        text-wrap: anywhere;
    }
}
</style>