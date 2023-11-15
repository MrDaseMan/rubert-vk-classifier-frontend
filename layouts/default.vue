<template>
    <header>
        <div class="content">
            <NuxtLink to="/"><span>Твой путь</span></NuxtLink>
            <nav>
                <NuxtLink to="/begin">Начать</NuxtLink>
                <NuxtLink to="/about">О нас</NuxtLink>
            </nav>

            <a class="logo" href="https://asu.edu.ru/">
                <img src="~/assets/images/asu-logo-t.webp">
            </a>
        </div>
    </header>
    <main>
        <slot/>
    </main>
</template>

<style lang="scss">
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    padding-left: 32px;
    padding-right: 32px;
    
    background: var(--yw-clr-white);

    & > .content {

        display: flex;
        justify-content: flex;
        align-items: center;
        gap: 32px;

        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;

        border-bottom: 2px solid var(--yw-clr-red);

        a {
            text-decoration: none;
            color: var(--yw-clr-black);
        }

        span {
            font-size: 2rem;
            font-weight: bold;
        }

        img {
            align-self: flex-end;
            width: 64px;
            height: 64px;
        }

        nav {
            display: flex;
            gap: 32px;

            a {
                text-decoration: none;
                color: var(--yw-clr-red);
                font-size: 1.5rem;
                font-weight: bold;
            }
        }

    }
}

main {
    padding-top: 102px;
    margin-top: 64px;
}

.logo {
    margin-left: auto;

    &:hover {
        filter: none !important;
        transform: scale(1.1);
        transition: all 0.3s ease;
    }
}
</style>