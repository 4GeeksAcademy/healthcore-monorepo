import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
import asyncpg


DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://mvp_user:mvp_pass@db:5432/mvp_db",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown hooks."""
    app.state.db_pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=2)
    yield
    await app.state.db_pool.close()


app = FastAPI(title="MVP Backend", lifespan=lifespan)


@app.get("/status")
async def get_status():
    """Return JSON with API and database connectivity status."""
    db_status = "disconnected"
    try:
        async with app.state.db_pool.acquire() as conn:
            val = await conn.fetchval("SELECT 1")
            if val == 1:
                db_status = "connected"
    except Exception:
        db_status = "disconnected"

    return {"status": "ok", "database": db_status}