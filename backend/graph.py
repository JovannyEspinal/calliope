from langgraph.checkpoint.memory import MemorySaver
from langgraph.constants import END
from langgraph.graph import StateGraph

from config import thresholds_config
from models import CopyWriter
from nodes.evaluators import x_evaluator_node, linkedin_evaluator_node, substack_evaluator_node
from nodes.extraction import extraction_agent_node
from nodes.research import research_agent_node
from nodes.writers import x_writer_node, linkedin_writer_node, substack_writer_node

# Routing logic
def should_continue_x(state: CopyWriter):
  c = state["x_content"]
  if c.score >= thresholds_config["score"] or c.iteration >= thresholds_config["max_iterations"]:
      return "end"
  return "x_writer_node"

def should_continue_linkedin(state: CopyWriter):
  c = state["linkedin_content"]
  if c.score >= thresholds_config["score"] or c.iteration >= thresholds_config["max_iterations"]:
    return "end"
  return "linkedin_writer_node"

def should_continue_substack(state: CopyWriter):
  c = state["substack_content"]
  if c.score >= thresholds_config["score"] or c.iteration >= thresholds_config["max_iterations"]:
    return "end"
  return "substack_writer_node"

workflow = StateGraph(CopyWriter)

# Pre-writer nodes
workflow.add_node("extraction_agent_node", extraction_agent_node)
workflow.add_node("research_agent_node", research_agent_node)

# Writer nodes
workflow.add_node("x_writer_node", x_writer_node)
workflow.add_node("linkedin_writer_node", linkedin_writer_node)
workflow.add_node("substack_writer_node", substack_writer_node)

# Evaluator nodes
workflow.add_node("x_evaluator_node", x_evaluator_node)
workflow.add_node("linkedin_evaluator_node", linkedin_evaluator_node)
workflow.add_node("substack_evaluator_node", substack_evaluator_node)

workflow.set_entry_point("extraction_agent_node")

# Edges
workflow.add_edge("extraction_agent_node", "research_agent_node")
workflow.add_edge("research_agent_node", "x_writer_node")
workflow.add_edge("research_agent_node", "linkedin_writer_node")
workflow.add_edge("research_agent_node", "substack_writer_node")
workflow.add_edge("x_writer_node", "x_evaluator_node")
workflow.add_edge("linkedin_writer_node", "linkedin_evaluator_node")
workflow.add_edge("substack_writer_node", "substack_evaluator_node")

# Conditional edges
workflow.add_conditional_edges("x_evaluator_node", should_continue_x, {
    "x_writer_node": "x_writer_node",
    "end": END
})

workflow.add_conditional_edges("linkedin_evaluator_node", should_continue_linkedin, {
    "linkedin_writer_node": "linkedin_writer_node",
    "end": END
})

workflow.add_conditional_edges("substack_evaluator_node", should_continue_substack, {
    "substack_writer_node": "substack_writer_node",
    "end": END
})

# Compile
memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)