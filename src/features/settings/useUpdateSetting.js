import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSetting) => updateSettingApi(newSetting),
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
}
