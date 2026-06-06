import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
}

export default function StarRating({ rating, reviewCount, size = 'sm' }: StarRatingProps) {
  const px = size === 'sm' ? 12 : 16
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={px}
            className={i <= Math.round(rating) ? 'fill-[#F97316] text-[#F97316]' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-[#999999]">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
