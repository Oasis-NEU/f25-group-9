import { useState,useEffect } from "react";
import { supabase } from "../supabase.js";
import "./AnalysisPage.css";


function AnalysisPage() {
        const [dreams, setDreams] = useState([]);
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


    useEffect(() => {
        const fetchDreams = async () => {
        const { data, error } = await supabase
            .from("posts") 
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching dreams:", error);
        } else {
            setDreams(data);
        }
        };

        fetchDreams();
    }, []);


        const DreamClick = async(dream) => {
            setSelectedDream(dream);
            setAnalysisText("");
            setIsAnalyzing(true);

        };

        try {
            const { data, error } = await supabase.functions.invoke("dreamAnalysis", {
            body: { dream_id: dream.id, content: dream.title },
            });

            if (error) throw error;

            setAnalysisText(data.analysis);

            await supabase.from("dream_analysis").insert({
                dream_id: dream.id,
                analysis: data.analysis,
                });
            } catch (err) {
                console.error("Error:", err);
                setAnalysisText("Something went wrong while analyzing your dream.");
            }

            setIsAnalyzing(false);
            };            


    return (
    <>
      <div style={pageStyle}>
        <h1
          style={{ fontFamily: "DM Sans", fontSize: "100px", color: "#caa2be" }}
        >
          Dream Analyzer
        </h1>

        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "30px",
            color: "#d4a6b0",
          }}
        >
          Let's decode your subconscious 🌙
        </p>

        <div className="clouds">
          {dreams.length > 0 ? (
            dreams.map((dream) => (
              <div
                key={dream.id}
                className="cloud"
                onClick={() => DreamClick(dream)}
              >
                {dream.title} 🌑
              </div>
            ))
          ) : (
            <p style={{ color: "#fff" }}>No dreams found.</p>
          )}
        </div>

        {isAnalyzing && (
          <p style={{ color: "#fff", fontSize: "24px" }}>
            Analyzing your dream... 🌙
          </p>
        )}

        {analysisText && (
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "20px",
              padding: "20px",
              marginTop: "30px",
              maxWidth: "600px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2>Dream Analysis</h2>
            <p>{analysisText}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AnalysisPage;