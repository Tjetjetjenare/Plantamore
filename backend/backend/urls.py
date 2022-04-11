from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from todo import views
#from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

#need to add re_path api's for other databases too and change students too plants. If changed here, dont forgett to change in app.js

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path(r'^api/students/$', views.Plant_list),
    re_path(r'^api/students/([0-9])$', views.Plant_detail)
]
