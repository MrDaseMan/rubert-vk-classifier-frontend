<template>
    <div class="wrapper">
        <h1>{{ predicted_group || "..." }}</h1>
        <p>Профессии из этой группы занимаются тем то тем то. У них большие перспективы в том то том то</p>
    </div>
    <div class="wrapper">
        <p>Группа определяется на основе ваших подписок. Для более точного результата предлагаем пройти тест.</p>
        <button @click="$router.push('/test')">Пройти тест</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "centered"
});

const predicted_group = ref("");
const isPredictionLoading = ref(false);

const getGroups = async () => {
    isPredictionLoading.value = true;
    let result = await useGetGroups();
    if (result.result.group && result.result.questions) {
        predicted_group.value = ('00'+result.result.group).slice(-2);
        // result.result.questions.forEach(question => {
        //     questions.value.push({
        //         question: question.question,
        //         group: ('00' + question.group).slice(-2),
        //         answer: 0
        //     })
        // })

        //TODO: remove fake data
        questions.value = [
            {
                question: "Тестовый вопрос 1",
                group: "01",
                answer: 0
            },
            {
                question: "Тестовый вопрос 2",
                group: "01",
                answer: 0
            },
            {
                question: "Тестовый вопрос 3",
                group: "01",
                answer: 0
            }
        ]
    }

    setTimeout(() => {
        step3.value.scrollIntoView({ behavior: 'smooth' });
    }, 500)

    isPredictionLoading.value = false;
}

onMounted(() => {
    if(!useUser().value?.id) {
        navigateTo('/auth');
        return;
    }

    getGroups();
})
</script>

<style lang="scss" scoped>
.bg {
    position: absolute;
    left: -4%;
    bottom: 0;
    width: 50%;
    height: 50%;

    z-index: 0;

    @media (max-width: 768px) {
        display: none;        
    }
}
</style>