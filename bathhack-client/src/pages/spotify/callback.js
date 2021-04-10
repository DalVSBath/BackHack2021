import React from "react";
import qs from "qs";
import { Redirect } from "react-router";

class Callback extends React.Component {
    constructor(props) {
        let itms = qs.parse(props.location.search);

        this.state = {
            redirect: null,
            code: itms.code,
        }
    }

    render() {
        if(this.state.redirect)
            return <Redirect to={"/selector"} />

        return (
            <div>Loading...</div>
        )
    }
}

export default Callback