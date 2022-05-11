from django.db import models

# Create your models here.
# if You update models here, remember to change Serializers too

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
    nutrition = models.CharField(max_length=50)
    sunlight = models.CharField(max_length=50)
    water = models.CharField(max_length=50)
    replant = models.IntegerField()
    description = models.TextField()
    family = models.CharField(max_length=100)

    def __str__(self):
        return str(self.p_id) + ' - ' + self.swedish_name


class User(models.Model):
    username = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.username


class Plant_subprofile(models.Model):
    sub_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    birth_date = models.DateField()
    water = models.DateField()
    replant = models.DateField()
    nutrition = models.IntegerField()
    p_id = models.ForeignKey('Plant', on_delete=models.CASCADE)
    username = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
