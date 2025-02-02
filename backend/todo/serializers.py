from dataclasses import fields
from rest_framework import serializers
from .models import Plant, Todo, User, Plant_subprofile


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')

#This must be done for all databases that we want to sen and update
class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ('p_id', 'english_name', 'swedish_name', 'latin_name', 'image_url',
                  'nutrition', 'sunlight', 'water', 'replant', 'description', 'family')
                  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('u_id','username', 'email', 'password','profile_picture')

class SubPlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant_subprofile
        fields = ('sub_id', 'name', 'birth_date', 'water', 'replant',
                  'nutrition', 'p_id', 'username')