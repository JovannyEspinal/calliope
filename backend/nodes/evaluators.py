from langchain_core.messages import SystemMessage, HumanMessage
from config import thresholds_config
from llms import evaluator_llm
from models import CopyWriter, EvaluatorResult, PlatformContent
from prompts import X_EVALUATOR_PROMPT, LINKEDIN_EVALUATOR_PROMPT, SUBSTACK_EVALUATOR_PROMPT

def evaluator(state: CopyWriter, platform_key: str, system_prompt: str):
  platform_content = state[platform_key]

  if platform_content.iteration >= thresholds_config["max_iterations"]:
    return {platform_key: platform_content}

  messages = [
      SystemMessage(content=system_prompt),
      HumanMessage(content=f"Content: {platform_content.content}")
  ]

  evaluator_result = evaluator_llm.with_structured_output(EvaluatorResult).invoke(messages)

  updated_platform_content = PlatformContent(
      content=platform_content.content,
      feedback=evaluator_result.feedback,
      score=evaluator_result.score,
      iteration=platform_content.iteration + 1
  )

  return {platform_key: updated_platform_content}

def x_evaluator_node(state: CopyWriter):
  return evaluator(state, "x_content", X_EVALUATOR_PROMPT)

def linkedin_evaluator_node(state: CopyWriter):
  return evaluator(state, "linkedin_content", LINKEDIN_EVALUATOR_PROMPT)

def substack_evaluator_node(state: CopyWriter):
  return evaluator(state, "substack_content", SUBSTACK_EVALUATOR_PROMPT)