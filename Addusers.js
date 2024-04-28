import { useState } from "react";

function Addusers() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, Setroles] = useState("");
  const [added, Setadded] = useState(false);
  const [errors, setErrors] = useState({});
  const createuserbody = {
    email,
    password,
    roles,
  };
  const handleSubmit = (e) => {
    console.log(localStorage.getItem("token"));
    e.preventDefault();
    const errors = {};
    async function createuser() {
      const created = await fetch(
        "http://localhost:8080/user/power/createadmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "POST",
          },
          body: JSON.stringify(createuserbody),
        }
      );
      console.log(localStorage.getItem("token"));
      const response = await created.json();
      if (response.ok) {
        Setadded(!added);
      }
      console.log(response);
      //   console.log(created);

      if (!email) {
        errors.email = "email is required";
      }

      if (!password) {
        errors.password = "Password is required";
      }

      if (Object.keys(errors).length === 0) {
        // Perform login logic here
        console.log("Login successful!");
      } else {
        setErrors(errors);
      }
    }

    createuser();
  };

  return (
    <div>
      <div className="">
        <div>
          <h2>create Admin</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            {/* //make this drop down */}
            <label htmlFor="roles">role:</label>

            <select onChange={(e) => Setroles(e.target.value)}>
              <option selected value="USER">
                User
              </option>
              <option selected value="ADMIN">
                admin
              </option>
            </select>
            {/* <input
              type="text"
              id="roles"
              value={roles}
              onChange={(e) => Setroles(e.target.value)}
            /> */}
          </div>
          <button type="submit">Register</button>
        </form>
        {added ? "REGISTERED SUCCESSFULLY" : " "}
      </div>
    </div>
  );
}

export default Addusers;
