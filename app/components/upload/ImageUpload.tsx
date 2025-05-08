'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  defaultImage?: string;
  className?: string;
}

export function ImageUpload({ onImageUploaded, defaultImage, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPreview(data.data.url);
        onImageUploaded(data.data.url);
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // You might want to show a toast message here
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById('imageUpload')?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4 mr-2" />
          )}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>

      {preview && (
        <div className="relative aspect-video w-full max-w-xl">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
} 