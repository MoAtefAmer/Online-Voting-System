from django.contrib import admin
from .models import Choices, Polls
# Register your models here.

admin.site.site_header = "Voting System Admin"
admin.site.site_title = "Voting System Admin Area"
admin.site.index_title = "Welcome to Voting System Admin"

# Admin cannot edit vote numbers to perserve integrity
class ChoiceInline(admin.TabularInline):
    model = Choices
    extra = 3
    readonly_fields = ('number_of_votes',)


class PollAdmin(admin.ModelAdmin):
    fieldsets = [(None, {'fields': ['title', 'description', 'end_date','status']}),]
    inlines = [ChoiceInline]


admin.site.register(Polls, PollAdmin)
