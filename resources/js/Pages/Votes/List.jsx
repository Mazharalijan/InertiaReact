import React, { useState } from 'react'
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import Table from './components/Table';


const VotesList = ({votes}) => {

    const [votestype, setVotestype] = useState(0);

    //const [voteslist, setVoteslist] = useState(votes);


    const allVotes = () => {
        setVotestype(0);
    }
    const pkVotes = () => {

        setVotestype(1);
    };

    const naVotes = () => {

        setVotestype(2);
    }




  return (
    <>
        <Header />
        <Sidebar />


        <div className="card card-primary">
                  <div className="card-header">
                    <h4>Votes</h4>
                    <div className="card-header-action">
                      <div className="btn-group">
                        <a  onClick={allVotes} className="btn btn-primary pl-3 pr-3" style={{ color: 'white' }}>All</a>
                        <a  onClick={pkVotes} className="btn btn-primary pl-3 pr-3" style={{ color: 'white' }}>Pk</a>
                        <a  onClick={naVotes} className="btn btn-primary pl-3 pr-3" style={{ color: 'white' }}>Na</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {votestype == 0 && <Table votestype={votestype} votes={votes} />}
                    {votestype == 1 && <Table votestype={votestype} votes={votes} />}
                    {votestype == 2 && <Table votestype={votestype} votes={votes} />}

                  </div>
                </div>
    </>
  )
}

export default VotesList;
