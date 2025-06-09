"use client";
import { useState } from "react";

export default function Sorting() {
  const [sortBy, setSortBy] = useState("price");
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white/80 text-sm">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-md px-3 py-1 text-white text-sm backdrop-blur-sm"
      >
        <option value="price">Price</option>
        <option value="duration">Duration</option>
        <option value="departure">Departure Time</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}
