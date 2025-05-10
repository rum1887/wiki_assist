from typing import Union
import httpx
from fastapi import FastAPI, HTTPException
import certifi

app = FastAPI()
origins=["https://localhost:5173"]

WIKIPEDIA_API_URL="https://www.mediawiki.org/w/api.php"

WIKIPEDIA_API_URL_ENGLISH = "https://en.wikipedia.org/w/api.php"

@app.get("/search/")
async def search_wikipedia(query: str, limit: int = 5):
    """Search Wikipedia articles."""
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": query,
        "srlimit": limit
    }

    async with httpx.AsyncClient(verify=False) as client:
        response = await client.get(WIKIPEDIA_API_URL_ENGLISH, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Wikipedia API failed")
    
    return response.json()["query"]["search"] #"query"]["searchinfo"]
'''

response for "Hello"
{
  "batchcomplete": "",
  "continue": {
    "sroffset": 5,
    "continue": "-||"
  },
  "query": {
    "searchinfo": {
      "totalhits": 33677,
      "suggestion": "hell",
      "suggestionsnippet": "hell"
    },
    "search": [
      {
        "ns": 0,
        "title": "Hello",
        "pageid": 6710844,
        "size": 12687,
        "wordcount": 1307,
        "snippet": "<span class=\"searchmatch\">Hello</span> is a salutation or greeting in the English language. It is first attested in writing from 1826. <span class=\"searchmatch\">Hello</span>, with that spelling, was used in publications",
        "timestamp": "2025-01-11T02:31:50Z"
      },
      {
        "ns": 0,
        "title": "Hello Hello",
        "pageid": 42663426,
        "size": 1249,
        "wordcount": 213,
        "snippet": "<span class=\"searchmatch\">Hello</span> <span class=\"searchmatch\">Hello</span> may refer to: &quot;<span class=\"searchmatch\">Hello</span> <span class=\"searchmatch\">Hello</span>&quot; (song), a 2007 song by Superfly &quot;<span class=\"searchmatch\">Hello</span> <span class=\"searchmatch\">Hello</span>&quot;, a song by Caravan from the album If I Could Do It All Over Again",
        "timestamp": "2025-04-10T03:16:14Z"
      },
      {
        "ns": 0,
        "title": "Hello Kitty",
        "pageid": 54295,
        "size": 71214,
        "wordcount": 6880,
        "snippet": "<span class=\"searchmatch\">Hello</span> Kitty (Japanese: ハロー・キティ, Hepburn: Harō Kiti), also known by her real name Kitty White (キティ・ホワイト, Kiti Howaito), is a fictional character created",
        "timestamp": "2025-05-01T01:24:45Z"
      },
      {
        "ns": 0,
        "title": "\"Hello, World!\" program",
        "pageid": 13834,
        "size": 27713,
        "wordcount": 1942,
        "snippet": "&quot;<span class=\"searchmatch\">Hello</span>, World!&quot; program is usually a simple computer program that emits (or displays) to the screen (often the console) a message similar to &quot;<span class=\"searchmatch\">Hello</span>, World",
        "timestamp": "2025-05-06T14:15:02Z"
      },
      {
        "ns": 0,
        "title": "Hello World",
        "pageid": 37802793,
        "size": 1981,
        "wordcount": 258,
        "snippet": "Look up <span class=\"searchmatch\">Hello</span> World in Wiktionary, the free dictionary. <span class=\"searchmatch\">Hello</span> World may refer to: &quot;<span class=\"searchmatch\">Hello</span>, World!&quot; program, a computer program that outputs or displays",
        "timestamp": "2025-04-16T17:12:07Z"
      }
    ]
  }
}'''

@app.get("/opensearch/")
async def opensearch_wikipedia(query: str, limit: int = 5):
    """Fetch search suggestions from Wikipedia using OpenSearch API."""
    params = {
        "action": "opensearch",
        "format": "json",
        "search": query,
        "limit": limit
    }

    async with httpx.AsyncClient(verify=False) as client:
        response = await client.get(WIKIPEDIA_API_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Wikipedia OpenSearch API failed")
    
    return response.json()