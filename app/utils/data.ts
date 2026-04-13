import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

export async function readJSON(filename: string) {
  try {
    const filepath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

export async function writeJSON(filename: string, data: any) {
  try {
    const filepath = path.join(DATA_DIR, filename);
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

export async function getContent() {
  return readJSON("content.json");
}

export async function getServices() {
  return readJSON("services.json");
}

export async function getTestimonials() {
  return readJSON("testimonials.json");
}

export async function getFAQs() {
  return readJSON("faqs.json");
}

export async function getImages() {
  return readJSON("images.json");
}

export async function getBookings() {
  return readJSON("bookings.json");
}

export async function saveContent(content: any) {
  return writeJSON("content.json", content);
}

export async function saveServices(services: any) {
  return writeJSON("services.json", services);
}

export async function saveTestimonials(testimonials: any) {
  return writeJSON("testimonials.json", testimonials);
}

export async function saveFAQs(faqs: any) {
  return writeJSON("faqs.json", faqs);
}

export async function saveImages(images: any) {
  return writeJSON("images.json", images);
}

export async function saveBookings(bookings: any) {
  return writeJSON("bookings.json", bookings);
}

export async function addBooking(booking: any) {
  const bookings = await getBookings();
  if (!bookings || !bookings.bookings) {
    return false;
  }
  bookings.bookings.push({
    id: Date.now(),
    ...booking,
    createdAt: new Date().toISOString(),
  });
  return saveBookings(bookings);
}
