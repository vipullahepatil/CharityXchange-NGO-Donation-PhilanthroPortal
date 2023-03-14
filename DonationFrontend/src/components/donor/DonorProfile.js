import { useEffect, useState } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getDonorFromServer } from "../../services/DonerApiService";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonorProfile() {
  const [donorDetails, setDonorDetails] = useState({});
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  const getDonorDetails = async () => {
    const response = await getDonorFromServer(donorObj.donorId);
    if (response.status === 200) {
      setDonorDetails(response.data);
      console.log(response.data);
    }
  };

  //componentDidMount
  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
    getDonorDetails();
  }, []);

  return (
    <>
      <DonorNavigationBar></DonorNavigationBar>
      <Container className="mt-5 mb-5">
        <Card className="shadow-lg p-5">
          <h1 className="text-center mb-5">User Profile</h1>
          <Table responsive striped bordered hover>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{donorDetails.donorName}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{donorDetails.donorPhone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{donorDetails.donorEmail}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{donorDetails.donorAddress}</td>
              </tr>
              <tr>
                <th>ZIP code</th>
                <td>{donorDetails.donorZipCode}</td>
              </tr>
            </tbody>
          </Table>
          <Link to={"/donorEditProfile"}>
            <Button className="mt-3" variant="primary">
              Edit Profile
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}
