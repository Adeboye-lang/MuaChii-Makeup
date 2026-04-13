"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormInput, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save } from "lucide-react";

export default function AdminBrandingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/admin/content");
        if (!response.ok) throw new Error("Failed to fetch content");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        toast("Failed to load branding settings", "error");
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
      toast("Branding settings saved!", "success");
    } catch (error) {
      toast("Failed to save branding settings", "error");
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
        <div className="text-center py-12">No branding settings found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Branding & Settings</h1>
            <p className="text-brand-espresso/60">Manage colors, contact info, and brand settings</p>
          </div>
          <Button onClick={handleSave} loading={saving}>
            <Save size={18} className="mr-2 inline" />
            Save Changes
          </Button>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-8 space-y-6">
          <h2 className="text-2xl font-serif text-brand-espresso">Brand Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(content.colors || {}).map(([key, value]: any) => (
              <div key={key} className="flex items-center gap-4">
                <input
                  type="color"
                  value={value}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      colors: { ...content.colors, [key]: e.target.value },
                    })
                  }
                  className="w-16 h-16 rounded-lg cursor-pointer"
                />
                <div>
                  <p className="font-medium text-brand-espresso capitalize">{key}</p>
                  <p className="text-sm text-brand-espresso/50">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-8 space-y-6">
          <h2 className="text-2xl font-serif text-brand-espresso">Social Media</h2>
          <FormInput
            label="Instagram Handle"
            value={content.contact?.instagram || ""}
            onChange={(e) =>
              setContent({
                ...content,
                contact: { ...content.contact, instagram: e.target.value },
              })
            }
            placeholder="@mua.chii"
          />
        </div>

        {/* Save */}
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
