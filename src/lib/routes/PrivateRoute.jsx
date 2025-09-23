import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <ModalEmpty isShowModal={true}>
        <BgLoading />
      </ModalEmpty>
    );
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
