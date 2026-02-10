// app/review/page.tsx
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

type Review = {
  id: string;
  text: string;
  stars: number;
};

export default async function ReviewPage() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const reviews: Review[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Review, "id">),
  }));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl mb-4">レビュー一覧</h1>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-4 border rounded">
          <div className="text-yellow-500 text-lg mb-1">
            {"★".repeat(review.stars)}{" "}
            {"☆".repeat(5 - review.stars)}
          </div>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}
