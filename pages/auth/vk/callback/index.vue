<template>
    <div class="wrapper">
        <h2>Ожидание подтверждения авторизации...</h2>
        <Loader color="var(--yw-clr-red)"/>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'centered',
})

onMounted(async () => {
    await nextTick(async () => {
        let query = JSON.parse(useRoute().query.payload);

        // post token and uuid in backend
        let result = await usePostAccessToken(query.token, query.uuid);
        if (result.status && result.result.response) {
            useUser().value = query.user;
            useToken().set(result.result.response.access_token, result.result.response.expires_in);
            useUserID().set(query.user.id);
            navigateTo('/auth');
            return;
        }

        if(result.result.error.error_code)
            useCustomError().value = "Истекло время жизни токена, попробуйте авторизоваться еще раз!";
        else
            useCustomError().value = "Ошибка авторизации: " + JSON.stringify(result.result.error.error_msg);

        navigateTo('/error');
    })
})
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        text-align: center;
    }
}
</style>