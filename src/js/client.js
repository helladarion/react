import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
        constructor(){
            super();
            this.state = {
                title: "Welcome to React!",
            }
        }
        render() {
        return (<h1>{this.state.title}</h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);

