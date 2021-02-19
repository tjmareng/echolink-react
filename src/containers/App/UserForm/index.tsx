import React from "react";
import { Field, reduxForm } from "redux-form";
import { Message, Button, Segment, FormTextArea, Form, Container } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from 'containers/App/actions';
import * as models from 'containers/App/models';
interface OwnProps {
    dispatch: any;
}

type StateProps = {
    values: {
        displayName: String;
        roomName: String;
    }
};

const mapStateToProps = (state: any) => {
    return state.form.user
        ? {
            values: state.form.user.values,
            submitSucceeded: state.form.user.submitSucceeded
        }
        : {
            values: {
                displayName: '',
                roomName: ''
            }
        };
};

type Props = OwnProps & StateProps;

export class UserForm extends React.Component<Props> {
    renderInput = (field: any) => (
        <Form.Input
            {...field.input}
            required
            label={field.label}
            placeholder={field.placeholder}
            rows={field.rows} />
    );

    renderSelect = (field: any) => (
        <Form.Select
            label={field.label}
            name={field.input.name}
            onChange={(e, { value }) => field.input.onChange(value)}
            options={field.options}
            placeholder={field.placeholder}
            value={field.input.value}
        />
    );

    renderTextArea = (field: any) => (
        <Form.TextArea
            {...field.input}
            required
            label={field.label}
            placeholder={field.placeholder}
            rows={field.rows} />
    );


    close = () => this.setState({ open: false });

    render() {
        const { dispatch } = this.props;

        let userInfo: models.User = {
            id: 1,
            username: '',
            room: ''
        }

        return (
            <Container>

                <Form size={"large"}>

                    <Field
                        component={this.renderInput}
                        label="Display Name"
                        name="displayName"
                        placeholder="Display Name (i.e. John)"
                        rows={1}
                    />
                    <Field
                        component={this.renderInput}
                        label="Room"
                        name="roomName"
                        placeholder="Room Name (i.e. Room)"
                        rows={1}
                    />

                    <button
                        onClick={() => {
                            if (this.props.values !== null && this.props.values !== undefined) {
                                let userInfo: models.User = {
                                    id: 1,
                                    username: this.props.values.displayName,
                                    room: this.props.values.roomName
                                }
                                dispatch(actions.addUser(userInfo))
                            }
                        }}
                    >Join</button>
                </Form>

                {/* Debug Tool -- Displays Form Data */}
                {/* <Message>
                    <Message.Header>Form:</Message.Header>
                    <pre>{JSON.stringify(this.props.values, null, 2)}</pre>
                </Message> */}
            </Container>
        );
    }
}

const withConnect = connect(mapStateToProps);

const withForm = reduxForm({
    form: "user"
});

const composed = compose(
    withForm,
    withConnect
)(UserForm);

export default composed as React.ComponentClass<OwnProps>;
