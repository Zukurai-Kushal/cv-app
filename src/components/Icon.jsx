import { ReactSVG } from "react-svg";

export default function Icon({ src, alt, style, type }) {
    switch (type) {
        case "svg":
            return <ReactSVG src={src} style={style} title={alt} className="icon"/>
            break;
        default:
            return <img src={src} alt={alt} width="30" className="icon" style={style}/>
    }
}