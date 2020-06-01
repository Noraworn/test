import React, { Component } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import DatePicker from 'react-date-picker'
import Pagination from './Pagination'
import Lists from './list'

class form extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Mr.',
            firstName: '',
            lastName: '',
            date: new Date(),
            birthday: new Date().toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit" }),
            birthdayForm: new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }),
            nationality: 'Afghan',
            ID: null,
            gender: '',
            dialCode: '',
            mobilePhone: null,
            passportNo: null,
            salary: 0,
            data: JSON.parse(localStorage.getItem('data'))
        }
    }

    dateChange = (birthday) => {
        if (birthday !== null) {
            this.setState({
                date: birthday,
                birthday: birthday.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit" }),
                birthdayForm: birthday.toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" })
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        if (localStorage.getItem('data') == null) {
            var data = []
            data.push(this.state)
            localStorage.setItem('data', JSON.stringify(data))
        } else {
            var data = JSON.parse(localStorage.getItem('data'))
            data.push(this.state)
            localStorage.setItem('data', JSON.stringify(data))
        }
        this.setState({
            data: JSON.parse(localStorage.getItem('data'))
        })
    }

    onChangePage = (pageOfItems, page) => {
        this.setState({
            pageOfItems: pageOfItems,
            page: page
        });
    }

    render() {
        const { title, nation, phone, gender } = this.props
        const { pageOfItems, page } = this.state
        console.log(this.state.multiCheck, "check")

        return (
            <div className="container">
                <div >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column md="auto">
                                Title:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control as="select" id="title" onChange={this.handleChange}>
                                    {title && title.map(title => {
                                        return (
                                            <option value={title}>{title}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>

                            <Form.Label column md="auto">
                                First name:
                            </Form.Label>
                            <Col sm>
                                <Form.Control as='input' placeholder="First name" id="firstName" onChange={this.handleChange} required />
                            </Col>

                            <Form.Label column md="auto">
                                Last name:
                            </Form.Label>
                            <Col sm>
                                <Form.Control as='input' placeholder="Last name" id="lastName" onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md="auto">
                                Birthday:
                            </Form.Label>
                            <Col sm="2">
                                <DatePicker
                                    format="dd-MM-yyyy"
                                    onChange={this.dateChange}
                                    value={this.state.date}
                                />
                            </Col>

                            <Form.Label column md="auto">
                                Nationality:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control as="select" id="nationality" onChange={this.handleChange} placeholder="--Please Select--" >
                                    {nation && nation.map(nation => {
                                        return (
                                            <option value={nation}>{nation}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>

                            <Form.Label column md="auto">
                                CitizenID:
                            </Form.Label>
                            <Col sm>
                                <Form.Control type='number' id="ID" onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md="auto">
                                Gender:
                            </Form.Label>
                            <Form.Label column md="auto">
                                {gender && gender.map(gender => {
                                    return (
                                        <Form.Check
                                            inline
                                            name="checked"
                                            label={gender}
                                            type="radio"
                                            id="gender"
                                            value={gender}
                                            onClick={this.handleChange}
                                            required
                                        />
                                    )
                                })}
                            </Form.Label>

                            <Form.Label column md="auto">
                                Mobile Phone:
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control as="select" id="dialCode" onChange={this.handleChange}>
                                    {phone && phone.map(phone => {
                                        return (
                                            <option value={phone.dial_code}>{phone.name} {phone.dial_code}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>
                            <Col sm="2">
                                <Form.Control type="number" id="mobilePhone" onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column md="auto">
                                Passport Number:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control type="number" id="passportNo" onChange={this.handleChange} required />
                            </Col>
                            <Form.Label column md="auto">
                                Expected Salary:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control type="number" id="salary" onChange={this.handleChange} required />
                            </Col>
                            <Form.Label column sm="7">
                                THB
                            </Form.Label>
                            <Col sm>
                                <div className="d-flex flex-row-reverse">
                                    <Button variant="primary" type="submit" >Submit</Button>
                                </div>
                            </Col>
                        </Form.Group>

                    </Form>

                    <div>
                        <div className="d-flex justify-content-center">
                            <div>
                                <Pagination items={this.state.data} onChangePage={this.onChangePage} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Lists list={pageOfItems} page={page} data={this.state.data} />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, owmProps) => {
    return {
        nation: state.nation.nationality,
        phone: state.phone.phone,
        title: state.title.title,
        gender: state.title.gender
    }
}

export default connect(mapStateToProps, null)(form)