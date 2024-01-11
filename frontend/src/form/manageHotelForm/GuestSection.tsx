import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-10 ">
      <h2 className="text-2xl font-bold text-gray-800">Guest</h2>
      <div className="flex gap-5 bg-gray-400 px-4 py-4  rounded-md">
        <label className=" flex flex-col text-sm text-gray-700 w-1/2">
          Adults
          <input
            defaultValue={0}
            min={1}
            className="rounded py-1 "
            type="number"
            {...register("adultCount", {
              validate: (cnt) => {
                if (cnt > 0) {
                  return true;
                } else {
                  return " Please enter a valid count";
                }
              },
            })}
          />
        </label>
        <label className=" flex flex-col text-sm text-gray-700 w-1/2">
          Children
          <input
            type="number"
            defaultValue={0}
            className="rounded py-1"
            {...register("childrenCount", {
              validate: (cnt) => {
                if (cnt >= 0) {
                  return true;
                } else {
                  return " Please enter a valid count";
                }
              },
            })}
          />
        </label>
      </div>
      {errors.adultCount && (
        <span className="text-sm text-red-500">
          {errors.adultCount.message}{" "}
        </span>
      )}
      {errors.childrenCount && (
        <span className="text-sm text-red-500">
          {errors.childrenCount.message}{" "}
        </span>
      )}
    </div>
  );
};
export default GuestSection;
