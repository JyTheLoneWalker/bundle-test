import { QueryClient } from '@tanstack/react-query';
import { uploadQueryKeys } from './uploadQueryKeys';

const queryClient = new QueryClient();

const onSuccessMutateUpload = (taskId: number) => {
  queryClient.setQueryData(uploadQueryKeys.uploadStatus(taskId), {
    progress: 0,
  });
};

export { onSuccessMutateUpload };
