from .signature_generator import gen_signature
from django_otp.oath import TOTP
from django.utils import timezone

from decouple import config


def verify_otp(otp: int, email: str, otp_timestamp: str, voters_row_id: int) -> bool:
    step = int(config('STEP'))

    # Use the generate signature function to create a unique signature for each user
    secret_key = gen_signature(
        email=email, otp_timestamp=otp_timestamp, voters_row_id=voters_row_id)

    # Use the digital signature as a key for the otp
    totp = TOTP(secret_key, digits=6, step=step)

    is_valid = totp.verify(otp)
    print(is_valid)
    return is_valid
