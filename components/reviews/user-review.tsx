import ReviewSection from "@/components/reviews/review-section";
import { createClient } from "@/lib/supabase/server";

// Descobre se há sessão e qual a nota que esta pessoa já deu (se deu)
export default async function UserReview({ perfumeId }: { perfumeId: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialRating = 0;

  if (user) {
    const { data } = await supabase
      .from("reviews")
      .select("rating")
      .eq("perfume_id", perfumeId)
      .eq("user_id", user.id)
      .maybeSingle();

    initialRating = data?.rating ?? 0;
  }

  return (
    <ReviewSection
      perfumeId={perfumeId}
      isLoggedIn={Boolean(user)}
      initialRating={initialRating}
    />
  );
}