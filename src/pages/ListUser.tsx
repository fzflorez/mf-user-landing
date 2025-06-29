import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../store";
import { Link } from "react-router-dom";

export default function ListUser() {
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center mt-10">Usuarios</h1>

      <div className=" w-4/5 md:1/ lg:w-3/5 xl:w-2/4 mx-auto my-10">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          className=" w-full border-2 border-gray-400 px-4 py-2 text-lg outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className=" max-w-7xl mx-auto mb-10">
        {hasUser ? (
          <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <Link
                to={`/details/${user.login.uuid}`}
                key={user.login.uuid}
                className=" p-4 border border-gray-400 rounded-lg shadow-lg flex flex-col justify-center items-start"
              >
                <h2 className=" text-xl font-bold">
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
          <p className=" text-center font-bold text-lg">
            Usuario no encontrado. Por favor, intenta con otro nombre.
          </p>
        )}
      </section>
    </div>
  );
}
