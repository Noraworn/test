import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import DatePicker from 'react-date-picker'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            firstName: '',
            lastName: '',
            date: new Date(),
            birthday: '',
            birthdayForm: '',
            nationality: '',
            ID: null,
            gender: '',
            dialCode: '',
            mobilePhone: null,
            passportNo: null,
            salary: 0,
            detailNo: null,
            dateFormat: new Date()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            date: nextProps.date,
            birthday: nextProps.birthday,
            birthdayForm: nextProps.birthdayForm,
            nationality: nextProps.nationality,
            ID: nextProps.ID,
            gender: nextProps.gender,
            dialCode: nextProps.dialCode,
            mobilePhone: nextProps.mobilePhone,
            passportNo: nextProps.passportNo,
            salary: nextProps.salary,
            detailNo: nextProps.detailNo,
            dateFormat: nextProps.dateFormat
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    dateChange = (birthday) => {
        // console.log((birthday))
        if (birthday !== null) {
            this.setState({
                date: birthday,
                birthday: birthday.toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit" }),
                birthdayForm: birthday.toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }),
                dateFormat: birthday
            })
        }
    }

    handleUpdate = (e) => {
        var data = JSON.parse(localStorage.getItem('data'))
        data.splice(this.state.detailNo, 1, this.state)
        localStorage.setItem('data', JSON.stringify(data))

        this.setState({
            data: JSON.parse(localStorage.getItem('data'))
        })
        window.location.reload(false)
    }

    render() {
        const { titleName, nation, gender, phone } = this.props
        // console.log(this.state)
        // console.log(this.props)

        return (
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered rec" role="document">
                    <div class="modal-content">

                        <div class="modal-body">
                            <div class="container-fluid">
                                <br />
                                <Form onSubmit={this.handleUpdate}>
                                    <Form.Group as={Row}>
                                        <Form.Label column md="auto">
                                            Title:
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control as="select" id="title" value={this.state.title} onChange={(e) => this.handleChange(e)}>
                                                {titleName && titleName.map(title => {
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
                                            <Form.Control as='input' value={this.state.firstName} id="firstName" onChange={(e) => this.handleChange(e)} required />
                                        </Col>

                                        <Form.Label column md="auto">
                                            Last name:
                                        </Form.Label>
                                        <Col sm>
                                            <Form.Control as='input' value={this.state.lastName} id="lastName" onChange={(e) => this.handleChange(e)} required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column md="auto">
                                            Birthday:
                                        </Form.Label>
                                        <Col sm="2">
                                            <DatePicker
                                                format="dd-MM-yyyy"
                                                onChange={(e) => this.dateChange(e)}
                                                value={this.state.dateFormat}
                                            />
                                        </Col>

                                        <Form.Label column md="auto">
                                            Nationality:
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control as="select" value={this.state.nationality} id="nationality" onChange={this.handleChange} >
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
                                            <Form.Control type='number' value={this.state.ID} id="ID" onChange={(e) => this.handleChange(e)} required />
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
                                                        onClick={(e) => this.handleChange(e)}
                                                        required
                                                    />
                                                )
                                            })}
                                        </Form.Label>

                                        <Form.Label column md="auto">
                                            Mobile Phone:
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control as="select" value={this.state.dialCode} id="dialCode" onChange={(e) => this.handleChange(e)}>
                                                {phone && phone.map(phone => {
                                                    return (
                                                        <option value={phone.dial_code}>{phone.name} {phone.dial_code}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Control type="number" value={this.state.mobilePhone} id="mobilePhone" onChange={(e) => this.handleChange(e)} required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column md="auto">
                                            Passport Number:
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control type="number" value={this.state.passportNo} id="passportNo" onChange={(e) => this.handleChange(e)} required />
                                        </Col>

                                        <Form.Label column md="auto">
                                            Expected Salary:
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control type="number" value={this.state.salary} id="salary" onChange={(e) => this.handleChange(e)} required />
                                        </Col>
                                        <Form.Label column sm="auto">
                                            THB
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                        <div class="d-flex justify-content-end">
                                            <Button variant="primary" type="submit" >Submit</Button>
                                            &nbsp;
                                            <Button variant="outline-secondary" data-dismiss="modal" >CANCEL</Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state, owmProps) => {
    return {
        nation: state.nation.nationality,
        phone: state.phone.phone,
        titleName: state.title.title,
        gender: state.title.gender
    }
}

export default connect(mapStateToProps, null)(Modal)