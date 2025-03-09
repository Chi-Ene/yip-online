import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(login(username));
    navigate("/orders");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-lg text-stone-600 md:text-base font-semibold">
        Welcome! Please enter your name to sign in.
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-72 mb-8"
      />

      {username !== "" && (
        <div>
          <Button>Continue</Button>
        </div>
      )}
    </form>
  );
}
