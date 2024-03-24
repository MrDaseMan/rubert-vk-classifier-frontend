export const useVkGetSubscriptions = async (user_id: string) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch("/vkapi/method/users.getSubscriptions", {
        method: "POST",
        params: {
            v: 5.199,
            user_id: user_id,
            extended: 1
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + useToken().get(),
            'Accept-Encoding': 'gzip, deflate, br'
        },
        onRequestError: ({ request, response, options, error }) => {
            console.log("vk:users.getSubscriptions:onRequestError", response || error);
            _error = response?._data || error;
            _status = false;
        },
        onResponseError: ({ request, response, options, error }) => {
            console.log("vk:users.getSubscriptions:onResponseError", response || error);
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