<template>
    <div class="wrapper">
        <h1>Предполагаемое направление: <span>{{ getEduProgram }}</span></h1>
        <h2>Рекомендуемые для сдачи предметы ЕГЭ:</h2>
        <ul>
            <li v-for="subject in getSubjects">{{ subject }}</li>
        </ul>

        <p>Более подробно с направлениями подготовками, а также программами обучения вы сможете ознакомиться на сайте <a href="https://asu.edu.ru/sveden/education/" target="_blank">университета</a>.</p>
    </div>
</template>

<script setup>
const getEduProgram = computed(() => useResults().value?.edu_program || "");
const getSubjects = computed(() => useResults().value?.subjects || []);

onMounted(() => {
    if(!useResults().value) {
        useRouter().push("/");
    }
})
</script>

<style lang="scss">
ul {
    li {
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        font-size: 24px;
        font-weight: bold;
        color: var(--yw-clr-black);
    }
}

a {
    text-decoration: none;
    color: var(--yw-clr-blue);
}
</style>