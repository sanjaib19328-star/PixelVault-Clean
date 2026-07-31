from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ScanRecord(Base):
    __tablename__ = "scan_records"

    id = Column(String, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    file_hash = Column(String, index=True)
    file_size = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    has_exif = Column(Boolean, default=False)
    has_c2pa = Column(Boolean, default=False)
    risk_score = Column(Integer, default=0)
    metadata_json = Column(JSON, nullable=True)
