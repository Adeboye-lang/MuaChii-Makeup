"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormInput, FormTextarea, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save } from "lucide-react";

interface ContentData {
  hero: {
    headline: string;
    subtitle: string;
  };
  brandStory: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    location: string;
    instagram: string;
  };
}

export default function AdminContentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/admin/content");
        if (!response.ok) throw new Error("Failed to fetch content");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Content fetch error:", error);
        toast("Failed to load content", "error");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [router, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error("Failed to save");
      toast("Content saved successfully!", "success");
    } catch (error) {
      console.error("Content save error:", error);
      toast("Failed to save content", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  if (!content) {
    return (
      <AdminLayout>
        <div className="text-center py-12">No content found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-brand-espresso mb-2">Edit Content</h1>
            <p className="text-xs sm:text-base text-brand-espresso/60">Update all page text and messaging</p>
          </div>
          <Button onClick={handleSave} loading={saving}>
            <Save size={16} className="mr-1.5 inline sm:mr-2" />
            <span className="text-xs sm:text-sm">Save</span>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-brand-nude/30 p-4 sm:p-8 space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-brand-espresso">Hero Section</h2>
          <FormInput
            label="Headline"
            value={content.hero?.headline || ""}
            onChange={(e) =>
              setContent({
                ...content,
                hero: { ...content.hero, headline: e.target.value },
              })
            }
          />
          <FormInput
            label="Subtitle"
            value={content.hero?.subtitle || ""}
            onChange={(e) =>
              setContent({
                ...content,
                hero: { ...content.hero, subtitle: e.target.value },
              })
            }
          />
        </div>

        {/* Brand Story */}
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-brand-nude/30 p-4 sm:p-8 space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-brand-espresso">Brand Story</h2>
          <FormInput
            label="Title"
            value={content.brandStory?.title || ""}
            onChange={(e) =>
              setContent({
                ...content,
                brandStory: { ...content.brandStory, title: e.target.value },
              })
            }
          />
          <FormTextarea
            label="Subtitle (Philosophy)"
            value={content.brandStory?.subtitle || ""}
            onChange={(e) =>
              setContent({
                ...content,
                brandStory: { ...content.brandStory, subtitle: e.target.value },
              })
            }
            rows={3}
          />
          <FormTextarea
            label="Description"
            value={content.brandStory?.description || ""}
            onChange={(e) =>
              setContent({
                ...content,
                brandStory: { ...content.brandStory, description: e.target.value },
              })
            }
            rows={4}
          />
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-brand-nude/30 p-4 sm:p-8 space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-brand-espresso">Contact Information</h2>
          <FormInput
            label="Email"
            type="email"
            value={content.contact?.email || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, email: e.target.value },
              })
            }
          />
          <FormInput
            label="Phone"
            value={content.contact?.phone || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, phone: e.target.value },
              })
            }
          />
          <FormInput
            label="WhatsApp Number"
            value={content.contact?.whatsappNumber || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, whatsappNumber: e.target.value },
              })
            }
          />
          <FormInput
            label="Location"
            value={content.contact?.location || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, location: e.target.value },
              })
            }
          />
          <FormInput
            label="Instagram Handle"
            value={content.contact?.instagram || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, instagram: e.target.value },
              })
            }
          />
        </div>

        {/* Save button at bottom */}
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
