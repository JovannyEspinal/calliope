from langchain_core.messages import SystemMessage, HumanMessage
from llms import writer_llm
from models import PlatformContent, CopyWriter
from prompts import X_WRITER_PROMPT, LINKEDIN_WRITER_PROMPT, SUBSTACK_WRITER_PROMPT

def writer_node(state: CopyWriter, platform_key: str, system_prompt: str):
  research_result = state["research_result"]
  platform_content = state.get(platform_key)

  messages = [SystemMessage(content=system_prompt)]

  research_result_message = HumanMessage(content=
        f"""
        Key Points: {research_result.key_points}
        Facts: {research_result.facts}
        Summary: {research_result.summary}
        Sources: {research_result.sources}
        """
        )

  messages.append(research_result_message)

  if platform_content:
    messages.append(HumanMessage(content="\n".join(platform_content.feedback)))

  result = writer_llm.with_structured_output(PlatformContent).invoke(messages)

  return {
      platform_key: result
  }

def x_writer_node(state: CopyWriter):
  return writer_node(state, "x_content", X_WRITER_PROMPT)

def linkedin_writer_node(state: CopyWriter):
  return writer_node(state, "linkedin_content", LINKEDIN_WRITER_PROMPT)

def substack_writer_node(state: CopyWriter):
  return writer_node(state, "substack_content", SUBSTACK_WRITER_PROMPT)