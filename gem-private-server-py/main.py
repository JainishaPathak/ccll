import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from typing import List
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0)

class CourseDetails(BaseModel):
    course_name: str = Field(..., description="The name of the course.")
    course_description: str = Field(..., description="Description of the course.")
    course_duration: str = Field(..., description="Duration of the course.")
    average_rating: float = Field(..., description="The average rating of the course (1-5).")
    popular_reviews: List[str] = Field(..., description="List of popular reviews for the course.")
    course_link: str = Field(..., description="The link to access the course.")
    instructor_name: str = Field(..., description="Name of the Instructor for the course.")

class Subject(BaseModel):
    subject: str = Field(..., description="The name of the subject.")
    details: CourseDetails = Field(..., description="Details of the recommended courses for the subject.")

class CourseRecommendation(BaseModel):
    recommendations: List[Subject] = Field(..., description="List of course recommendations for different subjects.")

parser = JsonOutputParser(pydantic_object=CourseRecommendation)

prompt = PromptTemplate(
    template="Answer the user query.\n{format_instructions}\n{query}\n",
    input_variables=["query", "budget", "duration"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

chain = prompt | llm | parser

@app.post("/private/api/gen/{subject}/budget/{budget}/duration/{duration}")
async def read_root(subject: str, budget: str, duration: str):
    print('request received')

    res = chain.invoke({"query": f"recommend best courses for the subject: {subject}, within a budget of {budget}, and duration of {duration}. Include the course link and the name of the instructors in the recommendations."})

    print(res)
    return JSONResponse(content=res, media_type="application/json")

if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using the ASGI server (uvicorn)
    uvicorn.run(app, host="127.0.0.1", port=9000, reload=True)