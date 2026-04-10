from typing import TypedDict
from pydantic import BaseModel

class ExtractionResult(BaseModel):
    topic: str
    tone: str

class ResearchResult(BaseModel):
    key_points: list[str]
    facts: list[str]
    sources: list[str]
    summary: str

class EvaluatorResult(BaseModel):
    score: int
    feedback: list[str]

class PlatformContent(BaseModel):
    content: str
    feedback: list[str]
    score: int
    iteration: int = 0

class CopyWriter(TypedDict):
    raw_input: str
    extraction_result: ExtractionResult
    research_result: ResearchResult
    x_content: PlatformContent
    linkedin_content: PlatformContent
    substack_content: PlatformContent

class GenerateRequest(BaseModel):
    raw_input: str
