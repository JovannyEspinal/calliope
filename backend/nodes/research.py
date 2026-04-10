from langchain_core.messages import SystemMessage, HumanMessage
from langchain_tavily import TavilySearch
from config import research_config
from prompts import RESEARCH_PROMPT
from models import CopyWriter, ResearchResult
from llms import research_llm

internet_search = TavilySearch(
    max_results=research_config["max_results"],
    search_depth=research_config["search_depth"],
    topic="general",
    include_images=False,
    include_image_descriptions=False,
)

def research_agent_node(state: CopyWriter):
    topic = state["extraction_result"].topic
    tone = state["extraction_result"].tone

    search_results = internet_search.invoke(topic)

    messages = [
        SystemMessage(content=RESEARCH_PROMPT),
        HumanMessage(content=f"Topic: {topic}\nTone: {tone}\n\nSearch results:\n{search_results}")
    ]

    research_result = research_llm.with_structured_output(ResearchResult).invoke(messages)

    return {
        "research_result": research_result
    }
