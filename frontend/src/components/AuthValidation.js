import { useState, useCallback } from "react";

function useAuthValidation() {
    const [formValue, setFormValue] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: e.target.validationMessage,
        }));

        setIsValid(e.target.closest("form").checkValidity());
    }, []);

    return { formValue, errors, isValid, handleChange };
}

export default useAuthValidation;