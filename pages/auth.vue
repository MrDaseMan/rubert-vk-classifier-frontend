<template>
    <div>
        <Transition name="notification-slide-fade">
            <div v-if="isError" class="notify-error">
                {{ error_text }}
            </div>
        </Transition>
        <div class="wrapper" v-if="!isGettingUser">
            <h1 v-if="!getUser?.id">
                Войдите в свою страницу ВК
            </h1>
            <h1 v-else>
                Использовать пользователя <i>{{ getUser.first_name }}</i>?
            </h1>
            <p>
                Мы проанализируем данные с вашей страницы и передадим их в нейронную сеть
            </p>
            <button @click="auth" :disabled="isFetching" v-if="!getUser?.id">
                <span v-if="!isFetching">Войти</span>
                <Loader style="width: 25.5px; height: 25.5px" v-else/>
            </button>
            <div class="wrapper__buttons" v-else>
                <button @click="logout">
                    <span>Сменить аккаунт</span>
                </button>
                <button @click="fetchUserData(true)" :disabled="isFetching">
                    <span v-if="!isFetching">Продолжить</span>
                    <Loader style="width: 25.5px; height: 25.5px" v-else/>
                </button>
            </div>
        </div>
        <div class="attention" v-if="!isGettingUser">
            <SvgNotice/>
            Сервис может не работать в режиме инкогнито
        </div>
        <div class="wrapper wrapper-loader" v-else>
            <h1>
                {{ auth_status }}
            </h1>
            <Loader color="var(--yw-clr-red)"/>
        </div>
        <LazySvgBgVkDark class="bg"/>
    </div>
</template>

<script setup>
//Set layout
definePageMeta({
    layout: 'centered',
})

const auth_status = ref("Пытаемся авторизоваться...");

const isGettingUser = ref(true);

const getUser = computed(() => {
    return useUser().value;
});

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

const error_text = ref('');

const auth = () => {
    isError.value = false;
    groups.value.isDone = false;
    groups.value.items = [];
    subscriptions.value.isDone = false;
    subscriptions.value.items = [];

    auth_status.value = "Пытаемся авторизоваться...";

    VK.Auth.login((response) => {
        if (response.status === 'connected') {
            useUser().value = response.session.user;
        } else {
            isError.value = true;
            isFetching.value = false;
            error_text.value = "Произошла ошибка при авторизации в ВК: " + response.error_msg || "Проверьте настройки приватности браузера!";

            setTimeout(() => {
                isError.value = false;
            }, 10000);
        }
    }, 263168);
}

const fetchUserData = (isCalledFromAuth = false) => {
    auth_status.value = "Получаем данные...";
    isFetching.value = true;

    VK.Api.call('groups.get', {user_ids: useUser().value.id, extended: 1, v:"5.131"}, function(r) {
        if(r.response) {
            groups.value.isDone = true;
            groups.value.items = r.response.items;
        } else {
            isError.value = true;
            isFetching.value = false;
            error_text.value = "Произошла ошибка при получении данных со страницы ВК: " + r.error.error_msg;

            setTimeout(() => {
                isError.value = false;
            }, 10000);
        }
    });

    VK.Api.call('users.getSubscriptions', {user_id: useUser().value.id, extended: 1, v:"5.131"}, function(r) {
        if(r.response) {
            subscriptions.value.isDone = true;
            subscriptions.value.items = r.response.items;
        } else {
            isError.value = true;
            isFetching.value = false;
            error_text.value = "Произошла ошибка при получении данных со страницы ВК: " + r.error.error_msg;

            setTimeout(() => {
                isError.value = false;
            }, 10000);
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
            error_text.value = "Произошла ошибка при получении данных со страницы ВК: " + r.error.error_msg;

            setTimeout(() => {
                isError.value = false;
            }, 10000);
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

            auth_status.value = "Передаем данные в нейросеть...";
   
            let result = await usePostGroups(schools, publics);

            if(!result || !result.status) {
                // useError().value = result.error;
                // navigateTo('/error');
                // return;

                isError.value = true;
                isFetching.value = false;
                error_text.value = "Произошла ошибка при отправке данных на сервер: " + result.error.error;

                setTimeout(() => {
                    isError.value = false;
                }, 10000);
                return;
            }

            isFetching.value = false;
            useGroup().value = {
                groups: result.result,
                selected_id: null
            };

            if(result.result && isCalledFromAuth) {
                navigateTo('/prediction');
            }
        }
    }, 1000);
}

const logout = () => {
    isFetching.value = true;
    useUser().value = null;

    VK.Auth.logout((r) => {
        isFetching.value = false;
    });

    auth();
}


onMounted(() => {
    auth_status.value = "Пытаемся авторизоваться...";

    VK.Auth.getLoginStatus((r) => {
        if(r.status === 'connected') {
            useUser().value = r.session.user;
        }

        isGettingUser.value = false;
    }, 263168);
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

.wrapper {
    & > button {
        margin-top: 24px;
    }

    &__buttons {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        gap: 12px;
        
        width: 100%;

        @media (max-width: 568px) {
            flex-direction: column;
        }

        & > button {
            width: 100%;

            &:first-child {
                background: #E5F3FB;

                span {
                    color: black;
                }

                &::before {
                    background: rgba(69,180,242,1);
                }
            }
        }
    }

    &-loader {
        align-items: center;
        justify-content: center;
        min-width: min(100%, 640px);

        h1 {
            font-size: 32px;
        }
    }
}

.attention {
    color: rgba(0, 0, 0, 0.60);

    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.5px;

    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;

    width: min(100%, 562px);
    margin-left: auto;
    margin-right: auto;
    
    z-index: 999;
    background: #ffffff;
    border: 1px solid #E5F3FB;
    border-radius: 32px;
    padding: 16px 36px;

    box-shadow: 0px 4px 40px 0px rgba(10, 51, 75, 0.06);
}
</style>
