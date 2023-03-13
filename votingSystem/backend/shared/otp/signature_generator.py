
from decouple import config
import base64
import hashlib
import hmac


def gen_signature(voters_row_id:int,email:str,otp_timestamp:int)->bytes:
    
    
    
    # Obtain the shared secret and the step from the .env file
    shared_secret = config('SHARED_SECRET')


    # Concatenate the row ID ,email address and the time at which the otp is being created
    input_str = str(voters_row_id) + str(email) + str(otp_timestamp)

    input_str_utf = input_str.encode('utf-8')

    shared_secret_bytes = shared_secret.encode('utf-8')

    hmac_obj = hmac.new(shared_secret_bytes, input_str_utf, hashlib.sha256)

    # Get the digest of the HMAC as bytes
    digest = hmac_obj.digest()

    # Convert the bytes into a base32 string (required by TOTP)
    secret_key = base64.b32encode(digest)
    
    return secret_key
    