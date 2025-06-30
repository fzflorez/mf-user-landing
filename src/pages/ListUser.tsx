import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../store";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ListUser() {
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.first
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      user.name.last
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
  );

  const hasUser = useMemo(() => filteredUsers.length, [filteredUsers]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers().finally(() => setLoading(false));
  }, [fetchUsers]);

  return (
    <div className=" mx-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white my-6 sm:my-8 text-center">
        Usuarios
      </h1>

      <div className="w-4/5 md:w-3/5 xl:max-w-2xl mx-auto my-10">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          className="w-full border-2 border-gray-400 px-2 py-1 md:py-2 md:px-4 text-sm md:text-base outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="max-w-7xl mx-auto mb-10 text-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Spinner />
            <p className="mt-4 text-white font-semibold">
              Cargando usuarios...
            </p>
          </div>
        ) : hasUser ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredUsers.map((user) => (
              <Link
                to={`/details/${user.login.uuid}`}
                key={user.login.uuid}
                className="bg-gray-700 p-3 sm:p-4 flex flex-col justify-center rounded-md shadow-sm text-center sm:text-start hover:shadow-md transition-shadow hover:shadow-gray-500 text-sm sm:text-base"
              >
                <h2 className="text-xl font-bold">
                  {user.name.first} {user.name.last}
                </h2>
                <p>
                  <strong>Celular:</strong> {user.cell}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center font-bold text-lg">
            Usuario no encontrado. Por favor, intenta con otro nombre.
          </p>
        )}
      </section>
    </div>
  );
}
