<template>
    <div>
        <header>
            <nav>
                <NuxtLink to="/">
                    <LazySvgLogo/>
                </NuxtLink>

                <Transition name="notification-slide-fade">
                    <div class="ID" v-if="getUserID">
                        VK ID: <span>{{ getUserID }}</span>
                    </div>
                </Transition>

                <a class="logo" href="https://asu.edu.ru/" target="_blank">
                    <img src="~/assets/images/asu-logo-t.webp">
                </a>
            </nav>
        </header>
        <main>
            <div class="content">
                <slot/>
            </div>
        </main>
    </div>
</template>

<script setup>
    const getUserID = computed(() => useUser().value?.id);
</script>

<style lang="scss" scoped>
header {
    position: sticky;
    top: 0;
    z-index: 999;

    background: var(--yw-clr-white-40);
    backdrop-filter: blur(10px);

    nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 12px 64px;

        @media (max-width: 768px) {
            padding: 12px 32px;
        }

        @media (max-width: 480px) {
            padding: 12px 8px;
        }

        a {
            text-decoration: none;

            &:hover {
                filter: brightness(1);
            }

            & > svg {
                width: fit-content;
                height: 32px;
            }
        }

        & > * {
            min-width: 20%;
        }
        
        .ID {
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);

            display: flex;
            justify-content: center;
            padding: 12px 20px;
            align-items: center;
            gap: 12px;
            border-radius: 24px;
            border: 1px solid #E5F3FB;

            background: #FFF;

            box-shadow: 0px 4px 40px 0px rgba(10, 51, 75, 0.06);

            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.6px;

            & > span {
                color: var(--yw-clr-black-60);
            }

            @media (max-width: 768px) {
                display: none;
            }
        }

        .logo {
            display: flex;
            justify-content: flex-end;
            img {
                width: 48px;
            }
        }
    }
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-width: 100%;
    min-height: 80dvh;
    overflow: hidden;

    margin-top: auto;
    margin-bottom: auto;

    @media (max-width: 768px) {
        padding-top: 32px;
        padding-bottom: 32px;
    }

    @media (max-width: 480px) {
        padding-top: 16px;
        padding-bottom: 16px;
    }

    .content {
        width: min(622px, 90%);

        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>