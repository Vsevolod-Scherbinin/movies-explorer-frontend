import { useCallback, useState } from 'react';
import validator from 'validator';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'name' && target.validity.patternMismatch) {
      setErrors({ ...errors, [name]: 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.' });
    } else if (target.validationMessage !== '') {
      setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    if (name === 'email' && !validator.isEmail(value)) {
      setErrors({ ...errors, [name]: 'Некорректый адрес почты.' });
    } else {
      target.setCustomValidity('');
    }

    setValues({ ...values, [name]: value });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm };
}
