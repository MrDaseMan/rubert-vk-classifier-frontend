export const useUser = () => {
    let user = useState("user", () => ({}));

    return user;
}