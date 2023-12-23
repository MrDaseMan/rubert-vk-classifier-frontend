<template>
    <Transition name="notification-slide-fade">
        <div v-if="isVisible" class="notification" :class="{ 'notification__error': isError }">
            {{ error_text }}
        </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    isError: {
        type: Boolean,
        default: false
    },
    error_text: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.notification {
    
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

    &__error {
        background: linear-gradient(66deg, rgba(226, 29, 76, 0.20) 15.12%, rgba(226, 29, 76, 0.00) 93.21%), #FFF;
        color: var(--yw-clr-black);
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