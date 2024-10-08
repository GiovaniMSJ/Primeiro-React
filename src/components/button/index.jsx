import { Component } from "react";
import './styles.css'

export class Button extends Component {
    render() {
        const { text , onClick , disable } = this.props

        return (
        <button disabled={disable} className="buttons" onClick={onClick}>{text}</button>
    )
    }
}