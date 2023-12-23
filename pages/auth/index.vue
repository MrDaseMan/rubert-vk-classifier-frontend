<template>
    <div class="auth">
        <UINotification :isVisible="isError" :isError="true" :error_text="error_text"/>
        <div class="wrapper" v-if="!isGettingUser">
            <h1 v-if="!getUser?.id">
                Войдите в свою страницу ВК
            </h1>
            <h1 v-else>
                Использовать пользователя <i>{{ getUser.first_name }}</i>?
            </h1>
            <img class="wrapper__profile-photo" :src="getUserProfilePhoto" v-show="getUserProfilePhoto" />
            <p>
                Мы проанализируем подписки с твоей страницы и передадим их в нейронную сеть
            </p>
            <button @click="auth" :disabled="isFetching" v-if="!getUser?.id">
                <span v-if="!isFetching">Войти</span>
                <Loader style="width: 20px; height: 20px" v-else/>
            </button>
            <div class="wrapper__buttons" v-else>
                <button @click="logout">
                    <span>Сменить аккаунт</span>
                </button>
                <button @click="fetchUserData(true)" :disabled="isFetching">
                    <span v-if="!isFetching">Продолжить</span>
                    <Loader style="width: 20px; height: 20px" v-else/>
                </button>
            </div>
        </div>
        <div class="wrapper__attention" v-if="!isGettingUser">
            <SvgNotice/>
            Сервис может не работать в режиме инкогнито
        </div>
        <div class="wrapper wrapper__loader" v-else>
            <h1>
                {{ auth_status }}
            </h1>
            <Loader color="var(--yw-clr-red)"/>
        </div>
        <LazySvgBgVkDark class="bg"/>
    </div>
</template>

<script setup>
import * as VKID from '@vkid/sdk/dist-sdk/umd/index';

//Set layout
definePageMeta({
    layout: 'centered'
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

    VKID.Auth.login();
}

const fetchUserData = async (isCalledFromAuth = false) => {
    auth_status.value = "Получаем данные...";
    isFetching.value = true;

    let groups_res = await useVkGetGroups(useUser().value.id);
    
    if(groups_res.status && groups_res.result && groups_res.result.response && groups_res.result.response.items) {
        groups.value.isDone = true;
        groups.value.items = groups_res.result.response.items;
    }
    else
    {
        isError.value = true;
        isFetching.value = false;
        error_text.value = "Произошла ошибка при получении сообществ со страницы ВК: " + groups_res.error.error_msg;

        setTimeout(() => {
            isError.value = false;
        })
    }

    let subscriptions_res = await useVkGetSubscriptions(useUser().value.id);

    if(subscriptions_res.status && subscriptions_res.result && subscriptions_res.result.response && subscriptions_res.result.response.items) {
        subscriptions.value.isDone = true;
        subscriptions.value.items = subscriptions_res.result.response.items;
    }
    else
    {
        isError.value = true;
        isFetching.value = false;
        error_text.value = "Произошла ошибка при получении подписок со страницы ВК: " + subscriptions_res.error.error_msg;

        setTimeout(() => {
            isError.value = false;
        })
    }

    let studying_res = await useVkGetStudying(useUser().value.id);

    if(studying_res.status && studying_res.result && studying_res.result.response && studying_res.result.response[0] && studying_res.result.response[0].universities) {
        studying.value.isDone = true;
        studying.value.items = studying_res.result.response[0].universities.concat(studying_res.result.response[0].schools).map(s => {
            return {
                name: s.name
            }
        });
    }
    else
    {
        isError.value = true;
        isFetching.value = false;
        error_text.value = "Произошла ошибка при получении мест обучения со страницы ВК: " + studying_res.error.error_msg;

        setTimeout(() => {
            isError.value = false;
        })
    }

    // wait when all api methods are called
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
            // useCustomError().value = result.error;
            // navigateTo('/error');
            // return;

            isError.value = true;
            isFetching.value = false;
            error_text.value = result.error.error ? "Произошла ошибка при отправке данных на сервер: " + result.error.error : "Произошла неизвестная ошибка при отправке данных на сервер!";

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
}

const logout = () => {
    isFetching.value = true;
    useUser().value = null;
    useToken().set(null, 0);
    auth();
}

onNuxtReady(async () => {
    auth_status.value = "Пытаемся авторизоваться...";

    if(useToken().get()) { 
        let user = await useVkGetUser(useUserID().get())
        if(!user || !user.response || !user.response.data || !user.response.data.value || !user.response.data.value.response || !user.status) {
            isGettingUser.value = false;
            useToken().set(null, 0);
            return;
        }

        useUser().value = user.response.data.value.response[0];

        isGettingUser.value = false;
    }

    isGettingUser.value = false;
})

const getUserProfilePhoto = computed(() => {
    if(useUser().value)
        return useUser().value.photo_400_orig || useUser().value.photo_200_orig || useUser().value.photo_200 || useUser().value.photo_100 || useUser().value.photo_50 || null;
    else
        return null
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
    align-items: center;

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

    &__loader {
        align-items: center;
        justify-content: center;
        min-width: min(100%, 640px);

        h1 {
            font-size: 32px;
        }
    }

    &__attention {
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

        svg {
            min-width: 24px;
        }
    }

    &__profile-photo {
        border-radius: 50%;
        width: 96px;
        height: 96px;

        @media (max-width: 768px) {
            width: 64px;
            height: 64px;
        }
    }
}
</style>
