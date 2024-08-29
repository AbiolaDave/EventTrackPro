import * as yup from "yup";


  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
   export const advancedSchema = yup.object().shape({
     username: yup
       .string()
       .min(3, "Please enter a valid username")
       .required("Required"),
     jobType: yup.string().oneOf(["designer", "developer", "manager", "other"], 'select an option').required("Required"),
     acceptedToS: yup
       .boolean().oneOf([true], "accept term")
   });




              //  <div className="mt-3 text-center">
              //    <label className="fw-bold" htmlFor="">
              //      Add Counter:
              //    </label>
              //    <select
              //      className="mx-3 col-9 rounded-2"
              //      name="addCounter"
              //      id="addCounter"
              //    >
              //      {/* <option value="" disabled>
              //     Select a staff
              //   </option> */}
              //      {staff.map((eachStaff, index) => (
              //        <option key={index} value={first}>
              //          {eachStaff.firstname} {eachStaff.lastname}
              //          {/* {console.log(first, val, "THIS IS FIRST")} */}
              //        </option>
              //      ))}
              //    </select>
              //    <div className="text-danger">
              //      {formik.touched.addCounter && formik.errors.addCounter}
              //    </div>
              //  </div>;