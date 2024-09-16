'use client'
import {Card, Col, Layout, Pagination, Row} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";

const {Meta} = Card

const { Header, Content } = Layout;

const api = axios.create({
    baseURL: 'https://reqres.in/api'
})

export default function Home() {
    const [users, setUsers] = useState([])
    const search = useSearchParams()
    const [page, setPage] = useState(search.get('page') || 1)
    const [totalPages, setTotalPages] = useState(0)

    const router = useRouter()

    const getUsers = async () =>{
        const res = await api.get(`/users?page=${page}`)
        setUsers(res.data.data)
        setTotalPages(res.data.total_pages)

    }
    useEffect(() => {
        getUsers()
    }, [page])

    return (
        <div className="App">
            <Header style={{background: "gray" , textAlign: "center"}}><h4>Users</h4></Header>
            <Content>
                <Row>
                    <Pagination
                        style={{marginLeft: 120, marginTop: 20}}
                        defaultCurrent={page}
                        total={totalPages * 6}
                        defaultPageSize={6}
                        onChange={(page) => {setPage(page); router.push(`user?page=${page}`)}}
                    />
                </Row>
                <h3 style={{marginLeft: 120, marginTop: 20, marginBottom: 20}}>Press the user card to see more details</h3>
                <Row>
                    {users.map((user) => {return(
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240, margin: 5 + '% ' + 25 + '%'}}
                                cover={<img alt={user.first_name + ' ' + user.last_name} src={user.avatar} />}
                            >
                                <a href={`user/${user.id}`}>
                                    <Meta title={user.first_name + ' ' + user.last_name} description={user.email} />
                                </a>
                            </Card>
                        </Col>
                    )})}
                </Row>
            </Content>
        </div>
    );
}

