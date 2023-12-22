export const useResults = () => {
    let results = useState("results", () => (null));

    return results;
}