export const useToken = () => {
    const set = (token: string, expires: number) => {
        let expire_date = new Date(Date.now() + expires);
        useCookie("vk_token", {
            expires: expire_date
        }).value = token;        
    }

    const get = () => {
        return useCookie("vk_token").value;
    }

    return { set, get };
}