import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard";
import { useUserStore } from "../store";

export default function DetailList() {
  const { id } = useParams();
  const fetchUserId = useUserStore((state) => state.fetchUserId);

  useEffect(() => {
    if (id) {
      fetchUserId(id);
    }
  }, [id, fetchUserId]);

  return (
    <div>
      <h1 className=" my-10 text-4xl font-bold text-center">Detalles</h1>

      <DetailCard />
    </div>
  );
}
