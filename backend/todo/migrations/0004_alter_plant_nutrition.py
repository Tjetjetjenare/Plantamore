# Generated by Django 4.0.3 on 2022-04-20 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_plant_subprofile_birth_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='nutrition',
            field=models.CharField(max_length=50),
        ),
    ]