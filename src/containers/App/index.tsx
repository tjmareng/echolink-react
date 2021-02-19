import React from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";
import * as actions from "./actions";
import * as models from "./models";
import logo from '../../images/logo.svg';
import { Segment, Header, Form, Divider, Container, Label, FormField, Image, Icon } from "semantic-ui-react";
import { Redirect } from "react-router";
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import UserForm from "./UserForm";

interface OwnProps { };

type DispatchProps = {
    dispatch: Dispatch<any>;
};

type StateProps = {
    //messages: String;
};

type Props = OwnProps & DispatchProps;

export function mapStateToProps(state: models.AppState): StateProps {
    return {
        //messages: selectors.selectMessages(state)
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        dispatch
    };
}

export class App extends React.Component<Props> {
    state = {
        redirect: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/echolink/src/containers/Chat' />
        }
    }

    renderTextArea = (field: any) => (
        <Form.TextArea {...field.input} required label={field.label} placeholder={field.placeholder} rows={field.rows} />
    );

    componentWillMount() { }

    render() {
        const { dispatch } = this.props;

        return (
            <div>
                <div>
                    <div className="centered-form">
                        <div className="centered-form__box">
                            <h1>Join Chat <Icon name="chat" /></h1>
                            <UserForm dispatch={dispatch} />
                        </div>
                    </div>

                </div>

                {/* <div className="centered-form">
                    <div className="centered-form__box">
                        <h1>Join Chat</h1>
                        <form action="../Chat">
                            <label>Display Name</label>
                            <input type="text" name="username" placeholder="Display Name" required />
                            <label>Room</label>
                            <input type="text" name="room" placeholder="Room Name" required />
                            <button
                            //  onClick={()=>{
                            //     dispatch(actions.addUser())
                            // }}
                            >Join</button>
                            <Link to='/Chat'>Goto Page One</Link>
                        </form>
                    </div>
                </div> */}
            </div>

        )
    }

}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default (withConnect)(App);