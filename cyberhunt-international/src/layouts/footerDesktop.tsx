import ladrillosDesktop from "./../assets/desktop/Ladrillos-Desktop.png"




export default function Footer(){
return(
    <>
        <footer 
            className="w-full h-[100px] bg-repeat-x absolute bottom-0"
            style={{backgroundImage: `url(${ladrillosDesktop})`}}
    /> 
    </>);
}

