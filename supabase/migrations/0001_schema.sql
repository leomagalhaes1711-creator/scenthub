-- =====================================================
-- ScentHub: esquema inicial
-- =====================================================

-- 1. CATÁLOGO -----------------------------------------

create table public.brands (
  id text primary key,
  name text not null unique,
  logo_url text,
  country text,
  created_at timestamptz not null default now()
);

create table public.perfumes (
  id text primary key,
  name text not null,
  brand_id text not null references public.brands (id),
  image_url text,
  release_year integer check (release_year between 1700 and 2100),
  perfumer text,
  description text,
  created_at timestamptz not null default now()
);

create index perfumes_brand_id_idx on public.perfumes (brand_id);

create table public.notes (
  id text primary key,
  name text not null unique,
  category text not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- Relação muitos-para-muitos entre perfumes e notas
create table public.perfume_notes (
  id bigint generated always as identity primary key,
  perfume_id text not null references public.perfumes (id) on delete cascade,
  note_id text not null references public.notes (id) on delete cascade,
  type text not null check (type in ('top', 'heart', 'base')),
  unique (perfume_id, note_id, type)
);

create index perfume_notes_perfume_id_idx on public.perfume_notes (perfume_id);

-- 2. UTILIZADORES E INTERAÇÕES ------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  perfume_id text not null references public.perfumes (id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, perfume_id)
);

create index reviews_perfume_id_idx on public.reviews (perfume_id);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  perfume_id text not null references public.perfumes (id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index comments_perfume_id_idx
  on public.comments (perfume_id, created_at desc);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  perfume_id text not null references public.perfumes (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, perfume_id)
);

-- 3. ATUALIZAR updated_at AUTOMATICAMENTE -------------

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

create trigger comments_set_updated_at
  before update on public.comments
  for each row execute function public.set_updated_at();

-- 4. MÉDIA E TOTAL DE AVALIAÇÕES ----------------------

create view public.perfume_stats
with (security_invoker = true) as
select
  perfume_id,
  round(avg(rating)::numeric, 1) as rating_average,
  count(*)::int as rating_count
from public.reviews
group by perfume_id;

-- 5. SEGURANÇA: ligar o RLS em todas as tabelas -------

alter table public.brands enable row level security;
alter table public.perfumes enable row level security;
alter table public.notes enable row level security;
alter table public.perfume_notes enable row level security;
alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.comments enable row level security;
alter table public.favorites enable row level security;

-- 6. POLÍTICAS DE LEITURA -----------------------------

create policy "Marcas: leitura publica"
  on public.brands for select
  to anon, authenticated
  using (true);

create policy "Perfumes: leitura publica"
  on public.perfumes for select
  to anon, authenticated
  using (true);

create policy "Notas: leitura publica"
  on public.notes for select
  to anon, authenticated
  using (true);

create policy "Notas dos perfumes: leitura publica"
  on public.perfume_notes for select
  to anon, authenticated
  using (true);

create policy "Perfis: leitura publica"
  on public.profiles for select
  to anon, authenticated
  using (true);

create policy "Avaliacoes: leitura publica"
  on public.reviews for select
  to anon, authenticated
  using (true);

create policy "Comentarios: leitura publica"
  on public.comments for select
  to anon, authenticated
  using (true);

create policy "Favoritos: cada utilizador ve os seus"
  on public.favorites for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- 7. PERMISSÕES (grants) ------------------------------

grant select on
  public.brands,
  public.perfumes,
  public.notes,
  public.perfume_notes,
  public.profiles,
  public.reviews,
  public.comments,
  public.perfume_stats
to anon, authenticated;

grant select on public.favorites to authenticated;