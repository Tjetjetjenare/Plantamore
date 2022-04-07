from django.contrib import admin
from .models import Todo
from .models import Plant
from .models import User
from .models import Plant_subprofile

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Plant)
admin.site.register(User)
admin.site.register(Plant_subprofile)