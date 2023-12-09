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
        onResponseError: (error) => {
            _error = error;
            _status = false;
        },
        onResponse: (response) => {
            _result = response.response._data;
            _status = true;
        }
    });

    return {
        result: _result,
        error: _error,
        status: _status
    }
}