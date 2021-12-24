import React from "react";

class Pagination extends React.Component {
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {this.props.numberOfPage.length > 0
            ? this.props.numberOfPage.map((page, index) => (
                <li
                key={index}
                  className="page-item"
                  onClick={() => this.props.process(index)}
                >
                  <p className="page-link">{index}</p>
                </li>
              ))
            : ""}
        </ul>
      </nav>
    );
  }
}
export default Pagination;
