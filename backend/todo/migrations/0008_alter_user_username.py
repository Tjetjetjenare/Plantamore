# Generated by Django 4.0.3 on 2022-05-16 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0007_user_profile_picture_user_u_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]