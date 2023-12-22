<template>
    <div class="wrapper">
        <h2>Ожидание подтверждения авторизации...</h2>
        <Loader color="var(--yw-clr-red)"/>
    </div>
</template>

<script setup>
import * as VKID from '@vkid/sdk/dist-sdk/umd/index';

definePageMeta({
    layout: 'centered',
})

onMounted(async () => {
    await nextTick(async () => {
        let query = JSON.parse(useRoute().query.payload);

        console.log(query.token, query.uuid);
        // post token and uuid in backend
        let result = await usePostAccessToken(query.token, query.uuid);
        if (result.status) {
            useUser().value = query.user;
            useToken().set(result.result.response.access_token, result.result.response.expires_in);
            useUserID().set(query.user.id);
            navigateTo('/auth');
            return;
        }

        useCustomError().value = "Ошибка авторизации: " + JSON.stringify(result.error);
        navigateTo('/error');
    })
})
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>