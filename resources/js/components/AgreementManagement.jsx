import React from "react";
import ReactDOM from "react-dom";

export default class AgreementManagement extends React.Component{
    constructor(props){
        super(props);

        this.mainPartRef = React.createRef();

        this.state = {
            elementsList: [],
            currentParagraphNumber: 1,
            displayList: [],
            signaturesDisplayList: []
        };

        this.AddNewParagraph = this.AddNewParagraph.bind(this);
        this.deleteTheParagraph = this.deleteTheParagraph.bind(this);
        this.changeTheParagraph = this.changeTheParagraph.bind(this);

        this.addSignature = this.addSignature.bind(this);

        this.putOnDisplay = this.putOnDisplay.bind(this);
    }
    AddNewParagraph(){
        let operand = this.state.elementsList,
        parNumber = this.state.currentParagraphNumber;
        operand.push(
            [parNumber,""]
        );
        this.setState({
            elementsList: operand,
            currentParagraphNumber: this.state.currentParagraphNumber+1
        }, () => {this.putOnDisplay();});
    }
    deleteTheParagraph(parNumber){
        let operand = this.state.elementsList;
        operand = operand.filter(elem => {
            return elem[0] !== parNumber;    
        });
        for(let i = 1 ; i <= operand.length; i++ ){
            operand[i-1][0] = i;
        }
        console.log(operand);
        this.setState({
            elementsList: operand,
            currentParagraphNumber: this.state.currentParagraphNumber-1
        }, () => {this.putOnDisplay();});
    }
    changeTheParagraph(event,parNumber){
        let operand = this.state.elementsList;
        operand[parNumber-1][1] = event.target.value;
        this.setState({
            elementsList: operand
        }, () => {});
    }
    addSignature(){

    }
    putOnDisplay(){
        let arrayOfPoints = this.state.elementsList.map(elem => {
            return <div className="agreement-elem">
                <label htmlFor="" className="point-label">§{elem[0]}</label><textarea onChange = {(event) => {this.changeTheParagraph(event,elem[0])}} required name={`paragraph${elem[0]}`} id="" className="point-content">{elem[1]}</textarea>
                <button type = "button" className="delete-button" onClick = {() => {this.deleteTheParagraph(elem[0])}}>❌</button>
            </div>;
        });
        this.setState({
            displayList: null
        }, () => {
            this.setState({
                displayList: arrayOfPoints
            }, () => {});
        });
    }
    componentDidMount(){
        this.putOnDisplay();
    }
    render(){
        return(
            <div className="agreement-content">
                <div className="main-menu-container block-center">
                    <button type = "button" className="menu-btn" onClick = {() => this.AddNewParagraph()}>Add paragraph</button>
                    <button type="button" className="menu-btn">Add signature</button>
                </div>
                <div className="agreement-points" ref = {this.mainPartRef}>
                    {this.state.displayList}
                </div>
                <div className="agreements-signatures">
                    {this.state.signaturesDisplayList}
                </div>
            </div>
        );
    }
}

if(document.getElementById("agreement-management-wrapper")){
    const props = Object.assign({},document.getElementById("agreement-management-wrapper").dataset);
    ReactDOM.render(<AgreementManagement {...props}/>,document.getElementById("agreement-management-wrapper"));
}