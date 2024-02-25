import Head from 'next/head';
import Layout from '../../layout/main';
import { useEffect, useReducer, useState, useRef } from 'react';
import {createRoom, getAllJoinRoom} from "../../api/firebaseApp";
import Link from "next/link";
import {Pagination} from "react-bootstrap";

export default function Index() {
    let [roomList, setRoomList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalCount, setTotalCount] = useState(0);

  useEffect( () => {
      getAllJoinRoom().then(function (res){
          setRoomList(res);
          console.log("res",res);
      })
  }, []);



    const handlePageChange = (pageNumber) => {
        const page = parseInt(pageNumber, 10);
        setActivePage(page);
    };

    const statusChange = async (userId, status) => {
        status = status === 0 ? '1' : '0';
        let params = {
            userId: userId,
            status: status
        };
        let data = await userService.userStatusChange(params);
        if (data.statusCode == 1) {
            getUserList();
            toast.notify(data.responseData.message, { duration: 3, type: "success", title: "Success!!" });
        } else {
            toast.notify(data.error.responseMessage, { duration: 3, type: "error", title: "Error!!" });
        }
    };

    const filterStatus = (e) => {
        console.log("e",e.target);
        setState({ ...state, status: e.target.value, pageNo: 1 }, () => {
            getUserList();
        });
    };

    return (
        <Layout notFooter={false}>
            {console.log("roomList",roomList['-NrTiW76EPn4viMcmcWS'])}
            <div className="edit-page-wrapper">
                <section className="banner_area"></section>
                <div className="box_1620 container">
                    <div className="box_1620 bg-white shadow rounded-lg px-0">
                        <div className="profile_heading table_profile_heading">
                            <div className="row px-md-3 px-2">
                                <div className="col-md-3 col-sm-12">
                                    <h3>Room List</h3>
                                </div>
                                <div className="col-md-9 col-sm-12">
                                    <div className="d-flex flex-cm-column justify-content-md-end">
                                        {/*<div className="item">*/}
                                        {/*    <select placeholder="Status" onChange={filterStatus} value={state.status}>*/}
                                        {/*        <option value="">All</option>*/}
                                        {/*        <option value="1">Active</option>*/}
                                        {/*        <option value="0">Inactive</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        {/*<div className="item">*/}
                                        {/*    <input placeholder="Search" allowClear style={{ width: '100%' }} onChange={(e) => setState({ ...state, search: e.target.value })} />*/}
                                        {/*</div>*/}
                                        <div className="item">
                                            <Link href={"/rooms/create"}><button className="add_emp_btn">Create Room</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>

                        <div className="min-hight-wrapper m-3">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="white bg_blue">
                                    <tr>
                                        <th>S.N.</th>
                                        <th>Room Name</th>
                                        <th>Member Count</th>
                                        <th>Owner</th>
                                        {/*<th>Created</th>*/}
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {roomList.length>0?roomList.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{((pageNo - 1) * limit) + (i + 1)}</td>
                                                <td>{data.roomName}</td>
                                                <td>{data.member.length}</td>
                                                <td>{data.ownerName}</td>
                                                <td>{}</td>
                                                {/*<td>{data.designation}</td>*/}
                                                {/*<td>{data.created}</td>*/}
                                                {/*<td>*/}
                                                {/*    <div className='tb_action_group'>*/}
                                                {/*        <div className="cm_swich_wrapper">*/}
                                                {/*            <input type="checkbox" checked={data.status ? true : false} onChange={() => statusChange(data._id, data.status)} />*/}
                                                {/*            <span className="cm_swich"></span>*/}
                                                {/*        </div>*/}
                                                {/*        <Link href={"/user/profile/"+data._id}><i className="fa fa-edit"></i></Link>*/}
                                                {/*    </div>*/}
                                                {/*</td>*/}
                                            </tr>
                                        )
                                    }):""}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4">
                                <Pagination
                                    hideFirstLastPages={true}
                                    itemClassPrev="page-change"
                                    prevPageText="Prev"
                                    itemClassNext="page-change"
                                    nextPageText="Next"
                                    activePage={pageNo}
                                    itemsCountPerPage={limit}
                                    totalItemsCount={totalCount}
                                    pageRangeDisplayed={4}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
