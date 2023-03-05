import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import Auth from "./Auth";

const Home = () => {
  const [user, setUser] = useState({ userName: "", roomName: "" });
  const [rooms, setRooms] = useState();
  const [isCreate, setCreateRoom] = useState(false);
  const [isError, setError] = useState();

  const { addToast } = useToasts();
  const socketRef = useRef();
  let history = useHistory();

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.on("rooms", (availableRoom) => {
      setRooms(Object.keys(availableRoom));
    });

    socketRef.current.on("create-room", (newRoom) => {
      setRooms((rooms) => [...rooms, newRoom]);
      addToast(`${newRoom}  Room create successfully`, {
        appearance: "success",
        autoDismiss: true,
      });
      setCreateRoom(false);
      setError("");
      setUser({ userName: "", roomName: "" });
    });
  }, []);

  function creatrOrJoin(e) {
    e.preventDefault();
    if (isCreate) {
      axios
        .post("/create", {
          user,
        })
        .catch((err) => {
          setError(err && err.response && err.response.data.error);
        });
    } else {
      Auth.authenticate();
      axios
        .post("/join", {
          user,
        })
        .then((res) => {
          if (res.status === 200) {
            history.push("/chat", user);
          }
        })
        .catch((err) => {
          setError(err && err.response && err.response.data.error);
        });
    }
  }

  return (
    <div className="section-1-container section-container">
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 col-sm-12 col-xs-12
           offset-md-1 col-lg-8 offset-lg-2 
            d-flex justify-content-center 
            align-items-center"
          >
            <div className="div-to-align">
              {isError ? (
                <div className="alert alert-danger"> {isError}</div>
              ) : (
                ""
              )}
              <div className="card rounded-1 chat-room-card">
                <div className="card-header chat-header-title">
                  <h3 className="mb-0 text-center">
                    {isCreate ? "Create Chat Room" : "Random Chat"}
                  </h3>
                </div>
                <div className="card-body">
                  <form
                    className="form"
                    onSubmit={creatrOrJoin}
                    //action="/create" method="POST"
                    autoComplete="off"
                    id="formLogin"
                  >
                    {!isCreate ? (
                      <div className="form-group">
                        <label htmlFor="uname">Room Name</label>
                        <select
                          className="form-control rounded-0 border-0 bg-light"
                          value={user.roomName}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              roomName: e.target.value,
                            })
                          }
                          required
                        >
                          {" "}
                          <option value=""> -Select room - </option>
                          {rooms &&
                            rooms.map((roomName, index) => (
                              <option key={index} value={roomName}>
                                {" "}
                                {roomName}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <div className="form-group">
                        <label htmlFor="uname">Room Name</label>
                        <input
                          type="text"
                          required
                          aria-describedby="button-addon2"
                          className="form-control rounded-0 border-0 py-4 bg-light"
                          value={user.roomName}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              roomName: e.target.value,
                            })
                          }
                          autoComplete="off"
                          autoFocus="on"
                          placeholder="Please Enter room name"
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="uname">Name</label>
                      <input
                        type="text"
                        required
                        aria-describedby="button-addon2"
                        className="form-control rounded-0 border-0 py-4 bg-light"
                        value={user.userName}
                        onChange={(e) =>
                          setUser({ ...user, userName: e.target.value })
                        }
                        autoComplete="off"
                        autoFocus="on"
                        placeholder="Please Enter your name"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-block font-weight-bold"
                    >
                      {isCreate ? " Create" : "Join"}
                    </button>

                    {isCreate ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCreateRoom(false);
                          setError("");
                          setUser({ userName: "", roomName: "" });
                        }}
                        className="btn btn-info btn-block font-weight-bold"
                      >
                        Cancel
                      </button>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          {rooms && rooms.map((roomName) => <Room title={roomName} />)}
        </div> */}
        <button
          onClick={() => setCreateRoom(!isCreate)}
          title="Create chat room"
          className="btn btn-rounded float"
        >
          <i className="fa fa-plus my-float"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
