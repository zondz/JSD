import "./App.css";
import TableContent from "./component/tableContent";
import Pagination from "./component/pagination";
import { BsGearFill } from "react-icons/bs";
import axios from "axios";
import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listFile: [],
      file_input: null,
      file_name: "Choose file",
      numberOfPage: [],
      maxFileSize: 0,
      itemPerPage: 0,
      mimeTypeAllowed: "",
    };
    this.upload = this.upload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.process = this.process.bind(this);
    this.onchangeSetting = this.onchangeSetting.bind(this);
    this.onSaveSetting = this.onSaveSetting.bind(this);
  }
  async process(pageNumber) {
    if (pageNumber == null) {
      let newList = [];
      const fetchApi = await axios.get(
        `http://localhost:8080/pagination/?pageNumber=0`
      );
      newList = fetchApi.data.content;
      let numberOfPage1 = [];
      for (let i = 0; i < fetchApi.data.totalPages; i++) {
        numberOfPage1.push(i);
      }
      this.setState({
        numberOfPage: numberOfPage1,
      });
      this.setState({
        listFile: newList,
      });
    } else {
      let newList = [];
      const fetchApi = await axios.get(
        `http://localhost:8080/pagination/?pageNumber=${pageNumber}`
      );
      newList = fetchApi.data.content;
      let numberOfPage1 = [];
      for (let i = 0; i < fetchApi.data.totalPages; i++) {
        numberOfPage1.push(i);
      }
      this.setState({
        numberOfPage: numberOfPage1,
      });
      this.setState({
        listFile: newList,
      });
    }
  }
  async onSaveSetting(e) {
    const setting = {
      maxFileSize: this.state.maxFileSize,
      itemPerPage: this.state.itemPerPage,
      mimeTypeAllowed: this.state.mimeTypeAllowed,
    };
    const updateSetting = await axios.put(
      "http://localhost:8080/setting",
      setting
    );
    console.log("update", updateSetting.data);
  }
  async downloadFile(id) {
    try {
      await axios.get(`http://localhost:8080/download/?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(id) {
    const confirmBox = window.confirm(
      "Do you really want to delete this file?"
    );
    if (confirmBox === true) {
      try {
        await axios.post(`http://localhost:8080/deleteById/?id=${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async upload(e) {
    e.preventDefault();
    const file = this.state.file_input;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      if(response.data.message === "Invalid type of file"){
        alert(response.data.message)
      }else if(response.data.message === "The size of file bigger than requirement") {
        alert(response.data.message)
      }else if( response.data.message === "save successfully!"){
          window.location.reload();

      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  handleChange(e) {
    const { file_details } = e.target.files[0];
    this.setState({
      file_input: e.target.files[0],
      file_name: e.target.value,
    });
  }
  async componentDidMount() {
    this.process();
  }

  onchangeSetting(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className="container">
        <div className="title1">
          <p className="header1">File Management </p>
          <i className="fas fa-cloud-download-alt"></i>
        </div>
        <div className="container_table">
          <div className="set_up ">
            <div className=" dropdown btn-group mb-2 ml-2">
              <button
                type="button"
                className="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Setting
              </button>
              <div className="dropdown-menu">
                <form className="px-2 py-1" onSubmit={this.onSaveSetting}>
                  <div className="form-group">
                    <label>Max file size (MB)</label>
                    <input
                      required
                      type="number"
                      name="maxFileSize"
                      onChange={this.onchangeSetting}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Item per page</label>
                    <input
                      required
                      type="number"
                      name="itemPerPage"
                      onChange={this.onchangeSetting}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Alow upload type</label>
                    <select
                      className=" form-select-lg form-control"
                      style={{ width: "100%" }}
                      name="mimeTypeAllowed"
                      defaultValue={"option"}
                      onChange={this.onchangeSetting}
                      required
                    >
                      <option value="option" disabled>
                        --Select--
                      </option>
                      <option value="png">png</option>
                      <option value="jpg">jpg</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </form>
              </div>
            </div>
            <div style={{ width: 960 }}></div>
            <div className="input-group mb-3 contain_input">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile02"
                  name="file_input"
                  onChange={this.handleChange}
                />
                <label className="custom-file-label">
                  {this.state.file_name}
                </label>
              </div>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.upload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="table_content">
            <TableContent
              listFile={this.state.listFile}
              deleteFile={this.deleteFile}
              downloadFile={this.downloadFile}
            />
          </div>
        </div>
        <div className="page">
          <Pagination
            numberOfPage={this.state.numberOfPage}
            process={this.process}
          />
        </div>
      </div>
    );
  }
}

export default App;
