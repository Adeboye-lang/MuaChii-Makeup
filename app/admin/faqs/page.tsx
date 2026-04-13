"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormInput, FormTextarea, FormSelect, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = [
  { value: "Before Your Appointment", label: "Before Your Appointment" },
  { value: "Payments & Deposits", label: "Payments & Deposits" },
  { value: "The Service & Products", label: "The Service & Products" },
  { value: "Location & Travel", label: "Location & Travel" },
];

export default function AdminFAQsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [faqs, setFaqs] = useState<any>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch("/api/admin/faqs");
        if (!response.ok) throw new Error("Failed to fetch FAQs");
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        toast("Failed to load FAQs", "error");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, [router, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqs),
      });
      if (!response.ok) throw new Error("Failed to save");
      toast("FAQs saved successfully!", "success");
    } catch (error) {
      toast("Failed to save FAQs", "error");
    } finally {
      setSaving(false);
    }
  };

  const addFAQ = () => {
    setFaqs({
      ...faqs,
      faqs: [
        ...(faqs.faqs || []),
        { id: Date.now(), category: "", question: "", answer: "" },
      ],
    });
  };

  const updateFAQ = (id: number, field: string, value: string) => {
    setFaqs({
      ...faqs,
      faqs: faqs.faqs.map((f: FAQ) =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    });
  };

  const deleteFAQ = (id: number) => {
    setFaqs({
      ...faqs,
      faqs: faqs.faqs.filter((f: FAQ) => f.id !== id),
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
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Manage FAQs</h1>
            <p className="text-brand-espresso/60">Update frequently asked questions</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={addFAQ} variant="secondary">
              <Plus size={18} className="mr-2 inline" />
              Add FAQ
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Save size={18} className="mr-2 inline" />
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {faqs?.faqs?.map((faq: FAQ) => (
            <div key={faq.id} className="bg-white rounded-2xl border-2 border-brand-nude/30 p-6 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <FormSelect
                    label="Category"
                    options={CATEGORIES}
                    value={faq.category}
                    onChange={(e) => updateFAQ(faq.id, "category", e.target.value)}
                  />
                </div>
                <button
                  onClick={() => deleteFAQ(faq.id)}
                  className="mt-8 p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <FormInput
                label="Question"
                value={faq.question}
                onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
              />
              <FormTextarea
                label="Answer"
                value={faq.answer}
                onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                rows={4}
              />
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
