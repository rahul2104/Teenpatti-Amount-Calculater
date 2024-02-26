import Head from 'next/head';
import Layout from '../../layout/main';
import React, {useEffect, useReducer, useState} from 'react';
import { CloseEyeIcon, EyeIcon } from '../../public/Svg';
import { authService } from '../../services/authService';
import {useRouter} from "next/router";
import {createRoom, manageSession} from "../../api/firebaseApp";

export default function CreateRooms() {
    const router = useRouter();
    const [user,setUser]=useState({});
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            roomName:"",
            roomNameError:""
        }
    );

    useEffect(() => {
        manageSession()
            .then(function (user) {
                if (!user) {
                    router.push('/auth/login', undefined, {shallow: true})
                } else {
                    console.log("user", user);
                    setUser(user);
                }
            })
    }, [])

    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Error']: '',
        });
    };

    const handleValidation = () => {
        let validate = true;
        let { roomName } = state;

        if (roomName.trim() === '' || roomName.trim() === undefined) {
            validate = false;
            setState({
                roomNameError: 'Please enter room name.',
            });
        } else {
            setState({
                roomNameError: '',
            });
        }

        return validate;
    };

    const handleSubmit=()=>{
        if (handleValidation()) {
            createRoom({roomName:state.roomName,ownerId:user.uid,ownerName:user.displayName})
                .then(function (res){
                    router.push('/dashboard', undefined, { shallow: true })
                })
        }
    }

    const cancelCreate=()=>{
        router.push('/dashboard', undefined, { shallow: true })
    }

    return (
        <Layout notFooter={false}>
            <div className="edit-page-wrapper">
                <section className="banner_area"></section>
                <div className="box_1620  container">
                    <div className=" bg-white shadow rounded-lg px-0 ">
                        <div className="profile_heading">
                            <h3>Create Rooms</h3>

                            <hr />
                        </div>

                        <div className="tab-content pb-5 px-4 px-md-5">
                            <div className="row">
                                <div className="col-md-12 ">
                                    <label>Room Name</label>

                                    <div
                                        className={`input-w-icon form-group ${
                                            state.roomNameError ? 'error' : ''
                                        }`}
                                    >
                                        <input
                                            type={'text'}
                                            name="roomName"
                                            value={state.roomName}
                                            onChange={handleOnChange}
                                            placeholder="Room name"
                                            className="form-control"
                                            maxLength="100"
                                        />

                                        {state.roomNameError!=="" ? (
                                            <small className="small red">
                                                {state.roomNameError}
                                            </small>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="mt-3">
                                <button className="btn btn-outline-primary" onClick={cancelCreate}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
