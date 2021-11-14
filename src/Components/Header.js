import React from 'react';
import '../Styles/header.css';
import{ withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Modal from 'react-modal';
import axios from 'axios'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoginModalIsOpen: false,
            isLoggedIn: false,
            isSignUpIsOpen:false,
            loggedInUser: undefined,
            email:'',
            password:'',
            firstname: '',
            lastname: ''
        }
    }


    handleNavigate =() => {
        this.props.history.push('/')
    }

    handleLogin =() => {
        this.setState({ isLoginModalIsOpen: true });
    }

    handleLogout =() => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined});
    }

    handleCreateAccount = () => {
        this.setState({isSignUpIsOpen: true });
    }

     responseGoogle = (response) => {
         this.setState({ loggedInUser: response.profileObj.name, isLoggedIn: true, isLoginModalIsOpen: false })
        console.log(response);
      }
      
      responseFacebook = (response) => {
        this.setState({ loggedInUser: response.name, isLoggedIn: true, isLoginModalIsOpen: false })
        console.log(response);
      }

      onChangeEmail = (e) => {
        this.setState({email: e.target.value})
      }

      onChangePassword = (e) => {
        this.setState({password: e.target.value})
      }

      onLogin =(e) => {
        const user ={
            email: this.state.email,
            password: this.state.password
       }
        axios({
            url: ` https://powerful-falls-44108.herokuapp.com/login`,
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: user
        })
        .then(res => console.log(res.data));
        this.props.history.push("/");  
    }

    email = (event) => {
        this.setState({ email: event.target.value })
       }
    password = (event) => {
        this.setState({ password: event.target.value })
        }
        firstname = (event) => {
        this.setState({ firstname: event.target.value })
        }
     lastname = (event) => {
        this.setState({ lastname: event.target.value })
        }

     Signup = (event) => {
         event.preventDefault()

         const userdetails = {
             email: this.state.email,
             password:this.state.password,
             firstname: this.state.firstname,
             lastname: this.state.lastname
         };

         axios({
            url: ' https://powerful-falls-44108.herokuapp.com/signup',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: userdetails
        })
      .then(res => console.log(res.data));
      alert(" user registered sucessfully ")
      
      this.setState({email: '', password: '', firstname: '', lastname: '' })
      this.props.history.push("/");  
        
      }

      handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
     
    render() {
        const{ isLoginModalIsOpen, isLoggedIn, loggedInUser, isSignUpIsOpen } = this.state;
        return (
            <div className="main_header">
                <div className="header-logo" onClick={this.handleNavigate}><b>e!</b> </div>
                { isLoggedIn?
                <div className="header-btn">
                    <div className="login-btn" onClick={ this.handleLogin }>{loggedInUser}</div>
                    <div className="signup" onClick={ this.handleLogout }>Logout</div>
                </div>:
                <div className="header-btn">
                <div className="login-btn" onClick={ this.handleLogin }>Login</div>
                <div className="signup" onClick={ this.handleCreateAccount }>Create Account</div>
                </div> }
                <Modal
                    isOpen={isLoginModalIsOpen}
                    style={customStyles}
                >
                    
                    <div style={{marginLeft: '25px', marginTop: '10px', marginBottom: '10px' }}>
                        <GoogleLogin
                            clientId="626976148550-nh0b7goffg3ru26i6ecrlj2v4v5h55b6.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div style={{marginLeft: '25px', padding: '5px'}}>
                    <FacebookLogin style={{marginLeft: '25px', backgroundColor: '#3b5998', color: 'white', padding: '5px' }}
                        appId="579069940215203"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="my-facebook-button-class" 
                        icon="fa-facebook"
                        />
                    </div>
                    <div> <h3> Login </h3> </div>
                    <div>
                        <div>
                            <label className="form-label">Email</label>
                            <input style={{ width: '250px' }} className="form-control" type="text" placeholder="Enter Your Email" onChange={this.onChangeEmail} />
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <input style={{ width: '250px' }} className="form-control" type="Password" placeholder="Enter Your Password" onChange={this.onChangePassword} />
                        </div>
                        <button className="btn btn-danger" style={{ marginTop: '7px',marginLeft: '80px' }} onClick={ this.onLogin }>Login</button>
                        
                    </div>
                </Modal>

                <Modal
                    isOpen={isSignUpIsOpen}
                    style={customStyles}
                >
                    <div>
                    <div style={{ float: 'right' }} className="fas fa-times" onClick={() => this.handleModal('isSignUpIsOpen', false)}></div>
                        <div>
                            <label className="form-label">Email</label>
                            <input style={{ width: '250px' }} className="form-control" type="text" placeholder="Enter Your Email" value={this.state.email} onChange={this.email} />
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <input style={{ width: '250px' }} className="form-control" type="Password" placeholder="Enter Your Password" value={this.state.password} onChange={this.password} />
                        </div>
                        <div>
                            <label className="form-label">FirstName</label>
                            <input style={{ width: '250px' }} className="form-control" type="text" placeholder="Enter Your Firstname" value={this.state.firstname} onChange={this.firstname} />
                        </div>
                        <div>
                            <label className="form-label">LastName</label>
                            <input style={{ width: '250px' }} className="form-control" type="text" placeholder="Enter Your Lastname" value={this.state.lastname} onChange={this.lastname} />
                        </div>
                        <button className="btn btn-danger" style={{ marginTop: '7px',marginLeft: '70px' }} onClick={ this.Signup }>Create Account</button>
                        
                    </div>
                </Modal>
            </div> 
        )
    }
}

export default withRouter(Header);
