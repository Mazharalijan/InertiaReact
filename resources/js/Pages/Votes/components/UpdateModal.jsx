import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {router} from "@inertiajs/react";

 const CreateModal = ({closeModal,updateVotes}) => {
    const [formData, setFormData] = useState({
        voteID : updateVotes.voteID,
        votes: updateVotes.votes
    });
const handleInputs = (e) => {
    const votes = e.target.value;
    setFormData({
            voteID:updateVotes.voteID,
            votes:votes

    });
}
console.log(formData)
    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/votes-update/${formData.voteID}`,formData)
        .then((response)=>{
            // if(response.data.data.status === true){
                router.reload({ only:['votes']});
                closeModal();
            // }
        })
        .catch((error) => {
            console.log(error);
        })
    }

  return (
    <>
        <div className="modal fade bd-example-modal-lg show" id="basicModal"  role="dialog" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog modal-lg" role="document">

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Votes</h5>
              </div>
              <form onSubmit={submitForm}>
              <div className='modal-body'>
                    <div className='table-responsive'>
                        <table className='table table-stripped'>
                            <thead>
                                <tr>
                                    <th>Candidate Name</th>
                                    <th>Party</th>
                                    <th>Symbol</th>
                                    <th>Seat</th>
                                    <th>Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{updateVotes.candidatesconst.candidates.candidateName}</td>
                                    <td>{updateVotes.candidatesconst.symbols.party.partyName}</td>
                                    <td><img style={{ width:'40px', height:'40px' }} src={`http://localhost:8000/PartySymbol/${updateVotes.candidatesconst.symbols.symbolImage}`} /></td>
                                    <td>{updateVotes.candidatesconst.seats.seatCode}</td>
                                    <td>
                                        <input type="hidden" value={updateVotes.voteID} name='voteID' />
                                        <input type="number" name='votes' value={formData.votes} onChange={handleInputs} className='form-control' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
              <div className="modal-footer bg-whitesmoke br">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal} >Close</button>
              </div>
              </form>
            </div>

          </div>
        </div>
    </>
  )
}

export default CreateModal;
