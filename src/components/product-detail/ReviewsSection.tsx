import { useState } from 'react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
}

export default function ReviewsSection({ reviews, averageRating }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">نظرات کاربران</h3>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ثبت نظر
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex">{renderStars(Math.round(averageRating))}</div>
          <div className="text-sm text-gray-600">از {reviews.length} نظر</div>
        </div>
      </div>

      {showReviewForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-3">نظر خود را بنویسید</h4>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">امتیاز</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setNewReview({...newReview, rating: star})}
                  className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            placeholder="نظر خود را بنویسید..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2 mt-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              ارسال نظر
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-100 pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{review.user}</div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('fa-IR')}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}