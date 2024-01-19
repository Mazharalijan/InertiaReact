import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {router} from "@inertiajs/react";


 const CreateModal = ({closeModal,votestype}) => {
    const [seattype, setSeatType] = useState(1);
    const [seattypeslist, setSeatTypeslist] = useState([]);
    const [votesData, setVotesData] = useState([]);
    const [candidatelist, setCandidatelist] = useState([]);
    const [selectseattype, setSelectseattype] = useState({
        seatcode:''
 });

 const handleVotesChange = (index, value,seat,candidate) => {
    const updatedVotesData = [...votesData];
    updatedVotesData[index] = { ...updatedVotesData[index],  votes: value, seat,candidate};

    setVotesData(updatedVotesData);
  };
console.log(votesData)
 const handleseattypes = (e) => {
    const { name , value} = e.target;
    setSelectseattype({
      ...selectseattype,
    [name]:value
    })

  }
  const getCandidatelist = () => {
    axios.post('http://localhost:8000/api/candidate-list',selectseattype)
    .then((response)=>{
       setCandidatelist(response.data.data);
       console.log(response.data.data);
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  // fetch seat types
    const seatTypes = async () => {
        try{
        const response = await axios.get('http://localhost:8000/api/seats/list');
        setSeatTypeslist(response.data.data);

        }catch(error){
            console.log(error)
        }
    }
    // submit form data
    const submitForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/votes-store",votesData)
        .then((response) => {
            router.reload({ only:['votes']});
            closeModal();

        })
        .catch((error) => {
            console.log(error)
        })
    }
// useeffect is used for component rendering control
    useEffect(()=>{
        seatTypes();
        getCandidatelist();
    },[selectseattype])
  return (
    <>
        <div className="modal fade bd-example-modal-lg show" id="basicModal"  role="dialog" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={submitForm}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Enter Votes</h5>
                {votestype == 0 && (
                <div className='form-group'>
                    <select name="seatcode" value={selectseattype.seatcode} onChange={handleseattypes} className='form-control' id="">
                    <option value="">Select Seat</option>
                        {seattypeslist && seattypeslist.map((item,index) => (
                            <option value={item.seatID} key={index}>{item.seatCode}</option>
                        ))}

                    </select>
                </div>
                )}
                {votestype == 1 && (
                <div className='form-group'>
                    <select name="seatcode" value={selectseattype.seatcode} onChange={handleseattypes} className='form-control' id="">
                    <option value="">Select Seat</option>
                        {seattypeslist && seattypeslist.filter(item => item.seatType === 'Provincial').map((item,index) => (
                            <option value={item.seatID} key={index}>{item.seatCode}</option>
                        ))}

                    </select>
                </div>
                )}
                {votestype == 2 && (
                <div className='form-group'>
                    <select name="seatcode" value={selectseattype.seatcode} onChange={handleseattypes} className='form-control' id="">
                        <option value="">Select Seat</option>
                        {seattypeslist && seattypeslist.filter(item => item.seatType === 'National').map((item,index) => (
                            <option value={item.seatID} key={index}>{item.seatCode}</option>
                        ))}

                    </select>
                </div>
                )}
              </div>

              <div className="modal-body" style={{ maxHeight: '380px', overflowY: 'auto' }}>
                {candidatelist ? (
                    <div>

                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Party</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidatelist && candidatelist.map((item,index)=>(
                                <tr key={index}>
                                <td>{item.candidates.candidateName}</td>
                                <td><img style={{ width:'40px', height:'40px' }} src={`http://localhost:8000/PartySymbol/${item.symbols.symbolImage}`} /></td>
                                <td>{item.symbols.party.partyCode}</td>
                                <td>
                                        <input type="hidden" name="candidateID[]" value={item.candidates.candidateID} id="" />
                                        <input type="hidden" name="seatID[]" value={item.fk_seat_id} id="" />
                                        <input type="number" name='votes[]' onChange={(e) => handleVotesChange(index, e.target.value,item.fk_seat_id,item.fk_candidate_id)} className='form-control' />

                                </td>
                            </tr>
                            ))}

                        </tbody>
                    </table>

                  </div>
                ) : (
                    <center>
                        <h5>Select seat type</h5>
                    </center>

                )}



              </div>
              <div className="modal-footer bg-whitesmoke br">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal} >Close</button>
              </div>

            </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default CreateModal;
