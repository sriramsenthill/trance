import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const FormContent2 = () => {
  return (
    <form method="post" action="add-parcel.html">
      <div className="form-group register-dual">
        <TabList className="btn-box row">
          <Tab className="col-lg-6 col-md-12">
            <button className="theme-btn btn-style-four">
              <i className="la la-user"></i> Candidate
            </button>
          </Tab>

          <Tab className="col-lg-6 col-md-12">
            <button className="theme-btn btn-style-four">
              <i className="la la-briefcase"></i> Employer
            </button>
          </Tab>
        </TabList>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" name="username" placeholder="Username" required />
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent2;
