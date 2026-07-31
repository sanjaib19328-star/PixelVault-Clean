import logging
import sys


def setup_logging():
    """Configure structured logging for PixelVault-Clean backend."""
    logger = logging.getLogger("pixelvault")
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.formatters = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [PixelVault-Forensics] %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


logger = setup_logging()
