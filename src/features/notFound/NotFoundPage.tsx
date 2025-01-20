import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="flex flex-col items-center text-center space-y-6">
        <p className="text-xl font-medium text-gray-400">
          Что-то пошло не так!
          <br />
          Данная страница не найдена или у вас недостаточно прав
        </p>
        <button
          onClick={goMain}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Перейти на главную
        </button>
      </div>
    </div>
  );
};
