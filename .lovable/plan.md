## Bulk photo upload in /admin

Extend the existing upload form in `src/routes/admin.tsx` to accept multiple files at once, all sharing the chosen category, and upload them in parallel.

### Changes

**`src/routes/admin.tsx` — `AdminPanel` component**
- Change the file input to `multiple` and store `File[]` instead of a single `File`.
- Replace the single caption input with an optional shared caption prefix (e.g. "Terrace evening") — final caption becomes `prefix` or `null` per file. Keep it simple: one optional caption applied to all, or leave blank.
- Add per-file progress state: `{ name, status: "pending" | "uploading" | "done" | "error", error? }[]` rendered as a small list under the form.
- On submit:
  - Compute starting `sort_order` from `photos.at(-1)?.sort_order ?? 0`.
  - For each file (in parallel, e.g. `Promise.allSettled`):
    1. Upload to `gallery` bucket at `uploads/{uuid}.{ext}`.
    2. Get public URL.
    3. Insert row into `gallery_photos` with shared `category`, caption, and incrementing `sort_order`.
    4. Update that file's status.
  - Toast a summary: `"Uploaded X of Y photos"`; toast errors individually.
  - Reset file list on full success; keep failed entries visible for retry.
- Disable the submit button while any file is uploading; label it `Upload N photos`.

### Out of scope
- No backend/schema changes — existing `gallery_photos` table, RLS, and `gallery` bucket already support this.
- No drag-and-drop reordering or per-file caption editing (can be added later if needed).
