
-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Replace gallery_photos write policies with admin-only
drop policy if exists "Authenticated can insert photos" on public.gallery_photos;
drop policy if exists "Authenticated can update photos" on public.gallery_photos;
drop policy if exists "Authenticated can delete photos" on public.gallery_photos;

create policy "Admins can insert photos"
  on public.gallery_photos for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update photos"
  on public.gallery_photos for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete photos"
  on public.gallery_photos for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Storage: restrict listing/writes to admins; public URLs still served
drop policy if exists "Anyone can view gallery files" on storage.objects;
drop policy if exists "Authenticated can upload gallery files" on storage.objects;
drop policy if exists "Authenticated can update gallery files" on storage.objects;
drop policy if exists "Authenticated can delete gallery files" on storage.objects;

create policy "Admins can list gallery files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can upload gallery files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update gallery files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete gallery files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));
