import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { BgLoading } from "@/components/Displays/BgLoading";
import ModalEmpty from "@/components/Displays/ModalEmpty";

const RoleRoute = ({ roles }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading)
    return (
      <ModalEmpty isShowModal={true}>
        <BgLoading />
      </ModalEmpty>
    );
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !hasRole(roles)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RoleRoute;
