import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editableCabinId, ...editableCabinValues } = cabinToEdit;
  const isEditing = Boolean(editableCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editableCabinValues : {},
  });

  const { errors: formErrors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function handleFormData(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing) {
      updateCabin(
        { cabin: { ...data, image }, id: editableCabinId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormData)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" errorMessage={formErrors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required." })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={formErrors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least one." },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={formErrors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required.",
            min: { value: 0, message: "Price must be above 0" },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={formErrors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required.",
            validate: (value) => {
              return (
                Number(value) < Number(getValues().regularPrice) ||
                "Discount should be less than the regular price."
              );
            },
          })}
          disabled={isWorking}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={formErrors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This field is required." })}
          defaultValue=""
        />
      </FormRow>

      {!isEditing && (
        <FormRow label="Cabin photo">
          <FileInput
            id="image"
            accept="image/*"
            type="file"
            {...register("image", { required: "This field is required." })}
            disabled={isWorking}
          />
        </FormRow>
      )}

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
