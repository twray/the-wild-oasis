import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createOrUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }) => createOrUpdateCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCabin, isUpdating };
}
