from django.contrib import admin
from .models import Choices, Polls
from django.core.validators import MinValueValidator
# Register your models here.

admin.site.site_header = "Voting System Admin"
admin.site.site_title = "Voting System Admin Area"
admin.site.index_title = "Welcome to Voting System Admin"

# Admin cannot edit vote numbers to perserve integrity
# Only 10 choices per poll, cannot leave a poll empty must have at least one choice
class ChoiceInline(admin.TabularInline):
    model = Choices
    extra = 2
    readonly_fields = ('number_of_votes',)
    min_num = 2
    max_num = 10
    validate_min = True
    validate_max = True
    




class PollAdmin(admin.ModelAdmin):
    fieldsets = [(None, {'fields': ['title', 'description', 'end_date','status']}),]
    inlines = [ChoiceInline]


admin.site.register(Polls, PollAdmin)
