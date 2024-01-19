import React, {useEffect, useState} from 'react'
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import Modal from '../Modal/Modal';


const  OperatorList = ({user}) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [shouldRerender, setShouldRerender] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [edituser, setEdituser] = useState('');
    const [modalinfo, setModalinfo] = useState('');


    const showModal = () => {

        setModalinfo({'name': 'Add Operator','btnName' : 'Save'});
        setVisibleModal(true);

    }
    const hideModal = () => {
        setVisibleModal(false);
    }
    const showModlaOnUpdate = (edituser) => {
        setModalinfo({'name': 'Edit Operator','btnName' : 'Update', user:edituser});
        setVisibleModal(true);
    }
    const Users = user.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phoneNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const fetchOperator = () => {
        try{

        }catch(error){
            console.log()
        }
    }

useEffect(()=>{
    setShouldRerender(false)
},[shouldRerender])


  return (
        <>
        <Header />
        <Sidebar />
        {visibleModal && <Modal onHideModal={hideModal} modalVissiablity={setVisibleModal} modalrerender={setShouldRerender} modalInfo={modalinfo} />}
        <div class="row">
        <div class="col-12 col-md-12 col-lg-12">
                <div class="card card-primary">
                  <div class="card-header">
                    <h4>Operator Table</h4>

                    <div class="card-header-form">
                      <form>
                        <div class="input-groupm mt-3 mr-2">
                          <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} class="form-control" placeholder="Search" />

                        </div>
                      </form>
                    </div>


                    <div class="card-header-action">
                      <a style={{ color:'white' }} onClick={showModal} class="btn btn-primary">
                        Add New
                      </a>
                    </div>
                  </div>
                  <div class="card-body">

                    <div class="table-responsive">
                      <table class="table table-striped">
                        <tr>

                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone No</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        {Users.map((item,index)=>(
                            <tr key={index}>

                            <td>{item.name}</td>
                            <td class="align-middle">
                              {item.email}
                            </td>
                            <td>
                              {item.phoneNo}
                            </td>
                            <td>
                                {item.role}
                            </td>
                            <td>
                              {item.status}
                            </td>
                            <td><a style={{ color:'white' }} onClick={() => showModlaOnUpdate(item)} class="btn btn-primary">
                                <i className='fa fa-edit'></i>
                                </a></td>
                          </tr>
                        ))}

                      </table>

                </div>
                  </div>
                </div>

              </div>

        </div>


        </>
  )
}

export default OperatorList;
