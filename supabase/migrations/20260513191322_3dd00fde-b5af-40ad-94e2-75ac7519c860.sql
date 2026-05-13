
-- Gallery photos table
create table public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  category text not null default 'interior' check (category in ('interior','terrace','dish')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

create policy "Anyone can view photos"
  on public.gallery_photos for select
  using (true);

create policy "Authenticated can insert photos"
  on public.gallery_photos for insert
  to authenticated
  with check (true);

create policy "Authenticated can update photos"
  on public.gallery_photos for update
  to authenticated
  using (true);

create policy "Authenticated can delete photos"
  on public.gallery_photos for delete
  to authenticated
  using (true);

-- Storage bucket for gallery files
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

create policy "Anyone can view gallery files"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "Authenticated can upload gallery files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

create policy "Authenticated can update gallery files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery');

create policy "Authenticated can delete gallery files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');
