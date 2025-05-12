

import google.generativeai as genai
from langchain.llms import GoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List

from config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

class TagService:
    @staticmethod
    async def generate_tags(title: str, summary: str) -> List[str]:        
        llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=settings.GEMINI_API_KEY)
        
        prompt_template = PromptTemplate(
            input_variables=["title", "summary"],
            template="""
            Generate 3-5 relevant tags for the following article based on the meme potential of the article.
            Return only the tags as a comma-separated list with no additional text.
            
            Title: {title}
            Summary: {summary}
            
            Tags:
            """
        )
        
        chain = LLMChain(llm=llm, prompt=prompt_template)
        
        response = await chain.arun(title=title, summary=summary)
        
        tags = [tag.strip() for tag in response.split(',') if tag.strip()]
        
        return tags
    