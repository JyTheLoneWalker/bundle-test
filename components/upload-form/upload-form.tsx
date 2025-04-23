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
import { useMutation, useQueries } from '@tanstack/react-query';
import { uploadQueryKeys } from '@/lib/data-access/upload/uploadQueryKeys';
import {
  getUploadStatus,
  postUpload,
} from '@/lib/data-access/upload/uploadApi';
import { onSuccessMutateUpload } from '@/lib/data-access/upload/uploadResponseHandler';
import { Progress } from '../ui/progress';

const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pendingTaskList, setPendingTaskList] = useState<number[]>([]);
  const { mutate, isPending } = useMutation({
    mutationKey: uploadQueryKeys.upload,
    mutationFn: postUpload,
    onSuccess: async (data) => {
      if ('task_id' in data && typeof data.task_id === 'number') {
        setPendingTaskList([...pendingTaskList, data.task_id]);
        onSuccessMutateUpload(data.task_id);
      }
    },
  });
  const pendingTaskPollResults = useQueries({
    queries: pendingTaskList.map((taskId) => ({
      queryKey: uploadQueryKeys.uploadStatus(taskId),
      queryFn: () => getUploadStatus(taskId),
      refetchInterval: 3000,
      retry: 3,
      combine: (results: { data: { task_id: string; progress: number } }[]) => {
        return {
          data: results.map((result) => result.data),
        };
      },
    })),
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

      {!!pendingTaskList.length &&
        pendingTaskPollResults.map((task) => (
          <>
            <Card key={task.data?.task_id}>
              <CardHeader>
                <CardTitle>Uploading {task.data?.name}</CardTitle>
                <CardDescription>
                  <Progress value={task.data?.progress} />{' '}
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        ))}
    </>
  );
};

export { UploadForm };
