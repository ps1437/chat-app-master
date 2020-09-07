import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import Auth from "./Auth";
import Room from "./room/Room";

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
        .catch(err=>{
         
          setError(err && err.response && err.response.data.error);
        }
          );;
    } else {
      Auth.authenticate();
      axios
        .post("/join", {
          user,
        })
        .then((res) => {
          if (res.status == 200) {
            history.push("/chat", user);
          }
        }).catch(err=>{
         
          setError(err && err.response && err.response.data.error);
        }
          );
    }
  }

  return (
    <div class="section-1-container section-container">
      <div class="container">
        <div class="row">
          <div
            class="col-md-8 col-sm-12 col-xs-12
           offset-md-1 col-lg-8 offset-lg-2 
            d-flex justify-content-center 
            align-items-center"
          >
            <div class="div-to-align">
              {isError ? (
                <div className="alert alert-danger"> {isError}</div>
              ) : (
                ""
              )}
              <div class="card rounded-1 chat-room-card">
                <div class="card-header chat-header-title">
                  <h3 class="mb-0 text-center">
                    {isCreate ? "Create Chat Room" : "Random Chat"}
                  </h3>
                </div>
                <div class="card-body">
                  <form
                    class="form"
                    onSubmit={creatrOrJoin}
                    //action="/create" method="POST"
                    autocomplete="off"
                    id="formLogin"
                  >
                    <div class="form-group">
                      <label for="uname">Room Name</label>
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

                    <div class="form-group">
                      <label for="uname">Name</label>
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
                      class="btn btn-success btn-block font-weight-bold"
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
                        } }
                        class="btn btn-info btn-block font-weight-bold"
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
        <div className="row">
          {rooms && rooms.map((roomName) => <Room title={roomName} />)}
        </div>
        <button
          onClick={() => setCreateRoom(!isCreate)}
          title="Create chat room"
          class="btn btn-rounded float"
        >
          <i class="fa fa-plus my-float"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
