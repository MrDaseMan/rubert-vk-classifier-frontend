<template>
    <div class="steps">
        <div class="steps__left">
                <div class="steps__block">
                    <div class="steps__block__content">
                        <h2>Авторизуйся через ВК</h2>
                        <p>Мы соберем ваши данные и передадим их в нейросеть</p>
                    </div>
                    <div class="steps__block__number">
                        <LazySvgFirstStep/>
                    </div>
                    <LazySvgBgVk/>
                    <transition name="left-slide-fade" >
                        <div class="steps__block--empty" ref="firstStepLeft" v-if="!isFirstStepLeftVisible"></div>
                    </transition>
                </div>
                <div class="steps__block">
                    <div class="steps__block__content">
                        <h2>Получи группу направлений</h2>
                        <p>Нейросеть на основе ваших подписок и других данных предскажет к какой группе направлений вы подходите</p>
                    </div>
                    <div class="steps__block__number">
                        <LazySvgThirdStep/>
                    </div>
                    <LazySvgBgStars/>
                    <transition name="left-slide-fade" >
                        <div class="steps__block--empty" ref="thirdStepLeft" v-if="!isThirdStepLeftVisible"></div>
                    </transition>
                </div>
            <button @click="$router.push('/auth')">Попробовать нейросеть</button>
        </div>
        <div class="steps__right">
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Пройди небольшой тест</h2>
                    <p>На основе ответов мы дадим более детальную информацию о рекомендуемом направление</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgSecondStep/>
                </div>
                <LazySvgBgBrain/>
                <transition name="right-slide-fade">
                    <div class="steps__block--empty" ref="secondStepRight" v-if="!isSecondStepRightVisible"></div>
                </transition>
            </div>
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Получи подробный результат</h2>
                    <p>Направление подготовки бакалавриата, список профессий и предметы ЕГЭ</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFourthStep/>
                </div>
                <LazySvgBgExp/>
                <transition name="right-slide-fade">
                    <div class="steps__block--empty" ref="fourthStepRight" v-if="!isFourthStepRightVisible"></div>
                </transition>
            </div>
        </div>
        <div class="steps__together">
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Авторизуйся через ВК</h2>
                    <p>Мы соберем ваши данные и передадим их в нейросеть</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFirstStep/>
                </div>
                <LazySvgBgVk/>
                <transition name="right-slide-fade">
                    <div class="steps__block--empty" ref="firstStepTogether" v-if="!isFirstStepTogetherVisible"></div>
                </transition>
            </div>
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Пройди небольшой тест</h2>
                    <p>На основе ответов мы дадим более детальную информацию о рекомендуемом направление</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgSecondStep/>
                </div>
                <LazySvgBgBrain/>
                <transition name="left-slide-fade">
                    <div class="steps__block--empty" ref="secondStepTogether" v-if="!isSecondStepTogetherVisible"></div>
                </transition>
            </div>
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Получи группу направлений</h2>
                    <p>Нейросеть на основе ваших подписок и других данных предскажет к какой группе направлений вы подходите</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgThirdStep/>
                </div>
                <LazySvgBgStars/>
                <transition name="right-slide-fade">
                    <div class="steps__block--empty" ref="thirdStepTogether" v-if="!isThirdStepTogetherVisible"></div>
                </transition>
            </div>
            <div class="steps__block">
                <div class="steps__block__content">
                    <h2>Получи подробный результат</h2>
                    <p>Направление подготовки бакалавриата, список профессий и предметы ЕГЭ</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFourthStep/>
                </div>
                <LazySvgBgExp/>
                <transition name="left-slide-fade">
                    <div class="steps__block--empty" ref="fourthStepTogether" v-if="!isFourthStepTogetherVisible"></div>
                </transition>
            </div>
            <button @click="$router.push('/auth')">Попробовать нейросеть</button>
        </div>
    </div>
</template>

<script setup>
const firstStepLeft = ref(null);
const thirdStepLeft = ref(null);
const secondStepRight = ref(null);
const fourthStepRight = ref(null);
const firstStepTogether = ref(null);
const secondStepTogether = ref(null);
const thirdStepTogether = ref(null);
const fourthStepTogether = ref(null);

const isFirstStepLeftVisible = ref(false);
const isThirdStepLeftVisible = ref(false);
const isSecondStepRightVisible = ref(false);
const isFourthStepRightVisible = ref(false);
const isFirstStepTogetherVisible = ref(false);
const isSecondStepTogetherVisible = ref(false);
const isThirdStepTogetherVisible = ref(false);
const isFourthStepTogetherVisible = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target === firstStepLeft.value) {
                    isFirstStepLeftVisible.value = true;
                } else if (entry.target === thirdStepLeft.value) {
                    isThirdStepLeftVisible.value = true;
                } else if (entry.target === secondStepRight.value) {
                    isSecondStepRightVisible.value = true;
                } else if (entry.target === fourthStepRight.value) {
                    isFourthStepRightVisible.value = true;
                } else if (entry.target === firstStepTogether.value) {
                    isFirstStepTogetherVisible.value = true;
                } else if (entry.target === secondStepTogether.value) {
                    isSecondStepTogetherVisible.value = true;
                } else if (entry.target === thirdStepTogether.value) {
                    isThirdStepTogetherVisible.value = true;
                } else if (entry.target === fourthStepTogether.value) {
                    isFourthStepTogetherVisible.value = true;
                }
            }
        })
    });

    if(firstStepLeft.value) {
        observer.observe(firstStepLeft.value);
    }
    if(thirdStepLeft.value) {
        observer.observe(thirdStepLeft.value);
    }
    if(secondStepRight.value) {
        observer.observe(secondStepRight.value);
    }
    if(fourthStepRight.value) {
        observer.observe(fourthStepRight.value);
    }
    if(firstStepTogether.value) {
        observer.observe(firstStepTogether.value);
    }
    if(secondStepTogether.value) {
        observer.observe(secondStepTogether.value);
    }
    if(thirdStepTogether.value) {
        observer.observe(thirdStepTogether.value);
    }
    if(fourthStepTogether.value) {
        observer.observe(fourthStepTogether.value);
    }
    
})
</script>

<style lang="scss" scoped>
.steps {
    width: 100%;
    min-height: fit-content;

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 10px;

    padding-left: 64px;
    padding-right: 64px;

    @media (max-width: 1024px) {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media (max-width: 768px) {
        padding-left: 8px;
        padding-right: 8px;

        flex-direction: column;
    }
    
    &__left > button, &__together > button {
        width: 100%;
        height: 120px;
        border-radius: 1000px;

        @media (max-width: 768px) {
            height: 100px;
        }
    }

    &__left {
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        width: 50%;
        height: 100%;

        @media (max-width: 768px) {
            display: none;
        }

        & > div:nth-child(1) > svg {
            position: absolute;
            bottom: 0;
            left: 60px;

            width: 70%;
        }

        & > div:nth-child(2) > svg {
            position: absolute;
            bottom: 0;
            left: 16px;

            width: 50%;

            z-index: 0;
        }
    }

    &__right {
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        width: 50%;
        height: 100%;

        @media (max-width: 768px) {
            display: none;
        }

        & > div:nth-child(1) > svg {
            position: absolute;
            bottom: 0;
            right: 0;

            width: 50%;
        }

        & > div:nth-child(2) > svg {
            position: absolute;
            bottom: 0;
            left: 0;

            width: 50%;

            z-index: 0;
        }
    }

    &__together {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        width: 100%;
        height: 50%;

        display: none;

        @media (max-width: 768px) {
            display: flex;
        }

        & > div:nth-child(1) > svg {
            position: absolute;
            bottom: 0;
            left: 60px;

            width: 70%;
        }

        & > div:nth-child(3) > svg {
            position: absolute;
            bottom: 0;
            left: 16px;

            width: 50%;

            z-index: 0;
        }

        & > div:nth-child(2) > svg {
            position: absolute;
            bottom: 0;
            right: 0;

            width: 50%;
        }

        & > div:nth-child(4) > svg {
            position: absolute;
            bottom: 0;
            left: 0;

            width: 50%;

            z-index: 0;
        }
    }

    &__block {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 24px;

        padding: 32px;

        border-radius: 24px;
        background: #E5F3FB;

        width: 100%;
        height: 483px;

        &--empty {
            position: absolute;
            left: 0;
            top: 0;
            
            background: #fff;
            width: 100%;
            height: 100%;

            z-index: 100;
        }

        &__content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 16px;

            z-index: 1;

            h2 {
                margin: 0;
                font-size: 36px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                letter-spacing: -0.9px;
            }

            p {
                color: var(--yw-clr-black-60);
                font-size: 24px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: -0.6px;
            }
        }
    }
}

.left-slide-fade-enter-active, .left-slide-fade-leave-active {
    transition: all 3s ease;
}

.left-slide-fade-enter-from, .left-slide-fade-leave-to {
    transform: translate3d(100%, 0, 0);
}

.right-slide-fade-enter-active, .right-slide-fade-leave-active {
    transition: all 3s ease;
}

.right-slide-fade-enter-from, .right-slide-fade-leave-to {
    transform: translate3d(-100%, 0, 0);
}
</style>