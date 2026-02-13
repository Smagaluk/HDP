import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('order'),
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Images updated successfully');
    },
  });

  const handleFileUpload = async (e, project) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => 
        base44.integrations.Core.UploadFile({ file })
      );
      
      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map(r => r.file_url);
      
      const currentGallery = project.gallery_images || [];
      const updatedGallery = [...currentGallery, ...newImageUrls];
      
      await updateProjectMutation.mutateAsync({
        id: project.id,
        data: { gallery_images: updatedGallery }
      });
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (project, imageUrl) => {
    const updatedGallery = (project.gallery_images || []).filter(url => url !== imageUrl);
    await updateProjectMutation.mutateAsync({
      id: project.id,
      data: { gallery_images: updatedGallery }
    });
  };

  const setPrimaryImage = async (project, imageUrl) => {
    await updateProjectMutation.mutateAsync({
      id: project.id,
      data: { image_url: imageUrl }
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F2ED] pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-medium text-[#070707] mb-8">Manage Project Images</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                Projects
              </h2>
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
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

          {/* Image Management */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <div className="bg-white p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-medium text-[#070707]">
                    {selectedProject.name}
                  </h2>
                  <label htmlFor={`file-upload-${selectedProject.id}`}>
                    <Button
                      type="button"
                      disabled={uploading}
                      className="bg-[#1B2944] hover:bg-[#070707]"
                      onClick={() => document.getElementById(`file-upload-${selectedProject.id}`).click()}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </>
                      )}
                    </Button>
                    <input
                      id={`file-upload-${selectedProject.id}`}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, selectedProject)}
                    />
                  </label>
                </div>

                {/* Primary Image */}
                {selectedProject.image_url && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                      Primary Image
                    </h3>
                    <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                      <img
                        src={selectedProject.image_url}
                        alt="Primary"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Gallery Images */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#474E5E] mb-4">
                    Gallery Images ({selectedProject.gallery_images?.length || 0})
                  </h3>
                  {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.gallery_images.map((imageUrl, index) => (
                        <div key={index} className="relative group aspect-video bg-stone-100 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setPrimaryImage(selectedProject, imageUrl)}
                              className="text-xs"
                            >
                              Set as Primary
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(selectedProject, imageUrl)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-200">
                      <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                      <p className="text-[#474E5E]">No gallery images yet</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 text-center">
                <ImageIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-[#474E5E]">Select a project to manage images</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}