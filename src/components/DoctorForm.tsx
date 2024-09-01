import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  name: string;
  specialization: string;
  address: string;
  appointment_price: number;
  contactnumber: string;
  email: string;
  availability: string;
  rating: number;
  qualifications: string;
  bio: string;
  photo_url: string;
  certifications: string;
  q: {
    qualification: string;
  }[];
};

export const DoctorForm = () => {
  const Form = useForm<FormValues>({
    defaultValues: {
      q: [{ qualification: "" }],
    },
  });

  const { register, control, handleSubmit, formState } = Form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "q",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  renderCount++;
  return (
    <div className="border p-10 bg-[#282828] rounded-lg">
      <h1 className="pb-5 font-serif">Doctor Form 👩‍⚕️</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="name">
            Enter your name<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="string"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Enter your name",
              },
            })}
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="specialization">
            Specialization<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="string"
            id="specialization"
            {...register("specialization", {
              required: {
                value: true,
                message: "Enter specialization",
              },
            })}
          />
          <p className="error">{errors.specialization?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="address">
            Address<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="string"
            id="address"
            {...register("address", {
              required: { value: true, message: "Enter address" },
            })}
          />
          <p className="error">{errors.address?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="appointment_price">
            Appointment Price<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="number"
            id="appointment_price"
            {...register("appointment_price", {
              required: {
                value: true,
                message: "Enter price",
              },
            })}
          />
          <p className="error">{errors.appointment_price?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="contactnumber">
            Contact Number<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="string"
            id="contactnumber"
            {...register("contactnumber", {
              required: { value: true, message: "Enter contact number" },
            })}
          />
          <p className="error">{errors.contactnumber?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">
            Email<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Enter email",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email fomrat",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="availability">
            Availability hours<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="string"
            id="availability"
            {...register("availability", {
              required: { value: true, message: "Enter availability" },
            })}
          />
          <p className="error">{errors.availability?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="rating">
            Ratings<span className="text-red-500 pl-1">*</span>
          </label>
          <input
            type="number"
            id="rating"
            {...register("rating", {
              required: { value: true, message: "Enter rating" },
            })}
          />
          <p className="error">{errors.rating?.message}</p>
        </div>

        <div>
          <label>
            List of Qualifications <span className="text-red-500 pl-1">*</span>
          </label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="string"
                    {...register(`q.${index}.qualification` as const, {
                      required: { value: true, message: "Enter Qualification" },
                    })}
                  />
                  <p className="error">{errors.q?.message}</p>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              className="btn border-white"
              onClick={() => append({ qualification: "" })}
            >
              Add Qualification
            </button>
          </div>
        </div>
        <br></br>
        <div className="padd">
          <label htmlFor="bio">Bio (about yourself)</label>
          <input type="string" id="bio" {...register("bio")} />
        </div>

        <div className="padd">
          <label htmlFor="photo_url">Photo_url</label>
          <input type="string" id="photo_url" {...register("photo_url")} />
        </div>

        <div className="padd">
          <label htmlFor="certifications">Certifications</label>
          <input
            type="string"
            id="certifications"
            {...register("certifications")}
          />
        </div>

        <button className="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
          SUBMIT
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
