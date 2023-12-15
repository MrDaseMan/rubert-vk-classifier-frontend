export const usePostProgramByName = async (edu_program: string) => {
    let _result = null;
    let _error = null;
    let _status = false;

    let _response = await useFetch(useRuntimeConfig().public.apiUrl + "/edu/suply-by-program/", {
        method: "POST",
        body: {
            edu_program: edu_program
        },
        onRequestError: ({ request, response, options, error }) => {
            console.log("suply-by-program:onRequestError", response || error);
            _error = response?._data;
            _status = false;
        },
        onResponseError: ({ request, response, options, error }) => {
            console.log("suply-by-program:onResponseError", response || error);
            _error = response._data;
            _status = false;
        },
        onResponse: ({ request, response, options, error }) => {
            console.log("suply-by-program:onResponse", response || error);
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