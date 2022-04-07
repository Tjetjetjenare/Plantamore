from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Plant(models.Model):
    p_id = models.IntegerField(primary_key=True)
    english_name = models.CharField(max_length=100)
    swedish_name = models.CharField(max_length=100)
    latin_name = models.CharField(max_length=100)
    image_url = models.CharField(max_length=2000)
    nutrition = models.IntegerField()
    sunlight = models.CharField(max_length=50)
    water = models.CharField(max_length=50)
    replant = models.IntegerField()
    description = models.TextField()
    family = models.CharField(max_length=100)

class User(models.Model):
    username = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=50)

class Plant_subprofile(models.Model):
    sub_id = models.IntegerField()
    name = models.CharField(max_length=50)
    birth_date = models.DateField()
    water = models.DateField()
    replant = models.DateField()
    nutrition = models.DateField()
    p_id = models.ForeignKey('Plant', on_delete=models.CASCADE)
    username = models.ForeignKey('User', on_delete=models.CASCADE)