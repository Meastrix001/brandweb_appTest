import MainContainer from "./components/MainContainer";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

function NewPage() {
  const auth = getAuth();
  
  const [newUserData, setNewUserData] = useState({
    email: "",
    displayName: "",
    phoneNumber: "",
    photoURL: ""
  });
  const onChange = (e: any) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    checkNewUserData();
  }
  const checkNewUserData = () => {
    if(
      auth.currentUser?.email != newUserData.email ||
      auth.currentUser?.displayName != newUserData.displayName ||
      auth.currentUser?.phoneNumber != newUserData.phoneNumber ||
      auth.currentUser?.photoURL != newUserData.photoURL
    ) {
      return false;
    } else {
      return true;
    }
  }
  const updateUser = () => {
    if(auth.currentUser){
      updateProfile(auth.currentUser, {
        displayName: newUserData.displayName ? newUserData.displayName : auth.currentUser.displayName,
        photoURL:  newUserData.photoURL ? newUserData.photoURL : auth.currentUser.photoURL
      }).then(()=> {
        document.location.reload();
      })
    }
  }

  return (
    <MainContainer>
      <div className="container bg-primary container profile d-flex align-items-center justify-content-center">
        {/* {JSON.stringify(newUserData)} */}
        <div className="row full-width">
          <div className="col-md-3 border-right d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center  text-center p-3 py-5">
                <img alt="" className="rounded-circle mt-5" width="150px" src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : "/placeholder_user.png"} />
                <span className="font-weight-bold text-white">{auth.currentUser?.displayName}</span>
                <span className="text-light">{auth.currentUser?.email}</span>
                <img alt="newPP" className={`${newUserData.photoURL ? "" : "d-none"} rounded-circle mt-5 mb-2`} width="150px" src={newUserData.photoURL}/>
                <p className={`${newUserData.photoURL ? "" : "d-none" } text-white`}>new profile picture</p>
              </div>
          </div>
          <div className="col-md-8 col-12 p-0 d-flex  justify-content-center flex-column">
            <label className="labels text-white">Email</label>
            <input onChange={(e) => {onChange(e)}} type="text" name="email" className="text-white form-control" placeholder={auth.currentUser?.email ? auth.currentUser.email : ""} value={newUserData.email} />

            <label className="labels text-white">Display name</label>
            <input onChange={(e) => {onChange(e)}} type="text" name="displayName" className="text-white form-control" placeholder={auth.currentUser?.displayName ? auth.currentUser.displayName : ""} value={newUserData.displayName} />

            <label className="labels text-white">Phone</label>
            <input onChange={(e) => {onChange(e)}} type="text" name="phoneNumber" className="text-white form-control" placeholder={auth.currentUser?.phoneNumber ? auth.currentUser.phoneNumber : ""} value={newUserData.phoneNumber} />

            <label className="labels text-white">Profile picture</label>
            <input onChange={(e) => {onChange(e)}} type="text" name="photoURL" className="text-white form-control" placeholder={auth.currentUser?.photoURL ? auth.currentUser.photoURL : ""} value={newUserData.photoURL} />

            <button onClick={(e) => {updateUser()}} className={`mt-4 bg-light text-white cursor-pointer ${checkNewUserData() ? "d-none" : ""}`}>Save changes</button>

          </div>
        </div>
      </div>
    </MainContainer>
  )
}
export default NewPage