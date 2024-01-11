import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Image</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFile", {
            validate: (imageFile) => {
              if (imageFile.length === 0) {
                return "Please upload some image";
              }
              if (imageFile.length > 6) {
                return "Total no of file is greatwe than 6 ";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFile && (
        <span className="text-sm text-red-500">{errors.imageFile.message}</span>
      )}
    </div>
  );
};

export default ImageSection;
