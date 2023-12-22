export const useGroup = () => {
    let group = useState("group", () => (null));

    return group;
}