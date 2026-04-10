import os
import yaml
from dotenv import load_dotenv

load_dotenv()

directory = os.path.dirname(__file__)
config_path = os.path.join(directory, "config.yaml")

with open(config_path) as f:
    config = yaml.safe_load(f)

models_config = config["models"]
temperatures_config = config["temperatures"]
thresholds_config = config["thresholds"]
research_config = config["research"]