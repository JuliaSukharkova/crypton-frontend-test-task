export const validateEmail = (email: string): string | null => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Неверный формат email";
    }
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Пароль должен быть не меньше 6 символов";
    }
    return null;
  };
  
  export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string | null => {
    if (password !== confirmPassword) {
      return "Пароли не совпадают";
    }
    return null;
  };
  