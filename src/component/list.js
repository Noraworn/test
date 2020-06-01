import React, { Component } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import Modal from './detail'

class list extends Component {
    constructor() {
        super();
        this.state = {
            detail: [],
            multiCheck: []
        }
    }

    delete = (e) => {
        var index = e.target.getAttribute('data-key')
        // alert(index)
        var list = JSON.parse(localStorage.getItem('data'))
        list.splice(index, 1)
        this.setState({
            data: list
        })
        localStorage.setItem('data', JSON.stringify(list))
        window.location.reload(false)
    }

    edit = (data, index) => {
        this.setState({
            detail: data,
            detailNo: index,
            dateFormat: new Date(data.birthdayForm)
        })
    }

    multiCheck = (e) => {
        var degree = e.target.value
        if (this.state.multiCheck.includes(degree) == true) {
            var array = this.state.multiCheck
            var array = array.filter(value => value !== degree)
            this.setState({
                multiCheck: array
            })
        } else {
            this.setState({
                multiCheck: [...this.state.multiCheck, e.target.value]
            })
        }
    }

    multiDelete = (e) => {
        var degree = this.state.multiCheck
        var list = JSON.parse(localStorage.getItem('data'))
        // console.log(degree)
        degree.map(index => {
            list.splice( parseInt(index), 1)
            this.setState({
                data: list
            })
        })
        localStorage.setItem('data', JSON.stringify(list))
        window.location.reload(false)
    }

    render() {
        const { list, page, data } = this.props;
        const { detail, detailNo, dateFormat } = this.state
        // console.log(this.state.multiCheck)

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Mobile Phone</th>
                            <th>Nationality</th>
                            <th>Birth Day</th>
                            <th> </th>
                        </tr>
                    </thead>
                    {list && list.map((data, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>
                                        <Form.Check
                                            inline
                                            className="check"
                                            type="checkbox"
                                            id="degree"
                                            value={(page - 1) * 4 + index}
                                            label={(page - 1) * 4 + index}
                                            onClick={(e) => this.multiCheck(e)}
                                        />{data.firstName}{' '}{data.lastName}
                                    </td>
                                    <td>{data.gender}</td>
                                    <td>{data.dialCode}{data.mobilePhone}</td>
                                    <td>{data.nationality}</td>
                                    <td>{data.birthday}</td>
                                    <td>
                                        <div className="text-right ">
                                            {/* <Edit detail={data} detailNo={(page - 1) * 4 + index} nation={nation} phone={phone} title={title} gender={gender} /> */}
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong"
                                                onClick={() => this.edit(data, (page - 1) * 4 + index)}> Detail </button>
                                            {' / '}
                                            <Button variant="warning" data-key={(page - 1) * 4 + index} onClick={this.delete}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </Table>

                <div>
                    <Form.Check
                        inline
                        className="check"
                        label="select all"
                        type="checkbox"
                        id="checkAll"
                    // value={index}
                    // onClick={this.handleChange}
                    />
                    <Button variant="outline-warning" onClick={() => this.multiDelete()}>Delete</Button>
                </div>

                <Modal
                    title={detail.title}
                    firstName={detail.firstName}
                    lastName={detail.lastName}
                    date={detail.date}
                    birthday={detail.birthday}
                    birthdayForm={detail.birthdayForm}
                    nationality={detail.nationality}
                    ID={detail.ID}
                    gender={detail.gender}
                    dialCode={detail.dialCode}
                    mobilePhone={detail.mobilePhone}
                    passportNo={detail.passportNo}
                    salary={detail.salary}
                    detailNo={detailNo}
                    dateFormat={dateFormat}
                    data={data}
                />
            </div>
        )

    }
}

export default list