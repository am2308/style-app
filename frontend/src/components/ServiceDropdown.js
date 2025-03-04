import React, { useState } from "react";

function ServiceDropdown() {
  const [service, setService] = useState("");

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Choose a Service</h2>
      <select
        className="block w-full border px-4 py-2"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="" disabled>Select a service</option>
        <option value="makeup">Makeup Recommendations</option>
        <option value="clothing">Clothing Suggestions</option>
      </select>
      {service && <p className="mt-4">You selected: {service}</p>}
    </div>
  );
}

export default ServiceDropdown;
