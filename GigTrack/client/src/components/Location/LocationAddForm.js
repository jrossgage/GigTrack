// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { addLocation } from '../../modules/locationManager';

// const LocationAddForm = ({ toggle }) => {
//     const emptyLocation = {
//         city: '',
//         state: '',
//     };

//     const [newLocation, setNewLocation] = useState(emptyLocation);
//     const history = useHistory();


//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         const key = e.target.id;

//         const locationCopy = { ...newLocation };

//         locationCopy[key] = value;
//         setNewLocation(locationCopy);
//     };

//     const handleLocationSave = (e) => {
//         e.preventDefault();

//         if (newLocation.city === '' || newLocation.state === '') {
//             window.alert(`Please input more information`)

//             setNewLocation({
//                 city: '',
//                 state: ''
//             })
//             // return history.push('/location/add');
//         }
//         else {
//             addLocation(newLocation).then(() => {
//                 toggle();
//             });
//         }
//     }

//     // useEffect(() => {
//     //     // getClients();
//     //     // getLocations();
//     // }, [])

//     return (
//         <>
//             <FormGroup>
//                 <Label for="City">City</Label>
//                 <Input type="text" name="city" id="city" placeholder="city"
//                     value={newLocation.city}
//                     onChange={handleInputChange} />
//             </FormGroup>
//             <FormGroup>
//                 <Label for="state">State</Label>
//                 <Input type="number" name="state" id="state" placeholder="state"
//                     value={newLocation.state}
//                     onChange={handleInputChange} />
//             </FormGroup>

//             <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
//             <Button className="btn btn-primary" onClick={toggle()}>Cancel</Button>
//         </>
//     );
// }
// export default LocationAddForm;