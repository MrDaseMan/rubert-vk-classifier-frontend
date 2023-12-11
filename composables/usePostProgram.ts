export const usePostProgram = async (questions: Array<any>) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch(useRuntimeConfig().public.apiUrl + "/edu/program/", {
        method: "POST",
        body: [
            ...questions
        ],
        onRequestError: ({ request, response, options }) => {
            console.log("edu/program:onRequestError",response);
            _error = response?._data;
            _status = false;
        },
        onResponseError: ({ request, response, options }) => {
            console.log("edu/program:onResponseError", response);
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