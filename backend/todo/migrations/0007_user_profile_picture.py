# Generated by Django 4.0.3 on 2022-05-12 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_remove_plant_subprofile_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
