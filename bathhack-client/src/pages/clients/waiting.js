import React from "react";
import { Redirect } from "react-router";
import { SocketContext } from "../../App";


class Waiting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
    }

    static contextType = SocketContext;

    componentDidMount() {
        this.context.rebindToViber();
        this.context.SetReadyCallBack(this.setRedirect.bind(this));
    }

    setRedirect = id => {
        this.setState({redirect: id});
    }

    componentWillUnmount() {
        this.context.SetReadyCallBack(null);
    }

    render() {
        if(this.state.redirect)
            return <Redirect to={"/viber?id=" + this.state.redirect} />

        return (
            <div className style={{"position":"absolute","right":"30px","top":"2vh"}}> 
                <h2>Waiting for the Creator</h2>
            </div>
        );
    }
}

export default Waiting;