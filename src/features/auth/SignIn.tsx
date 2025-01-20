import { useState } from "react";
import { useLoginUserMutation } from "../../store/api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation";

export const SignIn = ({ toggleAuthMode }: { toggleAuthMode: () => void }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);
    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);
    try {
      const result = await loginUser({ email, password }).unwrap();
      console.log("Пользователь вошел:", result);
      localStorage.setItem("token", result.token);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError("Неверный email или пароль");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-lg dark:bg-gray-900  shadow-lg">
        <h1 className="text-2xl font-medium text-white mb-4">Войти</h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
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
          <div>
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
              placeholder="Введите пароль"
            />
          </div>
          <p className="text-white flex justify-start items-start">
            Нет аккаунта?
            <button
              onClick={toggleAuthMode}
              className="underline hover:text-gray-400"
            >
              Зарегистрироваться
            </button>
          </p>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 mt-2 border-gray-800 border-2 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-gray-800"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
