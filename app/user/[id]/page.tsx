'use client'
import React, {useEffect, useState} from "react";
import {Descriptions, DescriptionsProps, Layout} from "antd";
import axios from "axios";

const { Header, Content } = Layout;

type Props = {
    params:{
        id: number
    }
}
//
// export function generateMetadata({params: {id}} : Props){
//     return {title: 'My project | User ' + id}
// }

export default function User({params : {id}} : Props){

    const [user, setUser] = useState({})

    const getUser = async () => {
        const res = await axios.get(`https://reqres.in/api/users/${id}`)
        setUser(res.data.data)
    }

    useEffect(() => {
        getUser()
    },[])

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'First Name',
            children: <p>{user.first_name}</p>,
        },
        {
            key: '2',
            label: 'Last Name',
            children: <p>{user.last_name}</p>,
        },
        {
            key: '3',
            label: 'Email',
            children: <p>{user.email}</p>,
        },
        {
            key: '4',
            label: 'Avatar',
            children: <img src={user.avatar}/>,
        },
    ];

    return(
        <div>
            <Header style={{background: "gray" , textAlign: "center"}}><h4>Users</h4></Header>
            <Content style={{margin: 2 + '% ' + 15 + '%'}}>
                <Descriptions title="User Info" items={items} />
            </Content>
        </div>
    )
}