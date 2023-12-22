<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup>
import * as VKID from '@vkid/sdk/dist-sdk/umd/index';
 
onMounted(() => {
    VKID.Config.set({
        app: 51818236, // Идентификатор приложения.
        //if dev build set localhost else set urway.vercel.app
        redirectUrl: `${process.env.NODE_ENV === 'development' ? "http://localhost:3000" : 'https://urway.vercel.app'}/vkcallback`,
    });

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

.page-slide-enter-active {
    transition: all 0.5s ease;
}

.page-slide-leave-active {
    transition: all 0.5s ease;
}

.page-slide-enter-from {
    filter: blur(10px);

    opacity: 0;
}

.page-slide-leave-to {
    filter: blur(10px);

    opacity: 0;
}
</style>



<style lang="scss">
.wrapper {
    position: relative;

    border-radius: 32px;
    border: 1px solid #E5F3FB;

    background: #FFF;
    width: min(100%, 640px);

    box-shadow: 0px 4px 40px 0px rgba(10, 51, 75, 0.06);

    display: flex;
    padding: 32px 36px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;

    z-index: 10;

    margin-top: 32px;
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

        @media (max-width: 480px) {
            font-size: 32px;
            line-height: 110%; /* 36px */
            letter-spacing: -0.8px;
        }
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

        @media (max-width: 480px) {
            font-size: 18px;
            line-height: 110%; /* 20.8px */
            letter-spacing: -0.4px;
        }
    }

    & > button {
        width: 100%;
    }
}

.notify {
    position: fixed;
    top: 88px;
    left: 50%;
    transform: translate3D(-50%, 0, 0);
    max-width: 80%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    padding: 24px;

    width: fit-content;

    z-index: 999;

    background: #E5F3FB;

    color: var(--yw-clr-black);

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.5px;
    text-align: center;

    padding: 8px 16px;

    border-radius: 12px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    user-select: none;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -ms-user-drag: none;

    -webkit-user-zoom: none;
    -khtml-user-zoom: none;
    -moz-user-zoom: none;
    -ms-user-zoom: none;
    user-zoom: none;

    -webkit-user-modify: read-only;
    -khtml-user-modify: read-only;
    -moz-user-modify: read-only;
    -ms-user-modify: read-only;

    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
        top: 86px;
        max-width: 100%;
        width: 90%;

        font-size: 14px;
    }

    &-error {
        position: fixed;
        top: 88px;
        left: 50%;
        transform: translate3D(-50%, 0, 0);
        max-width: 80%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 8px;
        padding: 24px;

        width: fit-content;

        z-index: 999;

        background: linear-gradient(66deg, rgba(226, 29, 76, 0.20) 15.12%, rgba(226, 29, 76, 0.00) 93.21%), #FFF;

        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.5px;

        text-align: center;

        // soft green

        padding: 8px 16px;

        border-radius: 12px;

        color: var(--yw-clr-black);

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: none;
        user-select: none;

        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;

        -webkit-user-zoom: none;
        -khtml-user-zoom: none;
        -moz-user-zoom: none;
        -ms-user-zoom: none;
        user-zoom: none;

        -webkit-user-modify: read-only;
        -khtml-user-modify: read-only;
        -moz-user-modify: read-only;
        -ms-user-modify: read-only;

        backdrop-filter: blur(10px);
        @media (max-width: 768px) {
            top: 86px;
            max-width: 100%;
            width: 90%;

            font-size: 14px;
        }
    }
}

.notification-slide-fade-enter-active,
.notification-slide-fade-leave-active {
    transition: all 0.5s ease;
}

.notification-slide-fade-enter-from,
.notification-slide-fade-leave-to {
    transform: translate3D(-50%, -80%, 0);
    opacity: 0;
}
</style>