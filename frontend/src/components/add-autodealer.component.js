import React, { Component } from 'react';
import { Container, Card, Col, Form, Button } from 'react-bootstrap';
import {faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AutodealerService from '../services/autodealer.service';
import AuthService from '../services/auth.service';

import Utils from '../utils/utils';


export default class AddAutodealer extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormReset = this.onFormReset.bind(this);

        this.onTitleFocus = this.onTitleFocus.bind(this);
        this.onWorkingHoursStartFocus = this.onWorkingHoursStartFocus.bind(this);
        this.onWorkingHoursEndFocus = this.onWorkingHoursEndFocus.bind(this);
        this.onCityFocus = this.onCityFocus.bind(this);
        this.onAddressFocus = this.onAddressFocus.bind(this);
        this.onDescriptionFocus = this.onDescriptionFocus.bind(this);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onWorkingHoursStartChange = this.onWorkingHoursStartChange.bind(this);
        this.onWorkingHoursEndChange = this.onWorkingHoursEndChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.state = {
            title: "",
            workingHoursStart: "",
            workingHoursEnd: "",
            city: "",
            address: "",
            description: "",

            isTitleInvalid: false,
            isWorkingHoursStartInvalid: false,
            isWorkingHoursEndInvalid: false,
            isCityInvalid: false,
            isAddressInvalid: false,
            isDescriptionInvalid: false,

            titleError: "",
            workingHoursStartError: "",
            workingHoursEndError: "",
            cityError: "",
            addressError: "",
            descriptionError: ""
        }

        this.isFormInvalid = false;
    }

    onTitleFocus = () => {
        this.setState({ isTitleInvalid: false })
    }

    onWorkingHoursStartFocus = () => {
        this.setState({ isWorkingHoursStartInvalid: false })
    }

    onWorkingHoursEndFocus = () => {
        this.setState({ isWorkingHoursEndInvalid: false })
    }

    onCityFocus = () => {
        this.setState({ isCityInvalid: false })
    }

    onAddressFocus = () => {
        this.setState({ isAddressInvalid: false })
    }

    onDescriptionFocus = () => {
        this.setState({ isDescriptionInvalid: false })
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    onWorkingHoursStartChange = (e) => {
        this.setState({ workingHoursStart: e.target.value })
    }

    onWorkingHoursEndChange = (e) => {
        this.setState({ workingHoursEnd: e.target.value })
    }

    onCityChange = (e) => {
        this.setState({ city: e.target.value })
    }

    onAddressChange = (e) => {
        this.setState({ address: e.target.value })
    }

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }

    validate = () => {
        this.isFormInvalid = false;
    
        if (this.state.title.length === 0) {
            this.setState({
                titleError: "Это обязательное поле.",
                isTitleInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.title.length < 3 || this.state.title.length > 100) {
            this.setState({
                titleError: "Длина названия должна быть в диапазоне от 3 до 100 символов.",
                isTitleInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (!this.state.title.match(/^[A-Za-zА-Яа-я0-9 -,.()]+$/)) {
            this.setState({
                titleError: "Название должно состоять только из букв, цифр и символов ' -,.()'.",
                isTitleInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.workingHoursStart === "") {
            this.setState({
                workingHoursStartError: "Время начала работы не выбрано.",
                isWorkingHoursStartInvalid: true
            })
            this.isFormInvalid = true;
        } else if (Utils.compareTime(this.state.workingHoursStart, this.state.workingHoursEnd) !== 1) {
            this.setState({
                workingHoursStartError: "Время работы некорректно.",
                isWorkingHoursStartInvalid: true
            })
            this.isFormInvalid = true;
        }
        
        if (this.state.workingHoursEnd === "") {
            this.setState({
                workingHoursEndError: "Время конца работы не выбрано.",
                isWorkingHoursEndInvalid: true
            })
            this.isFormInvalid = true;
        } else if (Utils.compareTime(this.state.workingHoursStart, this.state.workingHoursEnd) !== 1) {
            this.setState({
                workingHoursEndError: "Время работы некорректно.",
                isWorkingHoursEndInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.city.length === 0) {
            this.setState({
                cityError: "Это обязательное поле.",
                isCityInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.city.length < 2 || this.state.city.length > 50) {
            this.setState({
                cityError: "Длина города должна быть в диапазоне от 2 до 50 символов.",
                isCityInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (!this.state.city.match(/^[A-Za-zА-Яа-я- ]+$/)) {
            this.setState({
                cityError: "Город должен состоять из букв и символов ' -'.",
                isCityInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.address.length === 0) {
            this.setState({
                addressError: "Это обязательное поле.",
                isAddressInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.address.length < 4 || this.state.address.length > 50) {
            this.setState({
                addressError: "Длина адреса должны быть в диапазоне от 4 до 50 символов.",
                isAddressInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (!this.state.address.match(/^[A-Za-zА-Яа-я0-9 .-]+$/)) {
            this.setState({
                addressError: "Адрес должен состоять только из букв, цифр и символов ' .-'.",
                isAddressInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.description.length === 0) {
            this.setState({
                descriptionError: "Это обязательное поле.",
                isDescriptionInvalid: true
            })
            this.isFormInvalid = true
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        this.validate();

        if (!this.isFormInvalid) {
            AutodealerService.add(this.state.title, this.state.workingHoursStart, this.state.workingHoursEnd, this.state.city, this.state.address, this.state.description).then(
                response => {
                    toast.success(response.data.message, {position: toast.POSITION.BOTTOM_RIGHT});

                    this.onFormReset();

                    setTimeout(() => this.props.history.push("/admin/autodealersList"), 5000);
                },
                error => {
                    if (error.response.data.status === 401) {
                        AuthService.logout();
                        this.props.history.push({
                            pathname: "/login",
                            state: {
                                showToast: true,
                                toastMessage: "Сессия истекла, пожалуйста войдите в учетную запись."
                            }
                        });
                    }
                    else {
                        toast.error((error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString(), { position: toast.POSITION.BOTTOM_RIGHT });
                    }
                }
            ).catch(() => {
                toast.error("Что-то пошло не так :(", { position: toast.POSITION.BOTTOM_RIGHT });
            })
        }
    }

    onFormReset = () => {
        this.setState({
            title: "",
            workingHoursStart: "",
            workingHoursEnd: "",
            city: "",
            address: "",
            description: "",

            isTitleInvalid: false,
            isWorkingHoursStartInvalid: false,
            isWorkingHoursEndInvalid: false,
            isCityInvalid: false,
            isAddressInvalid: false,
            isDescriptionInvalid: false
        })
    }

    render() {
        return(
            <Container style={{marginTop: "100px", marginBottom: "100px", width: "60%"}} fluid>
                <Card>
                    <Form noValidate onSubmit={this.onFormSubmit} onReset={this.onFormReset}>
                        <Card.Header style={{fontSize: "20px"}}><FontAwesomeIcon icon={faPlusSquare}/>&nbsp;Добавление автосалона</Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} id="title" className="left__form__group__style">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control
                                        name="title"
                                        type="text"
                                        autoComplete="off"
                                        value={this.state.title}
                                        isInvalid={this.state.isTitleInvalid}
                                        onFocus={this.onTitleFocus}
                                        onChange={this.onTitleChange}
                                        placeholder="Введите название"/>
                                        {this.state.isTitleInvalid ? <span className="error">{this.state.titleError}</span> : null}
                                </Form.Group>
                                <Col style={{display: "flex", flexDirection: "column", marginLeft: "15px"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <Form.Group as={Col} id="title" style={{width: "50%", paddingLeft: "0", marginBottom: "0"}}>
                                            <Form.Label>Начало работы</Form.Label>
                                            <Form.Control
                                                name="workingHoursStart"
                                                as="select"
                                                autoComplete="off"
                                                value={this.state.workingHoursStart}
                                                isInvalid={this.state.isWorkingHoursStartInvalid}
                                                onFocus={this.onWorkingHoursStartFocus}
                                                onChange={this.onWorkingHoursStartChange}>
                                                <option value="" hidden>Выберите...</option>
                                                {
                                                    Utils.generateWorkingHours().map((year, index) => {
                                                        return <option key={index} value={year}>{year}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} id="title" style={{width: "50%", paddingRight: "0", marginBottom: "0"}}>
                                            <Form.Label>Конец работы</Form.Label>
                                            <Form.Control
                                                name="workingHoursEnd"
                                                as="select"
                                                autoComplete="off"
                                                value={this.state.workingHoursEnd}
                                                isInvalid={this.state.isWorkingHoursEndInvalid}
                                                onFocus={this.onWorkingHoursEndFocus}
                                                onChange={this.onWorkingHoursEndChange}>
                                                <option value="" hidden>Выберите...</option>
                                                {
                                                    Utils.generateWorkingHours().map((year, index) => {
                                                        return <option key={index} value={year}>{year}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    {this.state.isWorkingHoursStartInvalid ? <span className="error">{this.state.workingHoursStartError}</span> : null}
                                    {this.state.isWorkingHoursEndInvalid ? <span className="error">{this.state.workingHoursEndError}</span> : null}
                                </Col>
                                
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} className="left__form__group__style">
                                    <Form.Label>Город</Form.Label>
                                    <Form.Control
                                        name="city"
                                        type="text"
                                        autoComplete="off"
                                        value={this.state.city}
                                        isInvalid={this.state.isCityInvalid}
                                        onChange={this.onCityChange}
                                        onFocus={this.onCityFocus}
                                        placeholder="Введите город"/>
                                    {this.state.isCityInvalid ? <span className="error">{this.state.cityError}</span> : null}
                                </Form.Group>
                                <Form.Group as={Col} className="right__form__group__style">
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control
                                        name="address"
                                        type="text"
                                        autoComplete="off"
                                        value={this.state.address}
                                        isInvalid={this.state.isAddressInvalid}
                                        onChange={this.onAddressChange}
                                        onFocus={this.onAddressFocus}
                                        placeholder="Введите адрес"/>
                                    {this.state.isAddressInvalid ? <span className="error">{this.state.addressError}</span> : null}
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Описание</Form.Label>
                                    <Form.Control
                                        name="description"
                                        as="textarea"
                                        autoComplete="off"
                                        value={this.state.description}
                                        isInvalid={this.state.isDescriptionInvalid}
                                        onChange={this.onDescriptionChange}
                                        onFocus={this.onDescriptionFocus}
                                        placeholder="Введите описание"
                                        style={{resize: "none", height: "150px"}}/>
                                    {this.state.isDescriptionInvalid ? <span className="error">{this.state.descriptionError}</span> : null}
                                </Form.Group>
                            </Form.Row>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "40px"}}>
                                <Button variant="primary" type="submit" style={{width: "40%"}}><FontAwesomeIcon icon={faSave}/>&nbsp;Добавить</Button>
                                <Button variant="danger" type="reset" style={{width: "40%"}}><FontAwesomeIcon icon={faUndo}/>&nbsp;Очистить</Button>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>
                <ToastContainer limit={ 3 }/>
            </Container>
        )
    }
}