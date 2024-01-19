import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import {router} from "@inertiajs/react";

import axios from 'axios';

const Modal = ({onHideModal,modalInfo,modalrerender,modalVissiablity}) => {
    const [district, setDistricts] = useState([]);
    const [formErrors, setFormErrors] = useState('');
    const [values, setValues] = useState({
      userId : modalInfo.user && modalInfo.user.id,
      name:modalInfo.user && modalInfo.user.name,
      district: modalInfo.user && modalInfo.user.fk_district_id,
      email:modalInfo.user && modalInfo.user.email,
      phone:modalInfo.user && modalInfo.user.phoneNo
    });

    const handleInputs = (e) => {
      const { name , value} = e.target;
      setValues({
        ...values,
      [name]:value
      })
    }


    const _token = document.querySelector('meta[name="csrf-token"]').content;
    const getDistrict = async () => {

      try{
          const response = await axios.get('http://localhost:8000/single-districts');
          setDistricts(response.data.data);

      }catch(error){
          console.log(error)
      }
  }
  const submitForm = async (e) => {

    e.preventDefault();
    setValues({
      ...values,
      '_token' : _token
    });

    try{
        if(values.userId !== undefined){
            const response = await axios.put('/operator/'+values.userId,values);
            if(response.data.status === true){
                // data inserted successfully
                modalVissiablity(false)
                modalrerender(true)
                router.reload({ only: ['user'] })
              }else{
                // data not inserted

                setFormErrors(response.data.error);
              }
        }else{

            const response = await axios.post('/operator',values);
            if(response.data.status === true){
                // data inserted successfully
                modalVissiablity(false)
                modalrerender(true)
                router.reload({ only: ['user'] })
              }else{
                // data not inserted

                setFormErrors(response.data.error);
              }
        }


    }catch(error) {
      // some internal error
      setFormErrors(response.data.error);

    }
  }

  useEffect(()=>{
    getDistrict();
  },[])


  return (
    <>
        <div className="modal fade show" id="basicModal"  role="dialog" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{modalInfo.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">

                </button>
              </div>
              <form onSubmit={submitForm}>
              <div className="modal-body">

                    <div className="form-group">
                      <label>District</label>
                      <select name="district" value={values.district} onChange={handleInputs} className='form-control' id="">
                      <option value="" >Select District</option>
                        {district.map(item=>(
                            <option value={item.distID} selected={values.district && values.district === item.distID}>{item.districtName}</option>
                        ))}

                      </select>
                      <p className='text-danger'>{formErrors.district && formErrors.district[0]}</p>
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name='name' onChange={handleInputs} value={values.name}  placeholder='Enter Name' className="form-control" />
                      <p className='text-danger'>{formErrors.name && formErrors.name[0]}</p>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name='email' onChange={handleInputs} value={values.email} placeholder='Enter Email' className="form-control" />
                      <p className='text-danger'>{formErrors.email && formErrors.email[0]}</p>
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" name='phone' onChange={handleInputs} value={values.phone} placeholder='Enter Phone' className="form-control" />
                      <p className='text-danger'>{formErrors.phone && formErrors.phone[0]}</p>
                    </div>


              </div>
              <div className="modal-footer bg-whitesmoke br">
                <button type="submit" className="btn btn-primary">{modalInfo.btnName}</button>
                <button type="button" className="btn btn-secondary" onClick={onHideModal}  >Close</button>
              </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}


export default Modal;
