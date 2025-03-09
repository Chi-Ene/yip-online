import { useSelector } from "react-redux";
import CreateUser from "../components/user/CreateUser";
import Button from "../components/ui/Button";

export default function Login() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="text-center my-10 px-4 sm:my-16">
      <h1 className="text-xl font-bold mb-8 md:text-3xl text-purple-700">
        YIP Online Restaurant Orders.
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/orders">Continue, {username}</Button>
      )}
    </div>
  );
}
