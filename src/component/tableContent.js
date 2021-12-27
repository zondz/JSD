import React from "react";
import { BsFillArchiveFill,BsCloudArrowDownFill } from "react-icons/bs";

class TableContent extends React.Component {
  // constructor(props){
  //     super(props);

  // }

  render() {
    return (
      <>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{width:30}} className="index">Index</th>
              <th scope="col" style={{width:330}} className="filename">Filename</th>
              <th scope="col" style={{width:30}} className="version">Version</th>
              <th scope="col" style={{width:90}} className="filesize">Filesize</th>
              <th scope="col" style={{width:330}} className="createTime">Created Time</th>
              <th scope="col" style={{width:30}} className="download">Download</th>
              <th scope="col" style={{width:30}} className="action">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.listFile ? this.props.listFile.map((file, index) =>
            <tr key ={index} >
              <th scope="row">{ (file.name) ? index : null}</th>
              <td>{file.name}</td>
              <td>{file.version}</td>
              <td>{file.fileSize} MB</td>
              <td>{file.createDateTime}</td>
              <td>{file.numberOfDownload}</td>
              <td className="icon"> <a href= {`http://localhost:8080/download/?id=${file.id}`}><BsCloudArrowDownFill onClick={() => this.props.downloadFile(file.id)}/></a> <BsFillArchiveFill onClick={() => this.props.deleteFile(file.id)}/></td>
            </tr>
            )
            : ""
          }
          </tbody>
        </table>
      </>
    );
  }
}
export default TableContent;
