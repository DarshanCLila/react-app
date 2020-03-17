import React from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../actions/index";
import './list.css'
const mapStateToProps = state => {
  return { userList: state.userList };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: user => dispatch(deleteUser(user)),
    editUser: user => dispatch(editUser(user))
  }
}
const ConnectedList = (props) => {
  console.log(props.userList);
  return (
    <div className="list">
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
          {
            (props.userList.length) ? 
              props.userList.map((el, index) => (
              <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td><a onClick={() => props.deleteUser(el)}>Delete</a></td>
                  <td><a onClick={() => props.editUser(el)}>Edit</a></td>
              </tr>
              ))
            : (
              <tr>
                <td colSpan="5" className="text-center">
                  There is no Record. Pleas add User
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
console.log(List);
export default List;