from langchain_core.messages import SystemMessage, HumanMessage
from prompts import EXTRACTION_PROMPT
from models import CopyWriter, ExtractionResult
from llms import extraction_llm

def extraction_agent_node(state: CopyWriter):
  messages = [
      SystemMessage(content=EXTRACTION_PROMPT),
      HumanMessage(content=state["raw_input"])
  ]

  result = extraction_llm.with_structured_output(ExtractionResult).invoke(messages)

  return {
      "extraction_result": result
  }