"""
Event Management AI/ML Service
FastAPI-based microservice for machine learning features
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager
import logging
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import our modules (to be created)
from app.core.config import settings
from app.core.logging import setup_logging
from app.api.routes import recommendations, analytics, nlp
from app.services.recommendation_engine import RecommendationEngine
from app.services.event_analyzer import EventAnalyzer
from app.database.connection import init_db, close_db

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# Global instances
recommendation_engine: Optional[RecommendationEngine] = None
event_analyzer: Optional[EventAnalyzer] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("Starting AI Service...")
    
    # Initialize database connections
    await init_db()
    
    # Initialize ML models
    global recommendation_engine, event_analyzer
    recommendation_engine = RecommendationEngine()
    event_analyzer = EventAnalyzer()
    
    # Load/train initial models
    await recommendation_engine.initialize()
    await event_analyzer.initialize()
    
    logger.info("AI Service startup complete")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AI Service...")
    await close_db()
    logger.info("AI Service shutdown complete")


# Create FastAPI app
app = FastAPI(
    title="Event Management AI Service",
    description="Machine Learning and AI features for the Event Management Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ai-service",
        "version": "1.0.0"
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "message": "Event Management AI Service",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


# Model status endpoint
@app.get("/models/status")
async def models_status():
    """Get status of all ML models"""
    global recommendation_engine, event_analyzer
    
    return {
        "recommendation_engine": {
            "initialized": recommendation_engine is not None and recommendation_engine.is_ready(),
            "last_trained": recommendation_engine.last_trained if recommendation_engine else None,
            "model_version": recommendation_engine.model_version if recommendation_engine else None
        },
        "event_analyzer": {
            "initialized": event_analyzer is not None and event_analyzer.is_ready(),
            "last_updated": event_analyzer.last_updated if event_analyzer else None,
            "model_version": event_analyzer.model_version if event_analyzer else None
        }
    }


# Retrain models endpoint
@app.post("/models/retrain")
async def retrain_models(background_tasks: BackgroundTasks):
    """Trigger model retraining in the background"""
    global recommendation_engine, event_analyzer
    
    if not recommendation_engine or not event_analyzer:
        raise HTTPException(status_code=503, detail="Models not initialized")
    
    # Add retraining tasks to background
    background_tasks.add_task(recommendation_engine.retrain)
    background_tasks.add_task(event_analyzer.retrain)
    
    return {"message": "Model retraining started in background"}


# Include API routes
app.include_router(
    recommendations.router,
    prefix="/api/v1/recommendations",
    tags=["recommendations"]
)

app.include_router(
    analytics.router,
    prefix="/api/v1/analytics",
    tags=["analytics"]
)

app.include_router(
    nlp.router,
    prefix="/api/v1/nlp",
    tags=["natural-language-processing"]
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Global exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred"
        }
    )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENVIRONMENT") == "development",
        log_level="info"
    )
