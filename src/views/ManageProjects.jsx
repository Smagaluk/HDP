"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Loader2, Image as ImageIcon, Save, Plus } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const STATUS_OPTIONS = ['Planning', 'In Development', 'Under Construction', 'Completed', 'Stabilized'];
const PROJECT_TYPE_OPTIONS = ['Mixed-Use', 'Multifamily', 'Commercial', 'Industrial', 'Other'];

function emptyProject() {
  return {
    name: '',
    slug: '',
    location: '',
    status: 'Planning',
    project_type: 'Mixed-Use',
    overview: '',
    investment_thesis: '',
    highlights: [],
    square_feet: '',
    units: '',
    featured: false,
    image_url: '',
    gallery_images: [],
  };
}

export default function ManageProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState(emptyProject());
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.entities.Project.list('order'),
  });

  // Sync form when selection changes
  useEffect(() => {
    if (selectedProject) {
      setFormData({
        name: selectedProject.name ?? '',
        slug: selectedProject.slug ?? '',
        location: selectedProject.location ?? '',
        status: selectedProject.status ?? 'Planning',
        project_type: selectedProject.project_type ?? 'Mixed-Use',
        overview: selectedProject.overview ?? '',
        investment_thesis: selectedProject.investment_thesis ?? '',
        highlights: Array.isArray(selectedProject.highlights) ? [...selectedProject.highlights] : [],
        square_feet: selectedProject.square_feet ?? '',
        units: selectedProject.units ?? '',
        featured: !!selectedProject.featured,
        image_url: selectedProject.image_url ?? '',
        gallery_images: Array.isArray(selectedProject.gallery_images) ? [...selectedProject.gallery_images] : [],
      });
    } else {
      setFormData(emptyProject());
    }
  }, [selectedProject]);

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }) => api.entities.Project.update(id, data),
    onSuccess: (_, { id, data }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setSelectedProject((prev) => (prev?.id === id ? { ...prev, ...data } : prev));
      toast.success('Project saved');
    },
    onError: () => toast.error('Failed to save'),
  });

  const createProjectMutation = useMutation({
    mutationFn: (data) => api.entities.Project.create(data),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setSelectedProject(newProject);
      setFormData({
        name: newProject.name ?? '',
        slug: newProject.slug ?? '',
        location: newProject.location ?? '',
        status: newProject.status ?? 'Planning',
        project_type: newProject.project_type ?? 'Mixed-Use',
        overview: newProject.overview ?? '',
        investment_thesis: newProject.investment_thesis ?? '',
        highlights: Array.isArray(newProject.highlights) ? [...newProject.highlights] : [],
        square_feet: newProject.square_feet ?? '',
        units: newProject.units ?? '',
        featured: !!newProject.featured,
        image_url: newProject.image_url ?? '',
        gallery_images: Array.isArray(newProject.gallery_images) ? [...newProject.gallery_images] : [],
      });
      toast.success('New project added');
    },
    onError: () => toast.error('Failed to add project'),
  });

  const handleSaveDetails = () => {
    if (!selectedProject?.id) return;
    const payload = {
      name: formData.name,
      slug: formData.slug,
      location: formData.location,
      status: formData.status,
      project_type: formData.project_type,
      overview: formData.overview,
      investment_thesis: formData.investment_thesis,
      highlights: formData.highlights,
      square_feet: formData.square_feet,
      units: formData.units,
      featured: formData.featured,
    };
    updateProjectMutation.mutate({ id: selectedProject.id, data: payload });
  };

  const handleFileUpload = async (e, project) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploadPromises = files.map((file) =>
        api.integrations.Core.UploadFile({ file, slug: project.slug })
      );
      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map((r) => r.file_url);
      const currentGallery = project.gallery_images || [];
      const updatedGallery = [...currentGallery, ...newImageUrls];
      await updateProjectMutation.mutateAsync({
        id: project.id,
        data: { gallery_images: updatedGallery },
      });
      setFormData((prev) => ({ ...prev, gallery_images: updatedGallery }));
    } catch {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (project, imageUrl) => {
    const updatedGallery = (project.gallery_images || []).filter((url) => url !== imageUrl);
    await updateProjectMutation.mutateAsync({
      id: project.id,
      data: { gallery_images: updatedGallery },
    });
    setFormData((prev) => ({ ...prev, gallery_images: updatedGallery }));
  };

  const setPrimaryImage = async (project, imageUrl) => {
    await updateProjectMutation.mutateAsync({
      id: project.id,
      data: { image_url: imageUrl },
    });
    setFormData((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const currentProject = selectedProject ? { ...selectedProject, ...formData } : null;
  const highlightsText = formData.highlights.join('\n');

  return (
    <div className="min-h-screen bg-[#F3F2ED] pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-medium text-[#070707] mb-8">Edit projects & photos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Projects list */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 space-y-2 rounded-lg border border-stone-200">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                Projects
              </h2>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center border-dashed border-[#1B2944]/30 text-[#1B2944] hover:bg-[#1B2944]/10 mb-2"
                onClick={() => createProjectMutation.mutate({})}
                disabled={createProjectMutation.isPending}
              >
                {createProjectMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add new project
              </Button>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-md ${
                    selectedProject?.id === project.id
                      ? 'bg-[#1B2944] text-white'
                      : 'bg-[#F3F2ED] text-[#070707] hover:bg-[#474E5E]/20'
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {/* Edit form + photos */}
          <div className="lg:col-span-3 space-y-8">
            {currentProject ? (
              <>
                {/* Project details form */}
                <div className="bg-white p-8 rounded-lg border border-stone-200">
                  <h2 className="text-xl font-medium text-[#070707] mb-6">Project details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                        placeholder="e.g. factory-yards"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(v) => setFormData((p) => ({ ...p, status: v }))}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Project type</Label>
                      <Select
                        value={formData.project_type}
                        onValueChange={(v) => setFormData((p) => ({ ...p, project_type: v }))}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_TYPE_OPTIONS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex items-end">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) =>
                            setFormData((p) => ({ ...p, featured: !!checked }))
                          }
                        />
                        <Label htmlFor="featured" className="font-normal cursor-pointer">
                          Featured on homepage
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="square_feet">Square feet</Label>
                      <Input
                        id="square_feet"
                        value={formData.square_feet}
                        onChange={(e) => setFormData((p) => ({ ...p, square_feet: e.target.value }))}
                        placeholder="e.g. 450,000 SF"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="units">Units</Label>
                      <Input
                        id="units"
                        value={formData.units}
                        onChange={(e) => setFormData((p) => ({ ...p, units: e.target.value }))}
                        placeholder="e.g. 280 residential units"
                        className="bg-white"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="overview">Overview</Label>
                    <Textarea
                      id="overview"
                      value={formData.overview}
                      onChange={(e) => setFormData((p) => ({ ...p, overview: e.target.value }))}
                      rows={3}
                      className="bg-white resize-none"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="thesis">Investment thesis</Label>
                    <Textarea
                      id="thesis"
                      value={formData.investment_thesis}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, investment_thesis: e.target.value }))
                      }
                      rows={3}
                      className="bg-white resize-none"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="highlights">Highlights (one per line)</Label>
                    <Textarea
                      id="highlights"
                      value={highlightsText}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          highlights: e.target.value
                            .split('\n')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={5}
                      placeholder="One highlight per line"
                      className="bg-white resize-none font-mono text-sm"
                    />
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={handleSaveDetails}
                      disabled={updateProjectMutation.isPending}
                      className="bg-[#1B2944] hover:bg-[#070707]"
                    >
                      {updateProjectMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save details
                    </Button>
                  </div>
                </div>

                {/* Photos */}
                <div className="bg-white p-8 rounded-lg border border-stone-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium text-[#070707]">Photos</h2>
                    <label htmlFor={`file-upload-${currentProject.id}`}>
                      <Button
                        type="button"
                        disabled={uploading}
                        className="bg-[#1B2944] hover:bg-[#070707]"
                        onClick={() =>
                          document.getElementById(`file-upload-${currentProject.id}`)?.click()
                        }
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload images
                          </>
                        )}
                      </Button>
                      <input
                        id={`file-upload-${currentProject.id}`}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, currentProject)}
                      />
                    </label>
                  </div>

                  {currentProject.image_url && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                        Primary image
                      </h3>
                      <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden rounded-md">
                        <Image
                          src={currentProject.image_url}
                          alt="Primary"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                      Gallery ({currentProject.gallery_images?.length || 0})
                    </h3>
                    {currentProject.gallery_images?.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {currentProject.gallery_images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative group aspect-video bg-stone-100 overflow-hidden rounded-md"
                          >
                            <Image
                              src={imageUrl}
                              alt={`Gallery ${index + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setPrimaryImage(currentProject, imageUrl)}
                                className="text-xs"
                              >
                                Set as primary
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeImage(currentProject, imageUrl)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-200 rounded-md">
                        <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                        <p className="text-[#474E5E]">No gallery images. Upload above.</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white p-12 text-center rounded-lg border border-stone-200">
                <ImageIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-[#474E5E]">Select a project to edit details and photos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
