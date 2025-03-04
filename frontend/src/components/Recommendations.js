import React from "react";

function Recommendations() {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Latest Trends</h2>
      <div className="grid grid-cols-3 gap-4">
        <img src="/assets/fashion-1.jpg" alt="Fashion 1" className="w-full" />
        <img src="/assets/fashion-2.jpg" alt="Fashion 2" className="w-full" />
        <img src="/assets/fashion-3.jpg" alt="Fashion 3" className="w-full" />
      </div>
    </div>
  );
}

export default Recommendations;
