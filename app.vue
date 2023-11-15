<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
onMounted(() => {
    VK.init({
        apiId: 51793145
    });
})
</script>

<style lang="scss">
.fade-enter-from, .fade-leave-to {
    transition: opacity 0.5s ease;

    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    opacity: 1;
}

.slide-fade-enter-from, .slide-fade-leave-to {
    transform: translateX(10%);

    opacity: 0;
}

.slide-fade-enter-to, .slide-fade-leave-active {
    transition: all 0.5s ease;

    opacity: 1;

    transform: translateX(0);
}
</style>