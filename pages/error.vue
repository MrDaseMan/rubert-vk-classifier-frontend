<template>
    <div class="wrapper">
        <h1>Произошла ошибка</h1>
        <div>{{ getError }}</div>
        <button @click="$router.push('/')">На главную</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'centered'
})

onMounted(() => {
    if(!useError().value) {
        navigateTo('/');
    }
})

onBeforeUnmount(() => {
    useError().value = null;
})

const getError = computed(() => {
    return useError().value
})
</script>