import { useRegisterUserMutation } from "../../store/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";

export const SignUp = ({ toggleAuthMode }: { toggleAuthMode: () => void }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);
    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (confirmPasswordError) return setError(confirmPasswordError);
    try {
      const result = await registerUser({ email, password }).unwrap();
      console.log("Пользователь зарегистрирован:", result);
      localStorage.setItem("token", result.token);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setError("Пользователь уже зарегистрирован");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-lg bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-medium text-white mb-4">Регистрация</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-white font-medium block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="appearance-none rounded-md pl-3 text-gray-700 bg-white border border-gray-300 w-full py-3 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Введите email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-white font-medium block mb-1"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="appearance-none rounded-md pl-3 text-gray-700 bg-white border border-gray-300 w-full py-3 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              placeholder="Придумайте пароль"
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="confirmPassword"
              className="text-white font-medium block mb-1"
            >
              Потвердите пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Потвердите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="appearance-none rounded-md pl-3 text-gray-700 bg-white border border-gray-300 w-full py-3 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
              required
            />
          </div>
          <p className="text-white flex justify-start items-start">
            Уже есть аккаунт?
            <button
              onClick={toggleAuthMode}
              className="underline hover:text-gray-400"
            >
              Войти
            </button>
          </p>
          {error && (
            <div className="text-red-600 text-sm mt-1 mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-3 border-gray-800 border-2 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-gray-800"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
