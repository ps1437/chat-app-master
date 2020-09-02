import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "./Auth";

const Home = ({ isLogin }) => {
  const [user, setUser] = useState({ userName: "" });

  let history = useHistory();

  function login(e) {
    e.preventDefault();
    Auth.authenticate();
    history.push("/chat", user);
  }
  return (
    <div class="section-1-container section-container">
      <div class="container">
        <div class="row">
          <div class="col-10 offset-1 col-lg-8 offset-lg-2  d-flex justify-content-center align-items-center">
            <div class="div-to-align">
              <div class="card rounded-1 chat-room-card">
                <div class="card-header chat-header-title">
                  <h3 class="mb-0 text-center">Chat Room</h3>
                </div>
                <div class="card-body">
                  <form
                    class="form"
                    onSubmit={login}
                    autocomplete="off"
                    id="formLogin"
                  >
                    <div class="form-group">
                      <label for="uname">Name</label>
                      <input
                        type="text"
                        required
                        aria-describedby="button-addon2"
                        className="form-control rounded-0 border-0 py-4 bg-light"
                        value={user.userName}
                        onChange={(e) => setUser({ userName: e.target.value })}
                        autoComplete="off"
                        autoFocus="on"
                        placeholder="Please Enter your name"
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-success btn-block font-weight-bold"
                      id="btnJoin"
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
