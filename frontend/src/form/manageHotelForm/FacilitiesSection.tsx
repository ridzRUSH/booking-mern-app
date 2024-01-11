import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotels-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilitiess </h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facilities) => {
          return (
            <label
              key={facilities}
              className="text-sm flex gap-1 text-gray-700"
            >
              <input
                type="checkbox"
                value={facilities}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return "At least one is required";
                    }
                  },
                })}
              />
              <span className=" mx-1">{facilities}</span>
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-sm text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};
export default FacilitiesSection;
