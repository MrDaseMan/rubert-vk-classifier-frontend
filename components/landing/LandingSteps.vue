<template>
    <div class="steps">
        <div class="steps__left">
                <div class="steps__block" ref="firstStepLeft">
                    <div class="steps__block__content">
                        <h2>Авторизуйся через ВК</h2>
                        <p>Мы соберем ваши данные и передадим их в нейросеть</p>
                    </div>
                    <div class="steps__block__number">
                        <LazySvgFirstStep/>
                    </div>
                    <LazySvgBgVk/>
                </div>
                <div class="steps__block" ref="thirdStepLeft">
                    <div class="steps__block__content">
                        <h2>Получи группу направлений</h2>
                        <p>Нейросеть на основе ваших подписок и других данных предскажет к какой группе направлений вы подходите</p>
                    </div>
                    <div class="steps__block__number">
                        <LazySvgThirdStep/>
                    </div>
                    <LazySvgBgStars/>
                </div>
            <button @click="$router.push('/auth')">Попробовать нейросеть</button>
        </div>
        <div class="steps__right">
            <div class="steps__block" ref="secondStepRight">
                <div class="steps__block__content">
                    <h2>Пройди небольшой тест</h2>
                    <p>На основе ответов мы дадим более детальную информацию о рекомендуемом направление</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgSecondStep/>
                </div>
                <LazySvgBgBrain/>
            </div>
            <div class="steps__block" ref="fourthStepRight">
                <div class="steps__block__content">
                    <h2>Получи подробный результат</h2>
                    <p>Направление подготовки бакалавриата, список профессий и предметы ЕГЭ</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFourthStep/>
                </div>
                <LazySvgBgExp/>
            </div>
        </div>
        <div class="steps__together">
            <div class="steps__block" ref="firstStepTogether">
                <div class="steps__block__content">
                    <h2>Авторизуйся через ВК</h2>
                    <p>Мы соберем ваши данные и передадим их в нейросеть</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFirstStep/>
                </div>
                <LazySvgBgVk/>
            </div>
            <div class="steps__block" ref="secondStepTogether">
                <div class="steps__block__content">
                    <h2>Пройди небольшой тест</h2>
                    <p>На основе ответов мы дадим более детальную информацию о рекомендуемом направление</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgSecondStep/>
                </div>
                <LazySvgBgBrain/>
            </div>
            <div class="steps__block" ref="thirdStepTogether">
                <div class="steps__block__content">
                    <h2>Получи группу направлений</h2>
                    <p>Нейросеть на основе ваших подписок и других данных предскажет к какой группе направлений вы подходите</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgThirdStep/>
                </div>
                <LazySvgBgStars/>
            </div>
            <div class="steps__block" ref="fourthStepTogether">
                <div class="steps__block__content">
                    <h2>Получи подробный результат</h2>
                    <p>Направление подготовки бакалавриата, список профессий и предметы ЕГЭ</p>
                </div>
                <div class="steps__block__number">
                    <LazySvgFourthStep/>
                </div>
                <LazySvgBgExp/>
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
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target === firstStepLeft.value) {
                    firstStepLeft.value.classList.remove('bottom-slide-fade-hidden');
                    firstStepLeft.value.classList.add('bottom-slide-fade');
                } else if (entry.target === thirdStepLeft.value) {
                    thirdStepLeft.value.classList.remove('bottom-slide-fade-hidden');
                    thirdStepLeft.value.classList.add('bottom-slide-fade');
                } else if (entry.target === secondStepRight.value) {
                    secondStepRight.value.classList.remove('bottom-slide-fade-hidden');
                    secondStepRight.value.classList.add('bottom-slide-fade');
                } else if (entry.target === fourthStepRight.value) {
                    fourthStepRight.value.classList.remove('bottom-slide-fade-hidden');
                    fourthStepRight.value.classList.add('bottom-slide-fade');
                } else if (entry.target === firstStepTogether.value) {
                    firstStepTogether.value.classList.remove('bottom-slide-fade-hidden');
                    firstStepTogether.value.classList.add('bottom-slide-fade');
                } else if (entry.target === secondStepTogether.value) {
                    secondStepTogether.value.classList.remove('bottom-slide-fade-hidden');
                    secondStepTogether.value.classList.add('bottom-slide-fade');
                } else if (entry.target === thirdStepTogether.value) {
                    thirdStepTogether.value.classList.remove('bottom-slide-fade-hidden');
                    thirdStepTogether.value.classList.add('bottom-slide-fade');
                } else if (entry.target === fourthStepTogether.value) {
                    fourthStepTogether.value.classList.remove('bottom-slide-fade-hidden');
                    fourthStepTogether.value.classList.add('bottom-slide-fade');
                }
            }
        })
    });

    if(firstStepLeft.value) {
        observer.observe(firstStepLeft.value);
        firstStepLeft.value.classList.add('bottom-slide-fade-hidden');
    }
    if(thirdStepLeft.value) {
        observer.observe(thirdStepLeft.value);
        thirdStepLeft.value.classList.add('bottom-slide-fade-hidden');
    }
    if(secondStepRight.value) {
        observer.observe(secondStepRight.value);
        secondStepRight.value.classList.add('bottom-slide-fade-hidden');
    }
    if(fourthStepRight.value) {
        observer.observe(fourthStepRight.value);
        fourthStepRight.value.classList.add('bottom-slide-fade-hidden');
    }
    if(firstStepTogether.value) {
        observer.observe(firstStepTogether.value);
        firstStepTogether.value.classList.add('bottom-slide-fade-hidden');
    }
    if(secondStepTogether.value) {
        observer.observe(secondStepTogether.value);
        secondStepTogether.value.classList.add('bottom-slide-fade-hidden');
    }
    if(thirdStepTogether.value) {
        observer.observe(thirdStepTogether.value);
        thirdStepTogether.value.classList.add('bottom-slide-fade-hidden');
    }
    if(fourthStepTogether.value) {
        observer.observe(fourthStepTogether.value);
        fourthStepTogether.value.classList.add('bottom-slide-fade-hidden');
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

.bottom-slide-fade {
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-name: bottom-slide-fade;

    &-hidden {
        opacity: 0;
    }
}

@keyframes bottom-slide-fade {
  0% {
    opacity: 0;
    transform: translateY(10%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>