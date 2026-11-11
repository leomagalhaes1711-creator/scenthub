-- =====================================================
-- ScentHub: perfis criados automaticamente no registo
-- =====================================================

-- 1. O username tem de ter 3 a 20 letras, números ou _
alter table public.profiles
  add constraint profiles_username_format
  check (username is null or username ~ '^[A-Za-z0-9_]{3,20}$');

-- 2. Função que cria o perfil quando alguém se regista
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  desired text := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
  fallback text := 'user_' || substr(new.id::text, 1, 8);
begin
  -- Se o username escolhido não for válido, usa o automático
  if desired is not null and desired !~ '^[A-Za-z0-9_]{3,20}$' then
    desired := null;
  end if;

  begin
    insert into public.profiles (id, username)
    values (new.id, coalesce(desired, fallback));
  exception
    when unique_violation then
      -- O username já existe: usa o automático
      insert into public.profiles (id, username)
      values (new.id, fallback);
  end;

  return new;
end;
$$;

-- Só o trigger a deve poder executar (ninguém a chama pela API)
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 3. Liga a função ao registo de novos utilizadores
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Cada utilizador pode editar o seu próprio perfil
create policy "Perfis: cada utilizador edita o seu"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Só pode alterar estas duas colunas (nunca o id)
grant update (username, avatar_url) on public.profiles to authenticated;