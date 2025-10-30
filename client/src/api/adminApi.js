const BASE_URL = "http://localhost:3000/admin/hotels";

// Fetch all hotels
export const fetchAllHotels = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.hotels || [];
};

// Fetch a single hotel by ID
export const fetchHotelById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  return data.hotel; // assuming backend returns { hotel: {...} }
};

// Add a new hotel
export const addHotel = async (formData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("city", formData.city);
  data.append("address", formData.address);
  data.append("description", formData.description);
  data.append("starRating", formData.starRating);

  // ✅ Safe handling for amenities
  let amenitiesArray = [];
  if (typeof formData.amenities === "string") {
    amenitiesArray = formData.amenities.split(",").map(a => a.trim());
  } else if (Array.isArray(formData.amenities)) {
    amenitiesArray = formData.amenities;
  }
  data.append("amenities", JSON.stringify(amenitiesArray));

  data.append("policies", JSON.stringify(formData.policies));
  data.append("coordinates", JSON.stringify(formData.coordinates));

  if (formData.mainPhoto) data.append("mainPhoto", formData.mainPhoto);
  formData.gallery.forEach((file) => data.append("gallery", file));

  const res = await fetch(BASE_URL, { method: "POST", body: data });
  return await res.json();
};

// Update an existing hotel
export const updateHotel = async (id, formData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("city", formData.city);
  data.append("address", formData.address);
  data.append("description", formData.description);
  data.append("starRating", formData.starRating);

  // ✅ Safe handling for amenities
  let amenitiesArray = [];
  if (typeof formData.amenities === "string") {
    amenitiesArray = formData.amenities.split(",").map(a => a.trim());
  } else if (Array.isArray(formData.amenities)) {
    amenitiesArray = formData.amenities;
  }
  data.append("amenities", JSON.stringify(amenitiesArray));

  data.append("policies", JSON.stringify(formData.policies));
  data.append("coordinates", JSON.stringify(formData.coordinates));

  if (formData.mainPhoto) data.append("mainPhoto", formData.mainPhoto);
  formData.gallery.forEach((file) => data.append("gallery", file));

  const res = await fetch(`${BASE_URL}/${id}`, { method: "PUT", body: data });
  return await res.json();
};

// Delete a hotel
export const deleteHotel = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return await res.json();
};
