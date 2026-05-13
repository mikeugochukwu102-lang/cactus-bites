import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Cactus — Gallery Admin" }, { name: "robots", content: "noindex" }],
  }),
});

type Photo = {
  id: string;
  image_url: string;
  caption: string | null;
  category: "interior" | "terrace" | "dish";
  sort_order: number;
};

function AdminPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user.email ?? null);
      if (session?.user.id) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle()
          .then(({ data }) => setIsAdmin(!!data));
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUserEmail(session?.user.email ?? null);
      if (session?.user.id) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      }
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-sand text-cactus grid place-items-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cactus/40">Loading…</p>
      </div>
    );
  }

  if (!userEmail) return <AuthForm />;

  return (
    <div className="min-h-screen bg-sand text-cactus font-sans">
      <Toaster />
      <header className="border-b border-cactus/10 px-6 md:px-10 py-5 flex items-center justify-between">
        <h1 className="font-serif text-2xl uppercase tracking-tighter">Cactus · Gallery Admin</h1>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-cactus/60">{userEmail}</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="uppercase tracking-[0.2em] text-[10px] hover:text-gold"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {!isAdmin ? (
          <div className="border border-cactus/15 p-8 text-sm">
            <p className="font-medium mb-2">No admin access yet.</p>
            <p className="text-cactus/70">
              Your account is signed in but does not have the <code>admin</code> role. Ask the site
              owner to grant you access in the backend (table <code>user_roles</code>).
            </p>
          </div>
        ) : (
          <AdminPanel />
        )}
      </main>
    </div>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    setBusy(false);
    if (error) toast.error(error.message);
    else if (mode === "signup") toast.success("Account created — you're signed in.");
  };

  return (
    <div className="min-h-screen bg-sand text-cactus grid place-items-center px-6">
      <Toaster />
      <form onSubmit={submit} className="w-full max-w-sm space-y-6">
        <div className="text-center mb-2">
          <h1 className="font-serif text-3xl uppercase tracking-tighter">Cactus Admin</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-cactus/50 mt-2">
            {mode === "signin" ? "Sign in to manage photos" : "Create staff account"}
          </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-transparent border border-cactus/20 text-sm focus:border-cactus outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 bg-transparent border border-cactus/20 text-sm focus:border-cactus outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-cactus text-sand py-3 text-[11px] uppercase tracking-[0.3em] font-bold disabled:opacity-50"
        >
          {busy ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-[10px] uppercase tracking-[0.3em] text-cactus/50 hover:text-cactus"
        >
          {mode === "signin" ? "Need an account?" : "Already have one?"}
        </button>
      </form>
    </div>
  );
}

function AdminPanel() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<Photo["category"]>("interior");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<
    { name: string; status: "pending" | "uploading" | "done" | "error"; error?: string }[]
  >([]);

  const load = async () => {
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    else setPhotos((data ?? []) as Photo[]);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    setProgress(files.map((f) => ({ name: f.name, status: "pending" })));
    const baseSort = (photos.at(-1)?.sort_order ?? 0);

    const results = await Promise.allSettled(
      files.map(async (file, i) => {
        setProgress((p) =>
          p.map((item, idx) => (idx === i ? { ...item, status: "uploading" } : item)),
        );
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `uploads/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (upErr) throw new Error(upErr.message);
        const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
        const { error: insErr } = await supabase.from("gallery_photos").insert({
          image_url: pub.publicUrl,
          caption: caption || null,
          category,
          sort_order: baseSort + i + 1,
        });
        if (insErr) throw new Error(insErr.message);
      }),
    );

    const failedFiles: File[] = [];
    setProgress((prev) =>
      prev.map((item, idx) => {
        const r = results[idx];
        if (r.status === "fulfilled") return { ...item, status: "done" };
        failedFiles.push(files[idx]);
        return { ...item, status: "error", error: (r.reason as Error).message };
      }),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - succeeded;
    setUploading(false);
    if (succeeded > 0) toast.success(`Uploaded ${succeeded} of ${results.length} photos`);
    if (failed > 0) toast.error(`${failed} upload${failed === 1 ? "" : "s"} failed`);
    if (failed === 0) {
      setFiles([]);
      setCaption("");
      setProgress([]);
    } else {
      setFiles(failedFiles);
    }
    load();
  };

  const remove = async (p: Photo) => {
    if (!confirm("Delete this photo?")) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={upload} className="border border-cactus/10 p-6 md:p-8 space-y-4">
        <h2 className="font-serif text-xl mb-2">Upload photos</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          required
          className="block w-full text-sm"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption applied to all (optional)"
          className="w-full px-4 py-2 border border-cactus/20 bg-transparent text-sm outline-none focus:border-cactus"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Photo["category"])}
          className="w-full px-4 py-2 border border-cactus/20 bg-transparent text-sm"
        >
          <option value="interior">Interior</option>
          <option value="terrace">Terrace</option>
          <option value="dish">Dish</option>
        </select>
        {progress.length > 0 && (
          <ul className="text-xs space-y-1 border-t border-cactus/10 pt-3">
            {progress.map((item, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <span className="truncate text-cactus/70">{item.name}</span>
                <span
                  className={`uppercase tracking-[0.2em] text-[10px] ${
                    item.status === "done"
                      ? "text-gold"
                      : item.status === "error"
                        ? "text-red-600"
                        : "text-cactus/50"
                  }`}
                  title={item.error}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="bg-cactus text-sand px-6 py-2 text-[11px] uppercase tracking-[0.3em] font-bold disabled:opacity-50"
        >
          {uploading
            ? "Uploading…"
            : files.length > 1
              ? `Upload ${files.length} photos`
              : "Upload"}
        </button>
      </form>

      <section>
        <h2 className="font-serif text-xl mb-6">All photos ({photos.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div key={p.id} className="relative group">
              <img
                src={p.image_url}
                alt={p.caption ?? ""}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-cactus/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <span className="text-sand text-[10px] uppercase tracking-[0.2em]">
                  {p.category}
                </span>
                <button
                  onClick={() => remove(p)}
                  className="self-end bg-sand text-cactus px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}