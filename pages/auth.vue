<template>
    <div>
        <Transition name="slide-fade">
            <div v-if="isError" class="notify-error">
                Произошла ошибка при авторизации, пожалуйста, повторите попытку позже.
            </div>
        </Transition>
        <div class="wrapper">
            <h1>
                Войдите в свою страницу ВК
            </h1>
            <p>
                Мы проанализируем данные с вашей страницы и передадим их в нейронную сеть
            </p>
            <button @click="auth" :disabled="isFetching">
                <span v-if="!isFetching">Войти</span>
                <Loader style="width: 20px; height: 20px" v-else/>
            </button>
        </div>
        <LazySvgBgVkDark class="bg"/>
    </div>
</template>

<script setup>
//Set layout
definePageMeta({
    layout: 'centered',
})

const isError = ref(false);

const isFetching = ref(false);

const groups = ref({
    isDone: false,
    items: []
});
const subscriptions = ref({
    isDone: false,
    items: []
});
const studying = ref({
    isDone: false,
    items: []
});

const auth = () => {
    isError.value = false;
    isFetching.value = true;
    groups.value.isDone = false;
    groups.value.items = [];
    subscriptions.value.isDone = false;
    subscriptions.value.items = [];

    VK.Auth.login((response) => {
        if (response.status === 'connected') {
            useUser().value = response.session.user;

            VK.Api.call('groups.get', {user_ids: useUser().value.id, extended: 1, v:"5.131"}, function(r) {
                if(r.response) {
                    groups.value.isDone = true;
                    groups.value.items = r.response.items;
                } else {
                    isError.value = true;
                    isFetching.value = false;
                }
            });

            VK.Api.call('users.getSubscriptions', {user_id: useUser().value.id, extended: 1, v:"5.131"}, function(r) {
                if(r.response) {
                    subscriptions.value.isDone = true;
                    subscriptions.value.items = r.response.items;
                } else {
                    isError.value = true;
                    isFetching.value = false;
                }
            });

            VK.Api.call('users.get', {user_ids: useUser().value.id, fields: 'universities, schools', v:"5.131"}, function(r) {
                if(r.response) {
                    studying.value.isDone = true;
                    studying.value.items = r.response[0].universities.concat(r.response[0].schools).map(s => {
                        return {
                            name: s.name
                        }
                    });
                } else {
                    isError.value = true;
                    isFetching.value = false;
                }
            });

            // wait when all api methods are called
            setTimeout(async () => {
                if(groups.value.isDone && subscriptions.value.isDone && studying.value.isDone && !isError.value) {
                    let publics = groups.value.items.concat(subscriptions.value.items).map(s => {
                        return {
                            name: s.name
                        }
                    });

                    let schools = studying.value.items;
                    
                    let result = await usePostGroups(schools, publics);

                    if(!result || !result.status) {
                        isError.value = true;
                        isFetching.value = false;

                        useError().value = result.error;
                        navigateTo('/error');
                        return;
                    }

                    isFetching.value = false;
                    useGroup().value = result.result;

                    if(result.result) {
                        navigateTo('/prediction');
                    }
                }
            }, 1000);
        } else {
            isError.value = true;
            isFetching.value = false;
        }
    }, 2);
}
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

.wrapper {
    & > button {
        margin-top: 24px;
    }
}
</style>