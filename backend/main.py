import os
import json
import asyncio
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Configure Groq
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key or groq_api_key == "your_groq_api_key_here":
    print("⚠️  Warning: GROQ_API_KEY not configured. Get one at https://console.groq.com")

client = Groq(api_key=groq_api_key)

PRIMARY_MODEL = "llama-3.3-70b-versatile"
FALLBACK_MODEL = "llama-3.1-8b-instant"

app = FastAPI(title="AI Co-Founder API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request Models ──────────────────────────────────────────────

class ProblemRequest(BaseModel):
    problem: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_message: str

class PivotRequest(BaseModel):
    startup_context: str
    scenario: str

# ── Groq Helper ─────────────────────────────────────────────────

def call_groq(system_prompt: str, user_prompt: str, model: str = PRIMARY_MODEL) -> dict:
    """Call Groq API and parse JSON response. Falls back to smaller model on failure."""
    try:
        # Groq's JSON mode requires the word 'json' to be in the prompt.
        full_user_prompt = f"{user_prompt}\n\nRespond strictly in JSON format."
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": full_user_prompt}
            ],
            temperature=0.7,
            max_tokens=4096,
            response_format={"type": "json_object"}
        )
        text = response.choices[0].message.content.strip()
        print(f"DEBUG: Raw Groq Response: {text[:100]}...") # Log first 100 chars
        # Clean markdown wrappers if present
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text)
    except Exception as e:
        print(f"❌ Groq API Error ({model}): {str(e)}")
        if model == PRIMARY_MODEL:
            print(f"⚠️ Falling back to {FALLBACK_MODEL}...")
            return call_groq(system_prompt, user_prompt, model=FALLBACK_MODEL)
        raise

# ── Health ──────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "model": PRIMARY_MODEL}

# ── 1. PROBLEM ENDPOINT ────────────────────────────────────────

@app.post("/api/problem")
async def analyze_problem(request: ProblemRequest):
    system = """You are an AI startup analyst specialized in Indian markets. 
Return ONLY valid JSON with this exact structure:
{
  "refined_problem": "Clear 1-2 sentence problem statement",
  "target": "Target user segment",
  "pain": "Core pain point",
  "gap": "Market gap identified",
  "demand_score": 85,
  "competition_level": "Low" | "Medium" | "High",
  "competition_sub": "Brief explanation",
  "problem_depth": "Low" | "Medium" | "High",
  "problem_depth_sub": "Brief explanation",
  "timing_label": "Perfect Timing" | "Too Early" | "Right on Time",
  "timing_explanation": "Why this timing assessment",
  "confidence_score": 88
}
All number values must be integers. Be data-driven and concise."""

    prompt = f"Analyze this startup problem for the Indian market: {request.problem}"
    
    try:
        result = call_groq(system, prompt)
        return result
    except Exception as e:
        print(f"Error in /api/problem: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ── 2. VALIDATION ENDPOINT ─────────────────────────────────────

@app.post("/api/validation")
async def analyze_validation(request: ProblemRequest):
    system = """You are an AI startup analyst. Return ONLY valid JSON:
{
  "global_competitors": [
    {"name": "string", "country": "string", "description": "string", "highlight": "string"}
  ],
  "india_pricing": "₹X/mo",
  "india_pricing_global": "$X/mo",
  "india_discount": "30%",
  "india_free_tier": "Freemium",
  "india_features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "india_user_behavior": "Key behavioral insight about Indian users",
  "regulations": [
    {"quarter": "Q1 2025", "name": "Regulation name", "description": "Brief desc", "opportunity": "High" | "Medium"}
  ]
}
Return 3 global competitors and 3-4 regulations. Be specific and data-driven."""

    prompt = f"Provide validation and market adaptation analysis for this startup problem in India: {request.problem}"
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── 3. MARKET ENDPOINT ─────────────────────────────────────────

@app.post("/api/market")
async def analyze_market(request: ProblemRequest):
    system = """You are an AI startup analyst. Return ONLY valid JSON:
{
  "global_competitors": [
    {"name": "string", "country": "string", "description": "string", "highlight": "string"}
  ],
  "competition_analysis": [
    {"name": "string", "tier": "High" | "Medium" | "Low", "strength": 70, "gaps": 30}
  ],
  "india_pricing": "₹X/mo",
  "india_pricing_global": "$X/mo",
  "india_features": ["Feature 1", "Feature 2"],
  "india_user_behavior": "Key insight"
}
Return 3-5 competitors with realistic strength/gap percentages (they should sum to ~100)."""

    prompt = f"Provide competitive market analysis for this startup problem: {request.problem}"
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── 4. IDEAS ENDPOINT ──────────────────────────────────────────

@app.post("/api/ideas")
async def generate_ideas(request: ProblemRequest):
    system = """You are an AI startup strategist. Return ONLY valid JSON:
{
  "ideas": [
    {
      "approach": "Safe",
      "name": "Startup name",
      "description": "2-3 sentence description",
      "tags": ["tag1", "tag2", "tag3"],
      "target_users": [
        {"type": "User segment", "priority": "Primary" | "Secondary", "pain": "Their pain point"}
      ],
      "mvp_features": [
        {"name": "Feature name", "priority": "Must Have" | "Nice to Have" | "Later"}
      ],
      "monetization": ["Revenue model 1", "Revenue model 2"],
      "tech_stack": ["Tech 1", "Tech 2", "Tech 3"]
    }
  ]
}
Return exactly 3 ideas: one Safe, one Innovative, one Disruptive. 
Each idea should have 2-3 target_users, 4-5 mvp_features, 2-3 monetization strategies, and 3-5 tech stack items."""

    prompt = f"Generate 3 startup ideas (Safe, Innovative, Disruptive) for this problem: {request.problem}"
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── 5. TEST ENDPOINT ───────────────────────────────────────────

@app.post("/api/test")
async def test_simulation(request: ProblemRequest):
    system = """You are an AI startup stress-tester. Return ONLY valid JSON:
{
  "user_like_pct": 65,
  "user_drop_pct": 20,
  "user_confused_pct": 15,
  "user_like_reason": "Why users would adopt this",
  "user_drop_reason": "Why users would leave",
  "user_confused_reason": "What confuses users",
  "survival_rate": 72,
  "survival_label": "Moderate Risk",
  "survival_by_year": [80, 70, 60, 55, 50],
  "failure_reasons": [
    {"reason": "Failure reason", "pct": 40}
  ],
  "strengths": ["Strength 1", "Strength 2"],
  "risks": ["Risk 1", "Risk 2"],
  "vc_question": "Tough question a VC would ask",
  "user_question": "Tough question a user would ask",
  "bigtech_question": "Tough question about big tech competition",
  "pivot_scenarios": [
    {"name": "Pivot name", "description": "Brief description", "survival_impact": 10}
  ],
  "key_insights": ["Insight 1", "Insight 2"]
}
Percentages for user_like/drop/confused MUST sum to 100. survival_by_year is 5 values (Year 1-5).
Return 3-4 failure_reasons (pcts sum to 100), 2-3 pivot_scenarios. Be realistic."""

    prompt = f"Run stress test and user simulation for this startup: {request.problem}"
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── 6. LAUNCH ENDPOINT ─────────────────────────────────────────

@app.post("/api/launch")
async def launch_plan(request: ProblemRequest):
    system = """You are an AI startup launch strategist. Return ONLY valid JSON:
{
  "headline": "Compelling hero headline",
  "subheadline": "Supporting sub-headline",
  "cta": "Primary button text",
  "features": [
    {"title": "Feature 1", "description": "Short explanation"}
  ],
  "pricing": [
    {"plan": "Starter", "price": "₹0", "features": ["Feature A", "Feature B"]},
    {"plan": "Pro", "price": "₹999/mo", "features": ["All Starter", "Feature C"]}
  ],
  "monthly_users": [100, 500, 1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000],
  "monthly_revenue": [0, 0, 500, 1500, 5000, 12000, 25000, 50000, 100000, 200000, 350000, 500000],
  "projected_users_y1": 40000,
  "projected_revenue_y1": "₹5,00,000",
  "gtm_channels": [
    {"name": "Channel name", "description": "Strategy"}
  ]
}
Return 3 features, 2 pricing plans, 12 monthly data points, and 3 gtm_channels. 
Ensure the landing page content is extremely catchy and focuses on the unique value prop."""

    prompt = f"Create a launch plan and landing page content for this startup: {request.problem}"
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── CHAT ENDPOINT (Streaming) ──────────────────────────────────

@app.post("/api/chat")
async def chat(request: ChatRequest):
    messages = [
        {"role": "system", "content": "You are an AI Co-Founder assistant. Be concise, data-driven, focused on Indian startup markets. Keep responses under 3 sentences unless asked for detail."}
    ]
    for msg in request.messages:
        messages.append({"role": msg.role if msg.role == "user" else "assistant", "content": msg.content})
    messages.append({"role": "user", "content": request.user_message})
    
    async def generate():
        try:
            stream = client.chat.completions.create(
                model=PRIMARY_MODEL,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                stream=True
            )
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
        except Exception as e:
            yield f"Error: {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")

# ── PIVOT SIMULATOR ─────────────────────────────────────────────

@app.post("/api/simulate-pivot")
async def simulate_pivot(request: PivotRequest):
    system = """Return ONLY valid JSON:
{
  "survival_impact": 10,
  "analysis": "Brief analysis of this pivot",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}
survival_impact is a number from -30 to +30."""

    prompt = f"Context: {request.startup_context}\nPivot scenario: {request.scenario}\nAnalyze the impact of this pivot."
    
    try:
        return call_groq(system, prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Legacy endpoint (backwards compat) ──────────────────────────

@app.post("/api/analyze")
async def analyze_legacy(request: ProblemRequest):
    """Legacy endpoint - redirects to problem endpoint for backwards compatibility."""
    return await analyze_problem(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
