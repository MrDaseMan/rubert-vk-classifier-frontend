export const useError = () => {
    let _error = useState("error", () => (null));

    return _error;
}