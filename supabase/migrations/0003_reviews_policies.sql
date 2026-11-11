-- =====================================================
-- ScentHub: permissões de escrita das avaliações
-- =====================================================

-- 1. Função que cria ou atualiza a avaliação de quem está ligado
create function public.rate_perfume(p_perfume_id text, p_rating smallint)
returns void
language sql
security invoker
set search_path = ''
as $$
  insert into public.reviews (user_id, perfume_id, rating)
  values ((select auth.uid()), p_perfume_id, p_rating)
  on conflict (user_id, perfume_id)
  do update set rating = excluded.rating;
$$;

-- Só quem tem sessão iniciada a pode chamar
revoke execute on function public.rate_perfume(text, smallint) from public, anon;
grant execute on function public.rate_perfume(text, smallint) to authenticated;

-- 2. Políticas: cada utilizador só mexe na sua avaliação
create policy "Avaliacoes: criar a propria"
  on public.reviews for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Avaliacoes: editar a propria"
  on public.reviews for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- 3. Permissões estreitas (só as colunas necessárias)
grant insert (user_id, perfume_id, rating) on public.reviews to authenticated;
grant update (rating) on public.reviews to authenticated;