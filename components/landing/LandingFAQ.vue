<template>
    <div class="faq">
        <h2>Часто задаваемые вопросы</h2>
        <div class="faq__dropdowns">
            <UIDropdown v-for="(dropdown, index) in dropdowns" :key="index" class="dropdown" width="100%" height="fit-content" 
            defaultBackground="var(--rp-clr-gray)"
            hoverBackground="var(--rp-clr-gray-dark)"
            clickBackground="var(--rp-clr-gray-darker)"
            selectedBackground="var(--rp-clr-gray)"
            animationType="slide"
            :haveArrow="true" 
            :isSelected="dropdown.isSelected"
            :isSpaceBetween="true"
            :isUnborderOnSelect="false"
            :isContentAbsolute="false"
            :isContentAnimatedAppear="true"
            :borderRadius="{isUnequal: false, radius: '0px'}"
            :isDisabled="checkDisabled(dropdown)"
            @click="dropdown.isSelected = !dropdown.isSelected">
            <template v-slot:dropdown-inner>
                <h3>{{ dropdown.title }}</h3>
            </template>
            <template v-slot:dropdown-content>
                <p>{{ dropdown.content }}</p>
            </template>
        </UIDropdown>
    </div>
    </div>
</template>

<script setup>
var dropdowns = ref([
    {
        title: "Как работает нейронная сеть?",
        content: "Система проводит анализ текущих подписок и предыдущих мест обучения со страницы профиля VK. Затем она определяет наиболее подходящие группы направлений подготовки бакалавриата.",
        isSelected: false
    },
    {
        title: "Что будет с моими данными?",
        content: "Мы не сохраняем ваши данные и не передаём их третьим лицам.",
        isSelected: false
    },
    // {
    //     title: "Как получить наиболее точный результат?",
    //     content: "Чем больше данных мы сможем собрать с вашей страницы, тем более точное предсказание выдаст нейросеть. Если данных мало или они не очень информативные, получится не совсем точный результат.",
    //     isSelected: false
    // },
    {
        title: "Что если результат совсем не про меня?",
        content: "Нейросеть не дает стопроцентный результат. Она лишь предлагает направление с определённой вероятностью. В любом её результате можно и нужно сомневаться.",
        isSelected: false
    }
]);

const checkDisabled = (dropdown) => {
    return !dropdown.isSelected && dropdowns.value.filter((item) => item.isSelected).length > 0;
}
</script>

<style lang="scss" scoped>
.dropdown {
    h3 {
        margin: 0;

        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 26.4px */
        letter-spacing: -0.6px;
        padding: 16px 24px;

        @media (max-width: 768px) {
            font-size: 20px;
            line-height: 110%; /* 22.4px */
            letter-spacing: -0.5px;
        }
    }

    p {
        width: 100%;

        margin-top: 24px;
        margin-bottom: 0px;

        padding-left: 24px;
        padding-right: 24px;

        color: var(--yw-clr-black-60);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%; /* 26.4px */
        letter-spacing: -0.6px;

        @media (max-width: 768px) {
            font-size: 16px;
            line-height: 110%; /* 18.4px */
            letter-spacing: -0.3px;
        }
    }
}

.faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 64px;

    padding: 16px;

    h2 {
        margin: 0;

        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%; /* 52.8px */
        letter-spacing: -1.2px;

        text-align: center;

        @media (max-width: 768px) {
            font-size: 32px;
            line-height: 110%; /* 36.8px */
            letter-spacing: -0.9px;
        }
    }

    &__dropdowns {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 32px;

        width: min(90%, 1076px);

        @media (max-width: 768px) {
            gap: 16px;
        }
    }
}
</style>