import React, { Component } from 'react';
import { connect } from "react-redux";
import { addUser, updateUser } from "../../actions/index";
import './AddUser.css'

class AddUser extends Component {
    state = {
        title: 'Add',
        buttonName: 'Save User',
        formEnable: false,
        form: {
            name: '',
            email: '',
            phone: ''
        },
        formChange: false,
        errors: {
            name: '',
            email: '',
            phone: '',
        }
    }
    constructor(props) {
        super(props);
    }
    componentDidUpdate (prevProps) {
        if(Object.keys(this.props.currentUser).length && Object.keys(prevProps.currentUser).length === 0) {
            this.setState({
                form: {...this.props.currentUser},
                formEnable: true,
                title: 'Update',
                buttonName: 'Update User',
                formChange: false,
            });
        }
    }
    openCloseForm = (flg) => {
        this.setState({
            formEnable: flg,
            form: {
                name: '',
                email: '',
                phone: ''
            }
        })
    }
    applyValidation = (key, value) => {
        let errors = this.state.errors;
        const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch(key) {
            case 'name':
                errors.name = value.length === 0 ? 'Name is require' : '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is invalid';
                break;
            case 'phone':
                errors.phone = value.length === 10 ? '' : 'Phone number should be 10 digit long';
                break;   
        }
        this.setState({
            errors: {...errors}
        });
    }
    setFormValue = (key, value) => {
        const form = this.state.form;
        this.applyValidation(key, value)
        
        form[key] = value;
        this.setState({
            form: {...form},
            formChange: true
        });
    }
    saveUser = () => {
        if(this.validateForm(this.state.errors)) {
            console.log(this.state)
            if(this.state.title === 'Add') {
                this.props.addUser(this.state.form);
                this.clearAndCloseForm();
            }else {
                this.props.updateUser(this.state.form);
                this.clearAndCloseForm();
            }
            
            
        }else{
            console.error('Invalid Form')
        }
    }
    updateUser = (form) => {
        const userlist = [...this.props.userList];
        console.log(userlist.indexOf(this.props.currentUser))
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          // if we have an error string set valid to false
          (val) => val.length > 0 && (valid = false)
        );
        if (!this.state.formChange) {
            valid = false;
        }
        return valid;
      }
    clearAndCloseForm = () => {
        this.setState({
            formEnable: false,
            title: 'Add',
            buttonName: 'Save User',
            formChange: false,
            form: {
                name: '',
                email: '',
                phone: ''
            }
        });
    }
    render () {
        let enableCls = '';
        if(this.state.formEnable) {
            enableCls = 'open'
        }
        return (
            <div>
                <div className="add-user">
                    <button onClick={() => this.openCloseForm(true)} className="add-user-btn">Add User</button>
                </div>
                <div className={`modal-body ${enableCls}`}>
                    <div className="modal-box">
                        <div className="modal-box-head d-flex">
                            <h3>{this.state.title} user</h3>
                            <a onClick={() => this.openCloseForm(false)} className="ml-auto">X</a>
                        </div>
                        <div className="modal-box-body">
                            <div className="modal-box-body-field">
                                <input type="text" name="name" value={this.state.form.name} onChange={event => this.setFormValue('name', event.target.value)}placeholder="Name" />
                                {
                                    this.state.errors.name.length > 0 && 
                                    <span className='error'>{this.state.errors.name}</span>
                                }
                            </div>
                            <div className="modal-box-body-field">
                                <input type="email" name="email" value={this.state.form.email} placeholder="Email" onChange={event => this.setFormValue('email', event.target.value)} />
                                {
                                    this.state.errors.email.length > 0 && 
                                    <span className='error'>{this.state.errors.email}</span>
                                }
                            </div>
                            <div className="modal-box-body-field">
                                <input type="number" name="phone" value={this.state.form.phone} placeholder="Phone Number" onChange={event => this.setFormValue('phone', event.target.value)} />    
                                {
                                    this.state.errors.phone.length > 0 && 
                                    <span className='error'>{this.state.errors.phone}</span>
                                }
                            </div>
                            
                        </div>
                        <div className="modal-box-footer d-flex">
                        <button disabled={!this.validateForm(this.state.errors)} className="add-user-btn" onClick={this.saveUser}>{this.state.buttonName}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { currentUser: state.currentUser, userList: state.userList };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addUser: user => dispatch(addUser(user)),
        updateUser: user => dispatch(updateUser(user))
    };
}
const UserForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddUser);
export default UserForm;