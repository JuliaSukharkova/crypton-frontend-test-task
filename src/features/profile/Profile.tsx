import Icon from "../../components/common/Icon";
import { useGetProfileQuery } from "../../store/api";
import { Navigate, useNavigate } from "react-router-dom";

export const Profile = () => {
  const { data, isLoading, isError } = useGetProfileQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon
          name="ic_loader"
          className="w-16 h-16 animate-spin text-gray-900/50"
        />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 rounded-lg bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-6">Профиль</h1>
        <div className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-white font-medium block mb-2"
            >
              Ваш Email
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-800 rounded-md border border-gray-700">
              <Icon name="ic_email" className="w-5 h-5 mr-2" />
              <input
                id="email"
                type="text"
                value={data?.email || ""}
                readOnly
                className="w-full pl-2 bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="text-white font-medium block mb-2">
              Ваш ID
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-800 rounded-md border border-gray-700">
              <Icon name="ic_key" className="w-5 h-5 mr-2" />
              <input
                id="id"
                type="text"
                value={data?.id || ""}
                readOnly
                className="w-full pl-2 bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-3 border-gray-800 border-2 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-gray-800"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
