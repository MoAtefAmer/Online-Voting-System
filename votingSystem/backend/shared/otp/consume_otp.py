


def consume_otp(Voters:object):
    try:
        Voters.objects.update(is_confirmed=True,otp_timestamp=None)
    except (Voters.DoesNotExist):
        return False

    return True