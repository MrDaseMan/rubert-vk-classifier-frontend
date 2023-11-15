<template>
    <div class="wrapper" v-if="isLoaded">
        <h1>Сомневаешься в выборе направления подготовки? <span>«Твой путь»</span> поможет тебе с этим!</h1>
        <p>Наша нейросетевая предскажет направление твоей будущей карьеры. Мы используем передовую нейросетевую технологию, чтобы, основываясь на основе твоих предпочтенияй помочь определиться с выбором.
        </p>
        <p>После прохождения теста, мы предоставим детальный отчет с рекомендациями по выбору специальности и необходимым предметам для сдачи на ЕГЭ.</p>
        <button @click="$router.push('/begin')">Начать</button>
    </div>
</template>

<script setup>
const isLoaded = ref(false);

onMounted(() => {
    isLoaded.value = false;

    isLoaded.value = true;
})
</script>

<style lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    gap: 20px;

    & > button {
        align-self: flex-start;
    }
}
</style>