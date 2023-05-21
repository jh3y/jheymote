alter table "public"."decks" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."decks"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."decks"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated"
on "public"."decks"
as permissive
for update
to authenticated
using ((auth.role() = 'authenticated'::text));