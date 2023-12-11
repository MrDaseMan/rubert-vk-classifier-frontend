export const usePostGroups = async (schools: Array<any>, publics: Array<any>) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch(useRuntimeConfig().public.apiUrl + "/edu/group/?id_vk=" + useUser().value.id || "", {
        method: "POST",
        body: {
            schools: schools,
            publics: publics
        }, 
        onRequestError: ({ request, response, options, error }) => {
            console.log("edu/group:onRequestError", response || error);
            _error = response?._data;
            _status = false;
        },
        onResponseError: ({ request, response, options, error }) => {
            console.log("edu/group:onResponseError", response || error);
            _error = response._data;
            _status = false;
        },
        onResponse: ({ request, response, options }) => {
            _result = response._data;
            _status = true;
        }
    });

    return {
        result: _result,
        error: _error,
        status: _status
    }
}