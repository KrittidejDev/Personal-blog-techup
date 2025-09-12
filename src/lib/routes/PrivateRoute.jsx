import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BgLoading } from "@/components/Displays/BgLoading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <ModalEmpty isShowModal={true}>
        <BgLoading />
      </ModalEmpty>
    );
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
