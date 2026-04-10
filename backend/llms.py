from langchain_openai import  ChatOpenAI
from config import models_config, temperatures_config

extraction_llm = ChatOpenAI(model=models_config["extraction"], temperature=temperatures_config["extraction"])
research_llm = ChatOpenAI(model=models_config["research"], temperature=temperatures_config["research"])
writer_llm = ChatOpenAI(model=models_config["writer"], temperature=temperatures_config["writer"])
evaluator_llm = ChatOpenAI(model=models_config["evaluator"], temperature=temperatures_config["evaluator"])