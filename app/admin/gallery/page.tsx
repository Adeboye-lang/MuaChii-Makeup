"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormInput, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save, Trash2, Plus } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
  alt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [gallery, setGallery] = useState<{ gallery: GalleryItem[] } | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/admin/gallery");
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error(error);
        toast("Failed to load gallery", "error");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [router, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gallery),
      });

      if (!response.ok) throw new Error("Failed to save");
      toast("Gallery saved successfully!", "success");
    } catch (error) {
      console.error(error);
      toast("Failed to save gallery", "error");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (id: number, field: string, value: string) => {
    if (!gallery) return;
    setGallery({
      ...gallery,
      gallery: gallery.gallery.map((item: GalleryItem) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const deleteItem = (id: number) => {
    if (!gallery) return;
    setGallery({
      ...gallery,
      gallery: gallery.gallery.filter((item: GalleryItem) => item.id !== id),
    });
    toast("Gallery item deleted", "success");
  };

  const addItem = () => {
    if (!gallery) return;
    const newId = Math.max(...gallery.gallery.map(item => item.id), 0) + 1;
    const newItem: GalleryItem = {
      id: newId,
      title: "New Gallery Item",
      category: "Bridal",
      url: "",
      alt: "Gallery item",
    };
    setGallery({
      ...gallery,
      gallery: [...gallery.gallery, newItem],
    });
    toast("New gallery item added", "success");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  if (!gallery) {
    return (
      <AdminLayout>
        <div className="text-center py-12">No gallery found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Manage Gallery</h1>
            <p className="text-brand-espresso/60">Add, edit, and manage your portfolio gallery images</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={addItem} variant="secondary">
              <Plus size={18} className="mr-2 inline" />
              Add Item
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Save size={18} className="mr-2 inline" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Gallery Items */}
        <div className="space-y-4">
          {gallery.gallery.map((item: GalleryItem) => (
            <div key={item.id} className="bg-white rounded-2xl border-2 border-brand-nude/30 p-6 space-y-4">
              {/* Image Preview */}
              <div className="relative">
                {item.url ? (
                  <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-brand-nude/30">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 rounded-xl bg-brand-champagne/50 border-2 border-dashed border-brand-nude/30 flex items-center justify-center">
                    <p className="text-brand-espresso/50 text-sm">No image URL provided</p>
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex-1">
                  <FormInput
                    label="Title"
                    value={item.title}
                    onChange={(e) => updateItem(item.id, "title", e.target.value)}
                    placeholder="e.g., Bridal Glam"
                  />
                </div>
                <div className="flex-1">
                  <FormInput
                    label="Category"
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value)}
                    placeholder="e.g., Bridal"
                  />
                </div>
              </div>

              <div>
                <FormInput
                  label="Image URL"
                  value={item.url}
                  onChange={(e) => updateItem(item.id, "url", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <FormInput
                  label="Alt Text"
                  value={item.alt}
                  onChange={(e) => updateItem(item.id, "alt", e.target.value)}
                  placeholder="Describe the image for accessibility"
                />
              </div>

              {/* Delete Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => router.push("/admin/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            <Save size={18} className="mr-2 inline" />
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
