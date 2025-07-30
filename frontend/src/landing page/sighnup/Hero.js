import React from "react";

function HeroSignup() {
  return (
    <div className="container">
      <div className="p-3 mt-5 mb-5">
        <h3 className="text-center mb-4">
          Open a free demat and trading account online
        </h3>
        <h5 className="text-center text-muted">
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </h5>
      </div>
      <div className="row mt-5 p-3">
        <div className="col-5" style={{ marginLeft: "10%" }}>
          <img
            src="images/account_open.svg"
            alt="Signup"
            // style={{ width: "80%" }}
          />
        </div>
        <div className="col-5">
          <form>
            <h3 className="pt-5">Signup Now</h3>
            <h5 className="text-muted">Or track your existing application</h5>
            <input
              placeholder="Email@id.com"
              style={{
                width: "60%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            ></input>
            <br></br>
            <button
              className="btn btn-primary mt-4 fs-5"
              style={{ width: "30%", height: "40%", margin: "0 auto" }}
              
            >
              Get OTP
            </button>
          </form>
          <p className="mt-4">
            By proceeding, you agree to the ProfitProfile{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              terms
            </a>{" "}
            &{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSignup;
