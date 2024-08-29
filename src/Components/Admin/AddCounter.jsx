import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";

const AddCounter = (props) => {
  const [scanResults, setScanResults] = useState([]);
  const [counter, setCounter] = useState("");
  const [foundCounter, setFoundCounter] = useState([]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 450,
        height: 350,
        color: "red",
      },
      fps: 5,
    });

    scanner.render(success, error);

    async function success(result) {
      let found = await result;
      try {
        scanner.clear();
        console.log(counter, result, found, "ooo");
        await sendReq(result);
        setScanResults([...scanResults, result]);
        console.log(scanResults, result);
      } catch (err) {
        console.log(err);
      }
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, [foundCounter]);

  useEffect(() => {
    if (foundCounter.length > 0) {
      console.log(foundCounter, "found counter here 43", counter);
      saveCounter(counter);
    }
  }, [foundCounter, counter]);

  const sendReq = async (result) => {
    try {
      let url = "https://eventtrackpro-backend.onrender.com/admin/scantrial";
      let scannedCounter = result;
      axios.post(url, { scannedCounter }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          console.log(response.data.users, "message");
          setFoundCounter(response.data.users);
          setCounter(response.data.users);
          console.log(foundCounter, "found counter here", counter, scanResults);
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const saveCounter = async (counter) => {
    if (foundCounter.length > 0) {
      let firstname = foundCounter[0].firstname;
      let lastname = foundCounter[0].lastname;
      let userName = foundCounter[0].userName;
      let gender = foundCounter[0].gender;
      let email = foundCounter[0].email;
      let admin = props.admin;
      let uniqueId = foundCounter[0].userName + admin;
      console.log(
        firstname,
        lastname,
        userName,
        gender,
        foundCounter,
        uniqueId
      );
      try {
        let url = "https://eventtrackpro-backend.onrender.com/admin/scan";

        await axios
          .post(url, { firstname, lastname, userName, gender, admin, uniqueId, email })
          .then((response) => {
            console.log(response);
            if (response.data.status) {
              console.log("hello", response.data.status);
            } else {
              console.log(response.data.message);
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No users found in foundCounter");
    }
  };

  return (
    <>
      <div className="create">
        <div className="container-two col-5 col-sm-4 mx-auto p-3 mt-5">
          <div className="text-center text-success fw-bold">
            <h3 className="fw-bold">Add Counters</h3>
          </div>
          <div className="mt-5">
            {foundCounter.map((scanResult, index) => (
              <div key={index} className="mt-3">
                <h2 className="text-success">Counter {index + 1}</h2>
                <div>
                  {scanResult ? (
                    <ul>
                      <li>
                        <p>First Name: {scanResult.firstname}</p>
                      </li>
                      <li>
                        <p>Last Name: {scanResult.lastname}</p>
                      </li>
                      <li>
                        <p>Username: {scanResult.userName}</p>
                      </li>
                      <li>
                        <p>Gender: {scanResult.gender}</p>
                      </li>
                    </ul>
                  ) : (
                    <div>Error scanning user</div>
                  )}
                </div>
              </div>
            ))}
            <div id="reader">Scan QR Code</div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default AddCounter;
