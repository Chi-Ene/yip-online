import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { logout } from "./userSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
