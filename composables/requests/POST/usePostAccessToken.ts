export const usePostAccessToken = async (silent_token: string, uuid: string) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch(useRuntimeConfig().public.apiUrl + "/auth/vk/", {
        method: "POST",
        body: {
            silent_token: silent_token,
            uuid: uuid
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        onRequestError: ({ request, response, options, error }) => {
            console.log("vk:users.get:onRequestError", response || error);
            _error = response?._data || error;
            _status = false;
        },
        onResponseError: ({ request, response, options, error }) => {
            console.log("vk:users.get:onResponseError", response || error);
            _error = response._data;
            _status = false;
        },
        onResponse: ({ request, response, options }) => {
            _result = response._data;
            _status = true;
        }
    })

    return {
        result: _result,
        response: _response,
        error: _error,
        status: _status
    }
}