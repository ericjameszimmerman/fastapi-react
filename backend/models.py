from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Float
from sqlalchemy.orm import relationship
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    
    # Relationship with tasks
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    estimate = Column(Float)
    priority = Column(Integer)
    is_completed = Column(Boolean, default=False)
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    # Relationship with project
    project = relationship("Project", back_populates="tasks") 