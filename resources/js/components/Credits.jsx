import React from "React";
import ReactDOM from "react-dom";
import Particles from "react-particles-js";

export default class Credits extends React.Component{
    constructor(props){
        super(props);

        this.creditsRefs = [
            ["Linkedin","https://www.linkedin.com/in/szymon-kupisz-0a8a91193/"],
            ["Github", "https://github.com/SKupisz/AgreementMaker"],
            ["Twitter", "https://twitter.com/granarax"],
            ["Made with PHPWord", "https://github.com/PHPOffice/PHPWord"]
        ];

    }
    render(){
        return <div className="credits-wrapper block-center">
            <Particles className = "particles-container" params = {{ 
                    particles: {
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                              enable: false,
                              speed: 100,
                              size_min: 0.1,
                              size_max: 1,
                              sync: false
                            }
                          },
                        number: {
                            value: 50,
                            density: {
                                enable: true,
                                value_area: 600
                            }
                        },
                        line_linked: {
                            color: "#16161d"
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape:{
                            type: "circle",
                            polygon: {
                                nb_sides: 3
                            }
                        }
                    }
                }}/>
            <div className="page-content">
                <div className="credits-menu block-center">
                    <a href="/" className="menu-elems">Main site</a>
                    <a href="/make-agreement" className="menu-elems">Agreement Maker</a>
                </div>
                <header className="credits-header block-center">Credits</header>
                <div className="desc block-center">Made by Simon G. Kupisz 2021</div>
                <div className="credits-refs-wrapper block-center">
                    {this.creditsRefs.map(elem => <a href = {elem[1]} target = "_blank" className="reference block-center"><span>
                        {elem[0]}: {elem[1]}
                    </span></a>)}
                </div>
            </div>
        </div>
    }
}

const divID= "credits-container";

if(document.getElementById(divID)){
    const props = Object.assign({},document.getElementById(divID).dataset);
    ReactDOM.render(<Credits {...props}/>,document.getElementById(divID));
}