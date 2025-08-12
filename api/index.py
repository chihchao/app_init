from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# 允許 CORS，方便本地與 Vercel 前端呼叫
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/hello")
async def say_hello(request: Request):
    data = await request.json()
    username = data.get("username", "")
    return JSONResponse({"message": f"hello {username}"})
