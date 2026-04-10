from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from graph import graph
from models import GenerateRequest
from openai import RateLimitError
import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
import time
import uuid

app = FastAPI()
executor = ThreadPoolExecutor()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def serialize(obj):
    if hasattr(obj, 'model_dump'):
        return obj.model_dump()
    return str(obj)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate")
async def generate(request: GenerateRequest):
    async def event_stream():
        thread_id = str(uuid.uuid4())
        config = {"configurable": {"thread_id": thread_id}}
        input_step = {"raw_input": request.raw_input}

        queue = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def run_graph():
            try:
                for attempt in range(3):
                    try:
                        for step in graph.stream(input_step, config):
                            loop.call_soon_threadsafe(queue.put_nowait, step)
                        return
                    except RateLimitError:
                        if attempt < 2:
                            wait = 60 * (attempt + 1)
                            print(f"Rate limited, retrying in {wait}s...")
                            time.sleep(wait)
                        else:
                            raise
            except Exception as e:
                loop.call_soon_threadsafe(queue.put_nowait, e)
            finally:
                loop.call_soon_threadsafe(queue.put_nowait, None)

        loop.run_in_executor(executor, run_graph)

        while True:
            step = await queue.get()
            if step is None:
                break
            if isinstance(step, Exception):
                raise step
            for node_name, node_data in step.items():
                print(f"Node completed: {node_name}")
                data = json.dumps(node_data, default=serialize)
                yield {"event": node_name, "data": data}

    return EventSourceResponse(event_stream())
