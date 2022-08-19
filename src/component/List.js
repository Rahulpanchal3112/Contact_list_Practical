import React from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './List.css';
import axios from "axios";


const List = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get(
                "https://reqres.in/api/users"
            );
            //console.log(response.data.data);
            setUser(response.data.data);
            setLoading(false);
        };

        loadPosts();
    }, []);


    //   console.log(searchTitle);




    return (
        <div>
            <h1 className='text-center'> Contact List</h1>
            <div className='container'>
                <div className='row bg-primary main'>

                    <div className='col-lg-6'>
                        <div className='col-lg-12'>

                            <div className='searchdiv'>
                                <label className='lbl'>Search list</label>
                                <input type='search' placeholder='search' className='searchtxt' onChange={(e) => setSearchTitle(e.target.value)} />
                            </div>
                        </div>





                        {loading ? (
                            <h4>Loading ...</h4>
                        ) : (
                            user.filter((value) => {
                                if (searchTitle === "") {
                                    return value;
                                } else if (
                                    value.first_name.toLowerCase().includes(searchTitle.toLowerCase()) || value.last_name.toLowerCase().includes(searchTitle.toLowerCase())
                                ) {
                                    return value;
                                }
                            })
                                .map((item) => {
                                    return (
                                        <div className="col-lg-12 list-main" key={item.id}>
                                            <div className=" list profile-div">
                                                <img src={item.avatar} alt='' className='profile' />
                                            </div>
                                            <div className="list info">
                                                <h3>{item.first_name} {item.last_name}</h3>
                                                <p className='Email'> {item.email}</p>
                                            </div>
                                        </div>


                                    )
                                })
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
