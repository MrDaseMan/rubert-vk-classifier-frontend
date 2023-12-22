export const useCustomError = () => {
    let _error = useState("error", () => (null));

    return _error;
}