from django_otp.oath import TOTP
from decouple import config
from django.utils import timezone
from .signature_generator import gen_signature 



def generate_otp(email:str, voters_row_id:int, otp_timestamp:int)->int:
    step = int(config('STEP'))
    
    
    # Use the generate signature function to create a unique signature for each user
    secret_key =gen_signature(email=email,otp_timestamp=otp_timestamp,voters_row_id=voters_row_id)
    
    
    # Use the digital signature as a key for the otp
    totp = TOTP(secret_key, digits=6, step=step)
    
    
    # Generate the OTP
    otp = totp.token()
    print(f'THE OTP =',otp)
    return otp
