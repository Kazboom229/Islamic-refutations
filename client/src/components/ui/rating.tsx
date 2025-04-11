import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  editable?: boolean;
  className?: string;
}

export default function Rating({
  value,
  max = 5,
  onChange,
  editable = false,
  className,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  
  const handleClick = (selectedValue: number) => {
    if (editable && onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className={cn("flex items-center text-yellow-500 text-sm", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        
        // Determine if this position should show a full, half, or empty star
        let starType = "empty";
        if (fullStars > index) {
          starType = "full";
        } else if (fullStars === index && hasHalfStar) {
          starType = "half";
        }
        
        return (
          <span
            key={index}
            className={cn("cursor-default", { "cursor-pointer": editable })}
            onClick={() => handleClick(starValue)}
          >
            {starType === "full" && (
              <Star className="fill-current" />
            )}
            {starType === "half" && (
              <StarHalf className="fill-current" />
            )}
            {starType === "empty" && (
              <Star className="text-gray-500" />
            )}
          </span>
        );
      })}
      <span className="ml-1 text-gray-400">({value.toFixed(1)})</span>
    </div>
  );
}
