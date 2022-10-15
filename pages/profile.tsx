import { initFirebase } from "../firebase/firebaseapp"
import MainContainer from "./components/MainContainer"
import { getAuth, signOut } from "firebase/auth";

function NewPage() {
  const auth = getAuth();

  return (
      <MainContainer>
              <div className="container bg-primary container profile">
        <div className="row">
          <div className="col-md-3 border-right d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center  text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : "/placeholder_user.png"} /><span className="font-weight-bold text-white">{auth.currentUser?.displayName} </span><span className="text-light">Nick Roofthooft</span><span> </span></div>
          </div>
          <div className="col-md-9 p-0">
            <div className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-white">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels text-white">Name</label><input type="text" className="form-control text-white" placeholder="first name" value="Roofthooft"/></div>
                    <div className="col-md-6"><label className="labels text-white">Surname</label><input type="text" className="form-control text-white" value="Nick" placeholder="surname"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels text-white">Mobile Number</label>
                      <input type="text" className="text-white form-control" placeholder="enter phone number" value="+37258656832"/>
                    </div>
                    <div className="col-md-12">
                      <label className="labels text-white">Address Line 1</label>
                      <input type="text" className="text-white form-control" placeholder="enter address line 1" value="Seebi 38-60"/>
                    </div>
                    <div className="col-md-12">
                      <label className="labels text-white">Email</label>z
                      <input type="text" className="text-white form-control" placeholder="enter email" value={auth.currentUser?.email ? auth.currentUser.email : ""} /></div>
                    <div className="col-md-12">
                      <label className="labels text-white">Education</label>
                      <input type="text" className="text-white form-control" placeholder="education" value=""/></div>
                    </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="labels text-white">Country</label>
                      <input type="text" className=" text-white form-control" placeholder="country" value="Estonia"/>

                      </div>
                    <div className="col-md-6">
                      <label className="labels text-white">State/Region</label>
                      <input type="text" className=" text-white form-control" value="tallinn" placeholder="state"/>

                      </div>
                </div>
            </div>
          </div>
      </div>
    </div>
      </MainContainer>

    )
   }
   export default NewPage