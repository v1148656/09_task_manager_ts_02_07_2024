import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { selectUser } from "../redux/usersSlice";

const UserDetails: FC = () => {
  const { users, idSelectedUser } = useSelector((state: RootState) => state.persons);
    const {street, city, geo, suite, zipcode} = users[idSelectedUser - 1].address as {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    }

    const { id } = useParams();
    console.log(id);
    
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "400px" }}>
        <div className="card-body text-center">
          <h1 className="text-center mb-4">{users[idSelectedUser - 1].name}</h1>
          <p><strong>Company:</strong> {users[idSelectedUser - 1].company.name}</p>
          <p><strong>Phone:</strong> {users[idSelectedUser - 1].phone}</p>
          <p><strong>Email:</strong> {users[idSelectedUser - 1].email}</p>
          <p><strong>Website:</strong> <a href={`http://${users[idSelectedUser - 1].website}`} target="_blank" rel="noopener noreferrer">{users[idSelectedUser - 1].website}</a></p>
          <h5 className="mt-4">Address:</h5>
          <ul className="list-unstyled">
            <li><strong>Street:</strong> {street}</li>
            <li><strong>Suite:</strong> {suite}</li>
            <li><strong>City:</strong> {city}</li>
            <li><strong>Zipcode:</strong> {zipcode}</li>
            <li><strong>Geolocation:</strong> {geo.lat} (latitude), {geo.lng} (longitude)</li>
          </ul>
          {/* <NavLink to='/users'> */}
            <button onClick={() => {
              dispatch(selectUser(0))
              navigate('/users');
            }} className="btn btn-secondary mt-3">
              Close
            </button>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
