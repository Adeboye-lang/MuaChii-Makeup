"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { FormInput, FormTextarea, Button } from "@/app/admin/components/FormComponents";
import { useToast } from "@/app/admin/components/Toast";
import { Save, Trash2, Plus } from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number | null;
  features: string[];
  description: string;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<{ services: Service[]; serviceInclusions: string[] } | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/admin/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
        toast("Failed to load services", "error");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [router, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });

      if (!response.ok) throw new Error("Failed to save");
      toast("Services saved successfully!", "success");
    } catch (error) {
      console.error(error);
      toast("Failed to save services", "error");
    } finally {
      setSaving(false);
    }
  };

  const updateService = (id: string, field: string, value: string | number | string[] | null) => {
    if (!services) return;
    setServices({
      ...services,
      services: services.services.map((s: Service) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const deleteService = (id: string) => {
    if (!services) return;
    setServices({
      ...services,
      services: services.services.filter((s: Service) => s.id !== id),
    });
    toast("Service deleted", "success");
  };

  const addService = () => {
    if (!services) return;
    const newService: Service = {
      id: Date.now().toString(),
      name: "New Service",
      duration: "",
      price: null,
      features: [],
      description: "",
    };
    setServices({
      ...services,
      services: [...services.services, newService],
    });
    toast("New service added", "success");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  if (!services) {
    return (
      <AdminLayout>
        <div className="text-center py-12">No services found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Manage Services</h1>
            <p className="text-brand-espresso/60">Edit your service offerings and pricing</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={addService} variant="secondary">
              <Plus size={18} className="mr-2 inline" />
              Add Service
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Save size={18} className="mr-2 inline" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {services.services?.map((service: Service) => (
            <div key={service.id} className="bg-white rounded-2xl border-2 border-brand-nude/30 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <FormInput
                    label="Service Name"
                    value={service.name}
                    onChange={(e) => updateService(service.id, "name", e.target.value)}
                  />
                </div>
                <button
                  onClick={() => deleteService(service.id)}
                  className="ml-4 mt-8 p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Duration"
                  value={service.duration}
                  onChange={(e) => updateService(service.id, "duration", e.target.value)}
                  placeholder="e.g., 90 mins"
                />
                <FormInput
                  label="Price (₦)"
                  type="number"
                  value={service.price || ""}
                  onChange={(e) => updateService(service.id, "price", e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="Leave blank for custom quote"
                />
              </div>

              <FormTextarea
                label="Description"
                value={service.description}
                onChange={(e) => updateService(service.id, "description", e.target.value)}
                rows={3}
              />

              <div>
                <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={service.features?.join("\n") || ""}
                  onChange={(e) => updateService(service.id, "features", e.target.value.split("\n").filter(f => f.trim()))}
                  className="w-full px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso focus:outline-none focus:border-brand-blush focus:ring-2 focus:ring-brand-blush/20 transition-all font-medium resize-none"
                  rows={3}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Service Inclusions */}
        <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-6 space-y-4">
          <h3 className="text-xl font-serif text-brand-espresso">What's Included in Every Service</h3>
          <div>
            <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-2">
              Inclusions (one per line)
            </label>
            <textarea
              value={services.serviceInclusions?.join("\n") || ""}
              onChange={(e) =>
                setServices({
                  ...services,
                  serviceInclusions: e.target.value.split("\n").filter(f => f.trim()),
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso focus:outline-none focus:border-brand-blush focus:ring-2 focus:ring-brand-blush/20 transition-all font-medium resize-none"
              rows={4}
            />
          </div>
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
