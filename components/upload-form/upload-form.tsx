'use client';

import { Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState, type ChangeEventHandler } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { uploadQueryKeys } from '@/lib/data-access/upload/uploadQueryKeys';
import { postUpload } from '@/lib/data-access/upload/uploadApi';

const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation({
    mutationKey: uploadQueryKeys.upload,
    mutationFn: postUpload,
  });

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = () => {
    if (selectedFile) {
      mutate(selectedFile);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Select a PDF or image file (max 2MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              role="button"
              onClick={triggerFileInput}
            >
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {selectedFile?.name || 'Click to select a file'}
              </p>
            </div>
            <Input
              id="file-input"
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full sm:w-auto"
            disabled={!selectedFile || isPending}
            onClick={onSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload'
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export { UploadForm };
