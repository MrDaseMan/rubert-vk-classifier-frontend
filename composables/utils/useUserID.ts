export const useUserID = () => {
    const set = (user_id: string) => {
        useCookie("user_id").value = user_id;
    }

    const get = () => {
        return useCookie("user_id").value;
    }

    return { set, get };
}