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
            <slot/>
        </main>
        <footer v-if="useRoute().path === '/'">
            <div class="footer__top">
                <NuxtLink to="/">
                    <LazySvgLogo/>
                </NuxtLink>
                <div class="footer__top__links">
                    <a href="https://t.me" target="_blank">
                    <LazySvgTG/>  
                    </a>
                    <a href="https://vk.com/asu_edu_ru" target="_blank">
                        <LazySvgVK/>
                    </a>
                </div>
            </div>
            <div class="footer__bottom">
                <p>© 2023 Астраханский государственный университет имени В. Н. Татищева.<br>
                При использовании материалов портала активная ссылка на ресурс обязательна.</p>
                <NuxtLink to="/privacy-policy">Политика конфиденциальности</NuxtLink>
            </div>

            <LazySvgBgWay class="footer__bg"/>
        </footer>
    </div>
</template>

<script setup>
const getUserID = computed(() => useUser().value?.id);
</script>

<style lang="scss">
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

        .logo {
            img {
                width: 48px;
            }
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
    }
}

footer {
    border-top: 1px solid rgba(0, 0, 0, 0.19);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(229,243,251,1) 100%);
    
    padding: 30px 64px;
    margin-top: 124px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-shrink: 0;
    gap: 104px;

    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
        gap: 64px;
        padding: 30px 32px;
    }
}

.footer {
    &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        width: 100%;

        z-index: 1;

        &__links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 24px;
        }
    }

    &__bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 10px;
        width: 100%;

        p {
            margin: 0;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.5px;

            color: var(--yw-clr-black-60);
        }

        a {
            text-decoration: none;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.5px;

            color: var(--yw-clr-black-60);
        }

        z-index: 1;

        @media (max-width: 1230px) {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 32px;
        }
    }

    &__bg {
        position: absolute;
        right: -10%;
        bottom: 0;
        height: 100%;

        z-index: 0;
    }
}
</style>