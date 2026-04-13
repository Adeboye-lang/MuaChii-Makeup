"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormTextarea, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  service: string;
}

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testimonials, setTestimonials] = useState<any>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/admin/testimonials");
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        toast("Failed to load testimonials", "error");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, [router, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonials),
      });
      if (!response.ok) throw new Error("Failed to save");
      toast("Testimonials saved successfully!", "success");
    } catch (error) {
      toast("Failed to save testimonials", "error");
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = () => {
    setTestimonials({
      ...testimonials,
      testimonials: [
        ...(testimonials.testimonials || []),
        { id: Date.now(), quote: "", author: "", service: "" },
      ],
    });
  };

  const updateTestimonial = (id: number, field: string, value: string) => {
    setTestimonials({
      ...testimonials,
      testimonials: testimonials.testimonials.map((t: Testimonial) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    });
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials({
      ...testimonials,
      testimonials: testimonials.testimonials.filter((t: Testimonial) => t.id !== id),
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Manage Testimonials</h1>
            <p className="text-brand-espresso/60">Add and edit client testimonials</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={addTestimonial} variant="secondary">
              <Plus size={18} className="mr-2 inline" />
              Add Testimonial
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Save size={18} className="mr-2 inline" />
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {testimonials?.testimonials?.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl border-2 border-brand-nude/30 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-serif text-brand-espresso">Testimonial #{testimonial.id}</h3>
                <button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <FormTextarea
                label="Quote"
                value={testimonial.quote}
                onChange={(e) => updateTestimonial(testimonial.id, "quote", e.target.value)}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Author Name"
                  value={testimonial.author}
                  onChange={(e) => updateTestimonial(testimonial.id, "author", e.target.value)}
                  className="px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso focus:outline-none focus:border-brand-blush font-medium"
                />
                <input
                  type="text"
                  placeholder="Service"
                  value={testimonial.service}
                  onChange={(e) => updateTestimonial(testimonial.id, "service", e.target.value)}
                  className="px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso focus:outline-none focus:border-brand-blush font-medium"
                />
              </div>
            </div>
          ))}
        </div>

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
