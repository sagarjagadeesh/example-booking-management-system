import React, { Component } from "react";
// import axios from "axios";
import { Table, FormControl } from "react-bootstrap";
import "./Dashboard.scss";
import ReactSelect from "react-select";
import axios from "axios";
import DatePicker from 'react-date-picker';

export const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: "#DDD",
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted #ccc',
        padding: "1rem",
        backgroundColor: "#DDD",
        color: "black",
        fontSize: "1.2rem",
        zIndex: "99999999999999999999999999"
    }),
    control: () => ({
        width: "100%",
        display: "flex",
        color: "black",
        border: ".1rem solid #CCC",
        borderRadius: "2.4rem",
        height: '4rem',
        zIndex: "99999999999999999999999999"
    }),
    singleValue: (provided, state) => ({
        color: "black"
    })
}

class Dashboard extends Component {

    state = {
        data: [],
        isSearchOpen: false,
        filteredData: [],
        status: "",
        deliverStatus: "",
        priority: "",
        startDate: "",
        startDateString: "",
        endDate: "",
        endDateString: ""
    }

    componentDidMount() {
        axios.get("https://k7n9xhnud3.execute-api.eu-west-1.amazonaws.com/default/react_front_get-test")
            .then(payload => {
                this.setState({
                    data: payload.data,
                })
            })
    }

    handleSearch = (ev) => {
        ev.preventDefault();
        if (this.fileInput.value !== '') {
            this.setState({
                isSearchOpen: true
            });
        }
        if (this.fileInput.value === '') {
            this.setState({
                isSearchOpen: false
            });
        }
        let filterData = this.state.data;
        filterData = filterData.filter((data) => {
            let filterDetails = data.Name.S.toLowerCase() + data.RequestID.S.toLowerCase()
            return filterDetails.indexOf(
                ev.target.value.toLowerCase()) !== -1
        });
        this.setState({
            filteredData: filterData
        })
    };

    handleStatus = status => {
        this.setState({
            status,
        })
    }

    handleBooking = deliverStatus => {
        this.setState({
            deliverStatus,
        })
    }

    handlePriority = priority => {
        this.setState({
            priority,
        })
    }

    handleStartDate = date => {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        this.setState({
            startDate: date,
            startDateString: today,
        })
    }


    handleEndDate = endDate => {
        var today = endDate;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        this.setState({
            endDate,
            endDateString: today,
        })
    }

    handleReset = () => {
        this.setState({
            status: "",
            deliverStatus: "",
            priority: "",
            startDate: "",
            startDateString: "",
            endDate: "",
            endDateString: ""
        })
    }

    render() {
        const { data, isSearchOpen, filteredData, status, deliverStatus, priority, isSelectOptionOpen, selectedData, startDate, endDate } = this.state;
        let statusOptions = [{ value: 'Booked', label: 'Booked' }, { value: "Discovery Request", label: 'Discovery Request' }];

        let deliveryOptions = [{ value: 'Good', label: 'Good' }, { value: "Medium", label: 'Medium' }, { value: "Bad", label: 'Bad' }];

        let priorityOptions = [{ value: 'Low', label: 'Low' }, { value: 'Medium', label: "Medium" }, { value: "High", label: "High" }];
        
        let list = data
            .filter(d => d.Status.S.includes(this.state.status.length === 0 ? "" : this.state.status.value))
            .filter(d => d.Delivery.S.includes(this.state.deliverStatus.length === 0 ? "" : this.state.deliverStatus.value))
            .filter(d => d.Priority.S.includes(this.state.priority.length === 0 ? "" : this.state.priority.value))
            .filter(d => d.StartDate.S.includes(this.state.startDateString.length === 0 ? "" : this.state.startDateString))
            .filter(d => d.EndDate.S.includes(this.state.endDateString.length === 0 ? "" : this.state.endDateString))

        return (
            <div className="dashboard container">
                <div className="part-1">
                    <div className="input-area">
                        <FormControl
                            placeholder="Search by Name and Product Id"
                            type="text" name="searchUsers"
                            className="search-input"
                            onSelect={(ev) => this.handleSearch(ev)}
                            ref={ref => (this.fileInput = ref)}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="part-2">
                    <div className="select-area">
                        <label>Status</label>
                        <ReactSelect
                            value={status}
                            onChange={this.handleStatus}
                            options={statusOptions}
                            styles={customStyles}
                            defaultValue="all"
                        />
                    </div>
                    <div className="select-area">
                        <label>Delivery</label>
                        <ReactSelect
                            value={deliverStatus}
                            onChange={this.handleBooking}
                            options={deliveryOptions}
                            styles={customStyles}
                            defaultValue="all"
                        />
                    </div>
                    <div className="select-area">
                        <label>Priority</label>
                        <ReactSelect
                            value={priority}
                            onChange={this.handlePriority}
                            options={priorityOptions}
                            styles={customStyles}
                            defaultValue="all"
                        />
                    </div>
                    <div className="select-area">
                        <label>Start Date</label>
                        <DatePicker
                            onChange={this.handleStartDate}
                            value={startDate}
                        />
                    </div>
                    <div className="select-area">
                        <label>End Date</label>
                        <DatePicker
                            onChange={this.handleEndDate}
                            value={endDate}
                        />
                    </div>
                    <div>
                        <i className="fa fa-refresh" onClick={this.handleReset} />
                    </div>
                </div>
                <div>
                    <Table responsive className="styled-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Request ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Delivery</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isSearchOpen && !isSelectOptionOpen &&
                                list.length > 0 && list.map((data, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className={
                                                data.Status.S.toUpperCase() === "BOOKED"
                                                    ? "booked"
                                                    : data.Status.S.includes("Discovery")
                                                        ? "discoverPending"
                                                        : ""}>
                                                {data.Status.S}
                                            </span>
                                        </td>
                                        <td>{data.Name.S}</td>
                                        <td>{data.RequestID.S}</td>
                                        <td>{data.StartDate.S}</td>
                                        <td>{data.EndDate.S}</td>
                                        <td>{data.Delivery.S}</td>
                                        <td>{data.Priority.S}</td>
                                    </tr>
                                )
                            }

                            {isSearchOpen && !isSelectOptionOpen &&
                                filteredData.length > 0 && filteredData.map((data, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className={
                                                data.Status.S.toUpperCase() === "BOOKED"
                                                    ? "booked"
                                                    : data.Status.S.includes("Discovery")
                                                        ? "discoverPending"
                                                        : ""}>
                                                {data.Status.S}
                                            </span>
                                        </td>
                                        <td>{data.Name.S}</td>
                                        <td>{data.RequestID.S}</td>
                                        <td>{data.StartDate.S}</td>
                                        <td>{data.EndDate.S}</td>
                                        <td>{data.Delivery.S}</td>
                                        <td>{data.Priority.S}</td>
                                    </tr>
                                )}

                            {!isSearchOpen && list.length === 0 && <tr>No Data Found</tr>}
                            {isSearchOpen && !isSelectOptionOpen && filteredData.length === 0 && <tr>No Data Found</tr>}
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}

export default Dashboard;