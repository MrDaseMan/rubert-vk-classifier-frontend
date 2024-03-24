import {ZstdInit, ZstdSimple, ZstdStream} from '@oneidentity/zstd-js';

export const useVkGetUser = async (user_id: string) => {
    let _result = null;
    let _error = null;
    let _status = false;

    await ZstdInit();
    
    let _response = await useFetch("/vkapi/method/users.get", {
        method: "POST",
        params: {
            v: 5.199,
            user_id: user_id,
            extended: 1,
            fields: 
                'photo_50' + ',' +
                'photo_100' + ',' +
                'photo_200' + ',' +
                'photo_200_orig' + ',' +
                'photo_400_orig' + ',' +
                'universities' + ',' +
                'schools'
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useToken().get(),
            'Accept-Encoding': 'gzip, deflate, br'
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

            const decompressedSimpleData: Uint8Array = ZstdSimple.decompress(response._data);
            const decompressedStreamData: Uint8Array = ZstdStream.decompress(response._data);

            console.log("simple", decompressedSimpleData);
            console.log("stream", decompressedStreamData);            

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