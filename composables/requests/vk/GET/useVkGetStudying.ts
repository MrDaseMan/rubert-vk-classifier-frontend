export const useVkGetStudying = async (user_id: string) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch("https://api.vk.com/method/users.get", {
        method: "POST",
        params: {
            v: 5.199,
            extended: 1,
            user_id: user_id,
            fields: 
                'universities' + ',' +
                'schools'
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + useToken().get(),
        },
        onRequestError: ({ request, response, options, error }) => {
            console.log("vk:studying.get:onRequestError", response || error);
            _error = response?._data || error;
            _status = false;
        },
        onResponseError: ({ request, response, options, error }) => {
            console.log("vk:studying.get:onResponseError", response || error);
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