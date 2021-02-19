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
import { Segment, Header, Form } from "semantic-ui-react";
import '../../styles/App.css';
import '../../styles/index.css';

interface OwnProps { }

type DispatchProps = {
    dispatch: Dispatch<any>;
};

type StateProps = {
    messages: String;
};

type Props = OwnProps;

export function mapStateToProps(state: models.AppState): StateProps {
    return {
        messages: selectors.selectMessages(state)
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        dispatch
    };
}

export class Chat extends React.Component<Props> {

    componentWillMount() { }

    render() {
        //const { dispatch } = this.props;

        return (
            <div className="chat">
                <div id="sidebar" className="chat__sidebar">
                    {/* <div id="cassy" className="cassybot">
                        <img className="img-valign" id="title_pic" src="./img/favicon.png" width={120} height={120} />
                    </div> */}
                </div>
                <div className="chat__main">
                    <div id="messages" className="chat__messages" />
                    <div className="compose">
                        <form id="message-form">
                            <input name="message" placeholder="Message" required autoComplete="off" />
                            <button>Send</button>
                        </form>
                        <button id="send-location">Send location</button>
                    </div>
                </div>
            </div>


        )
    }

}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default Chat;