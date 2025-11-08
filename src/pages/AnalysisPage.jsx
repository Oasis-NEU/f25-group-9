import { useState,useEffect, useRef} from "react";
import { supabase } from "../../supabase.js";
import "./AnalysisPage.css";


function AnalysisPage() {
        const [dreams, setDreams] = useState([]);
        const [selectedDream, setSelectedDream] = useState(null);
        const [analysisText, setAnalysisText] = useState("");
        const [isAnalyzing, setIsAnalyzing] = useState(false);

        const analysisRef = useRef(null);

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

    useEffect(() => {
    if (analysisText && analysisRef.current) {
      analysisRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        });
      }
    }, [analysisText]);

    useEffect(() => {
      if (isAnalyzing && analysisRef.current) {
        analysisRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [isAnalyzing]);


    const DreamClick = async (dream) => {
      setSelectedDream(dream);
      setAnalysisText("");
      setIsAnalyzing(true);

      try {
        const { data, error } = await supabase.functions.invoke(
          "dreamAnalysis",
          {
            body: {
              dream_id: dream.id,
              content: dream.title, 
            },
          }
        );

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
        <div ref={analysisRef}></div>

        {isAnalyzing && (
          <p style={{ color: "#fff", fontSize: "24px" }}>
            Analyzing your dream... 🌙
          </p>
        )}

        {analysisText && (
          <div
            ref={analysisRef}
            style={{
              background: "rgba(146, 205, 231, 0.87)",
              color: "#ffffff",
              borderRadius: "25px",
              padding: "40px",
              marginTop: "50px",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              lineHeight: "1.8",
              fontSize: "20px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.35)"
            }}
          >
            <h2 style={{
              fontSize: "32px",
              marginBottom: "20px",
              fontWeight: "bold",
              color: "#f7d7e2"
            }}>
              Dream Analysis
            </h2>

            <p style={{ whiteSpace: "pre-line" }}>{analysisText}</p>
          </div>
        )}

      </div>
    </>
  );
}

export default AnalysisPage;