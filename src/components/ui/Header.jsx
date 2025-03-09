import Username from "../user/UserName";

export default function Header() {
  return (
    <header className="bg-purple-400 uppercase px-4 py-3 border-b border-stone-300 flex items-center justify-between sm:px-6">
      <p className="font-bold tracking-tight md:tracking-widest">YIP Orders</p>

      <Username />
    </header>
  );
}
