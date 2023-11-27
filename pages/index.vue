<template>
    <div class="landing">
        <LandingPreview/>
        <LandingSteps/>
        <LandingFAQ/>
    </div>
</template>

<script setup>
const isLoaded = ref(false);

onMounted(() => {
    isLoaded.value = false;

    isLoaded.value = true;
})
</script>

<style lang="scss" scoped>
.landing {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;

    gap: 78px;
}
</style>