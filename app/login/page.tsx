export default function LoginPage() {
  return <div className="mx-auto max-w-md px-4 py-8"><h1 className="text-2xl font-bold">Log in</h1><form className="mt-4 space-y-3"><input type="email" className="w-full rounded border p-3" placeholder="Email"/><input type="password" className="w-full rounded border p-3" placeholder="Password"/><button className="w-full rounded bg-slate-900 py-3 text-white">Continue</button><button className="w-full rounded border py-3">Email magic link</button></form></div>;
}
