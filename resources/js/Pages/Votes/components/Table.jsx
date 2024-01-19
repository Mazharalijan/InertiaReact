import React,{useState} from 'react'
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import Pagination from '../../../Utls/Pagination';

const Table = ({votes,votestype}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVissiablity, setVisibleModal] = useState(false);
    const [updatemodalVissiablity, setUpdateVisibleModal] = useState(false);
    const [updateVotes, setUpdateVotes] = useState([]);

    const showModal = () => {
        setVisibleModal(true)
    }
    const closeModal = () => {
        setVisibleModal(false)
    }
    const updateshowModal = (item) => {
        setUpdateVotes(item);
        setUpdateVisibleModal(true)
    }
    const updatecloseModal = () => {
        setUpdateVisibleModal(false)
    }

        const voteslist = votes.filter(item =>

            item.candidatesconst.candidates.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.candidatesconst.symbols.party.partyName.toLowerCase().includes(searchQuery.toLowerCase())||
            item.candidatesconst.seats.seatCode.toLowerCase().includes(searchQuery.toLowerCase())||
            item.candidatesconst.seats.districts.districtName.toLowerCase().includes(searchQuery.toLowerCase())||
            item.candidatesconst.seats.districts.divisions.divName.toLowerCase().includes(searchQuery.toLowerCase())
          );




  return (

    <>



            {modalVissiablity && <CreateModal votestype={votestype}  closeModal={closeModal} />}
            {updatemodalVissiablity && <UpdateModal updateVotes={updateVotes}   closeModal={updatecloseModal} />}
        <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
                <div>
                  <div className="card-header">

                    <h4>{votestype == 0 ? 'All Seats Votes' :  votestype == 1 ? 'PK Seat Votes' : votestype == 2 ? 'NA Seat Votes' : ''}</h4>


                    <div className="card-header-form">
                      <form>
                        <div className="input-groupm mt-3 mr-2">
                          <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}   class="form-control" placeholder="Search" />

                        </div>
                      </form>
                    </div>


                    <div className="card-header-action">
                      <a onClick={showModal}  class="btn btn-primary" style={{ color:'white' }}>
                        Add New
                      </a>
                    </div>
                  </div>
                  <div className="card-body">

                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tr>

                          <th>Name</th>
                          <th>Seat</th>
                          <th>Party</th>
                          <th>Symbol</th>
                          <th>District</th>
                          <th>Division</th>
                          <th>Votes</th>
                          <th>Action</th>
                        </tr>
                            {voteslist.map((item,index)=> (item.candidatesconst.seats.seatType == 'Provincial' && votestype == 1 ? (
                                 <tr key={index}>

                                 <td>{item.candidatesconst.candidates.candidateName}</td>
                                 <td className="align-middle">
                                   {item.candidatesconst.seats.seatCode}
                                 </td>
                                 <td>
                                   {item.candidatesconst.symbols ? item.candidatesconst.symbols.party.partyName : 'Null'}
                                 </td>
                                 <td>
                                 {item.candidatesconst.symbols ? item.candidatesconst.symbols.symbol : 'Null'}
                                 </td>
                                 <td>
                                  {item.candidatesconst.seats.districts.districtName}
                                 </td>
                                 <td>
                                  {item.candidatesconst.seats.districts.divisions.divName}
                                 </td>
                                 <td>
                                  {item.votes}
                                 </td>
                                 <td><a onClick={()=>updateshowModal(item)} style={{ color:'white', cursor:'pointer' }} className="btn btn-primary">
                                     <i className='fa fa-edit'></i>
                                     </a></td>
                               </tr>
                            ) : (item.candidatesconst.seats.seatType == 'National' && votestype == 2 ? (
                                <tr key={index}>

                                <td>{item.candidatesconst.candidates.candidateName}</td>
                                <td className="align-middle">
                                  {item.candidatesconst.seats.seatCode}
                                </td>
                                <td>
                                  {item.candidatesconst.symbols ? item.candidatesconst.symbols.party.partyName : 'Null'}
                                </td>
                                <td>
                                {item.candidatesconst.symbols ? item.candidatesconst.symbols.symbol : 'Null'}
                                </td>
                                <td>
                                 {item.candidatesconst.seats.districts.districtName}
                                </td>
                                <td>
                                 {item.candidatesconst.seats.districts.divisions.divName}
                                </td>
                                <td>
                                 {item.votes}
                                </td>
                                <td><a onClick={()=>updateshowModal(item)} style={{ color:'white', cursor:'pointer' }} className="btn btn-primary">
                                    <i className='fa fa-edit'></i>
                                    </a></td>
                              </tr>
                           ): ( votestype == 0 ? (
                            <tr key={index}>

                            <td>{item.candidatesconst.candidates.candidateName}</td>
                            <td className="align-middle">
                              {item.candidatesconst.seats.seatCode}
                            </td>
                            <td>
                              {item.candidatesconst.symbols ? item.candidatesconst.symbols.party.partyName : 'Null'}
                            </td>
                            <td>
                            {item.candidatesconst.symbols ? item.candidatesconst.symbols.symbol : 'Null'}
                            </td>
                            <td>
                             {item.candidatesconst.seats.districts.districtName}
                            </td>
                            <td>
                             {item.candidatesconst.seats.districts.divisions.divName}
                            </td>
                            <td>
                             {item.votes}
                            </td>
                            <td><a onClick={()=>updateshowModal(item)} style={{ color:'white', cursor:'pointer' }} className="btn btn-primary">
                                <i className='fa fa-edit'></i>
                                </a></td>
                          </tr>
                       ) : (
                                null
                            )
                            ))))}



                      </table>

                </div>
                  </div>
                </div>

              </div>

        </div>
    </>
  )
}

export default Table;
