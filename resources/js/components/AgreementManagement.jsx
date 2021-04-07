import React from "react";
import ReactDOM from "react-dom";

export default class AgreementManagement extends React.Component{
    constructor(props){
        super(props);

        this.mainPartRef = React.createRef();
        this.downloadWayRef = React.createRef();
        this.docxRef = React.createRef();
        this.htmlRef = React.createRef();
        this.pdfRef = React.createRef();

        this.state = {
            elementsList: [],
            currentParagraphNumber: 1,
            displayList: [],
            signaturesList: [],
            signaturesDisplayList: [],
            currentSignaturesNumber: 1
        };

        this.AddNewParagraph = this.AddNewParagraph.bind(this);
        this.deleteTheParagraph = this.deleteTheParagraph.bind(this);
        this.changeTheParagraph = this.changeTheParagraph.bind(this);

        this.addSignature = this.addSignature.bind(this);
        this.changeTheSignature = this.changeTheSignature.bind(this);
        this.deleteTheSignature = this.deleteTheSignature.bind(this);

        this.changeTheDownloadWay = this.changeTheDownloadWay.bind(this);
        this.changeTheChosenBtn = this.changeTheChosenBtn.bind(this);

        this.putOnDisplay = this.putOnDisplay.bind(this);
        this.displaySignatures = this.displaySignatures.bind(this);
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
        if(this.state.currentSignaturesNumber <= 1){
            let operand = this.state.signaturesList;
            operand.push([this.state.currentSignaturesNumber,""]);
            this.setState({
                signaturesList: operand,
                currentSignaturesNumber: this.state.currentSignaturesNumber+1
            }, () => {this.displaySignatures();});
        }
    }
    changeTheSignature(event, signNumber){
        let operand = this.state.signaturesList;
        operand[signNumber-1][1] = event.target.value;
        this.setState({
            signaturesList: operand
        }, () => {});
    }
    deleteTheSignature(signNumber){
        let operand = this.state.signaturesList;
        operand = operand.filter(elem => {
            return elem[0] !== signNumber;
        });
        for(let i = 1; i <= operand.length; i++){
            operand[i-1][0] = i;
        }
        this.setState({
            signaturesList: operand,
            currentSignaturesNumber: this.state.currentSignaturesNumber-1
        }, () => {this.displaySignatures();});
    }
    
    putOnDisplay(){
        let arrayOfPoints = this.state.elementsList.map(elem => {
            return <div className="agreement-elem">
                <label htmlFor="" className="point-label">§{elem[0]}</label><textarea onChange = {(event) => {this.changeTheParagraph(event,elem[0]);}} required name={`paragraph${elem[0]}`} id="" className="point-content">{elem[1]}</textarea>
                <button type = "button" className="delete-button" onClick = {() => {this.deleteTheParagraph(elem[0]);}}>❌</button>
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
    displaySignatures(){
        let arrayOfSignatures = this.state.signaturesList.map(elem => {
            return <div className="agreement-sign-wrapper block-center">
                <input type="text" name={"signature"+elem[0]} id="" className="agreement-sign" required="required" placeholder={`Signatory nr ${elem[0]}'s name`} defaultValue = {elem[1]} onChange = {() => {this.changeTheSignature(event,elem[0]);}}/>
                <button type="button" className="delete-signature-btn delete-button" onClick = {() => {this.deleteTheSignature(elem[0]);}}>❌</button>
            </div>;
        });
        this.setState({
            signaturesDisplayList: null
        }, () => {
            this.setState({
                signaturesDisplayList: arrayOfSignatures
            }, () => {});
        });
    }
    changeTheChosenBtn(newlyChosen,notChosen1,notChosen2){
        notChosen1.current.classList.remove("chosen-btn");
        notChosen2.current.classList.remove("chosen-btn");
        newlyChosen.current.classList.add("chosen-btn");
    }
    changeTheDownloadWay(event){
        let btnValue = event.target.value;
        btnValue = btnValue.toLowerCase();
        this.downloadWayRef.current.value = btnValue;
        if(btnValue.toLowerCase() === "docx"){
            this.changeTheChosenBtn(this.docxRef,this.htmlRef,this.pdfRef);
        }
        else if(btnValue.toLowerCase() === "html"){
            this.changeTheChosenBtn(this.htmlRef,this.docxRef,this.pdfRef);
        }
        else if(btnValue.toLowerCase() === "pdf"){
            this.changeTheChosenBtn(this.pdfRef,this.htmlRef,this.docxRef);
        }
    }
    componentDidMount(){
        this.putOnDisplay();
        this.displaySignatures();
    }
    render(){
        return(
            <div className="agreement-content">
                <div className="main-menu-container block-center">
                    <button type = "button" className="menu-btn" onClick = {() => {this.AddNewParagraph();}}>Add a paragraph</button>
                    <button type="button" className="menu-btn" onClick = {() => {this.addSignature();}}>Add a signature</button>
                </div>
                <div className="agreement-points" ref = {this.mainPartRef}>
                    {this.state.displayList}
                </div>
                <div className="agreements-signatures">                    
                    {this.state.signaturesDisplayList}
                </div>
                <div className="agreement-way-of-export">
                    <header className="way-header block-center">Download as</header>
                    <button type="button" className="agreement-way-btn" onClick = {() => {this.changeTheDownloadWay(event);}} ref = {this.docxRef} value = "Docx">Docx</button>
                    <button type="button" className="agreement-way-btn" onClick = {() => {this.changeTheDownloadWay(event);}} ref = {this.htmlRef} value = "HTML">HTML</button>
                    <button type="button" className="agreement-way-btn chosen-btn" onClick = {() => {this.changeTheDownloadWay(event);}} ref = {this.pdfRef} value = "PDF">PDF</button>
                    <input type="hidden" name="wayOfDownload" ref = {this.downloadWayRef} defaultValue="PDF"/>
                </div>
            </div>
        );
    }
}

if(document.getElementById("agreement-management-wrapper")){
    const props = Object.assign({},document.getElementById("agreement-management-wrapper").dataset);
    ReactDOM.render(<AgreementManagement {...props}/>,document.getElementById("agreement-management-wrapper"));
}