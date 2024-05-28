import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { deleteJobAction } from '@/utils/action';
import { Button } from './ui/button';

export const DeleteJobBtn = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }

      toast({
        description: 'job removed',
      });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });
    },
  });

  return (
    <Button size='sm' disabled={isPending} onClick={() => mutate(id)}>
      Delete
    </Button>
  );
};
