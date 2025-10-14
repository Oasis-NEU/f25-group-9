import { useState,useEffect } from "react";
import "./AnalysisPage.css";


function AnalysisPage() {
 
        const [selectedDream, setSelectedDream] = useState(null);
        const [analysisText, setAnalysisText] = useState("");
        const [isAnalyzing, setIsAnalyzing] = useState(false);

        const pageStyle = {
            backgroundImage: "url('/background4.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            padding: '50px',
        };

        const DreamClick = (dream) => {
            setSelectedDream(dream);
            setAnalysisText("");
            setIsAnalyzing(true);

        };
    


    return (
        <>
        <div style={pageStyle}>
            <h1 style={{ fontFamily: 'DM Sans', fontSize: '100px', color:"#caa2be" }}>
                Dream Analyzer</h1>

            <p style={{fontFamily: 'DM Sans', fontSize: '30px', color:"#d4a6b0"}}>Let's decode your subconscious 🌙</p>

            <div className='clouds'>
                <div className="cloud" onClick={()=> DreamClick("dream name/description")}>
                    recent dream  🌑
                </div>
                <div className="cloud" onClick={()=> DreamClick("dream name/description")}>
                    recent dream  🌑
                </div>
                <div className="cloud" onClick={()=> DreamClick("dream name/description")}>
                    recent dream  🌑
                </div>
                
            </div>

        </div>
        </>
    )
}

export default AnalysisPage