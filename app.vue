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



<style lang="scss">
.wrapper {
    position: relative;

    border-radius: 32px;
    border: 1px solid #E5F3FB;

    background: #FFF;

    box-shadow: 0px 4px 40px 0px rgba(10, 51, 75, 0.06);

    display: flex;
    padding: 32px 36px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;

    z-index: 10;

    margin-bottom: 32px;

    &:last-child {
        margin-bottom: 0;
    }

    h1 {
        margin: 0;
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 44px */
        letter-spacing: -1px;

        width: 100%;
    }

    p {
        margin: 0;
        color: var(--yw-clr-black-60);
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.6px;
    }

    & > button {
        width: 100%;
    }
}

.error {
    color: var(--yw-clr-red);
}
</style>