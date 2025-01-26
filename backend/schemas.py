from pydantic import BaseModel
from typing import List, Optional

class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    estimate: Optional[float] = None
    priority: Optional[int] = None
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    project_id: int

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    tasks: List[Task] = []

    class Config:
        from_attributes = True 