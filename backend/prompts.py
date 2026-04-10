import os

directory_path = os.path.dirname(__file__)
prompts_path = os.path.join(directory_path, "prompts")

def _load(name: str) -> str:
    name_path = os.path.join(prompts_path, name)
    with open(name_path) as f:
        return f.read()

EXTRACTION_PROMPT = _load("extraction.txt")
RESEARCH_PROMPT = _load("research.txt")
HUMANIZER_RULES = _load("humanizer.txt")

X_WRITER_PROMPT = _load("x_writer.txt").format(humanizer_rules=HUMANIZER_RULES)
LINKEDIN_WRITER_PROMPT = _load("linkedin_writer.txt").format(humanizer_rules=HUMANIZER_RULES)
SUBSTACK_WRITER_PROMPT = _load("substack_writer.txt").format(humanizer_rules=HUMANIZER_RULES)

X_EVALUATOR_PROMPT = _load("x_evaluator.txt")
LINKEDIN_EVALUATOR_PROMPT = _load("linkedin_evaluator.txt")
SUBSTACK_EVALUATOR_PROMPT = _load("substack_evaluator.txt")
